import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { filter } from 'rxjs/operators';
import Presence from '@yomo/presencejs';
import Me from './cursor/me';
import Others from './cursor/others';
import MeCursor from './MeCursor';
import OthersCursor from './OthersCursor';
import { uuidv4 } from './helper';
import { CursorMessage, OfflineMessage } from './types';

import './styles/CursorChat.css';

function CursorChat({
    presenceURL,
    presenceAuth,
    showLatency = false,
    room,
    name,
    avatar,
    theme = 'light',
}: {
    presenceURL: string;
    presenceAuth: {
        type: 'publickey' | 'token';
        // The public key in your Allegro Mesh project.
        publicKey?: string;
        // api for getting access token
        endpoint?: string;
    };
    showLatency?: boolean;
    room?: string;
    name?: string;
    avatar?: string;
    theme?: 'light' | 'dark';
}) {
    const ID = uuidv4();

    const me = new Me({
        id: ID,
        x: 0,
        y: 0,
        name: name || '',
        avatar: avatar || '',
    });

    const [othersMap, setOthersMap] = createSignal(new Map());

    let yomo: Presence;

    const close = async () => {
        if (me) {
            await me.goOffline();
        }
        yomo && yomo.close();
    };

    onMount(() => {
        yomo = new Presence(presenceURL, {
            auth: presenceAuth,
        });

        yomo.on('connected', () => {
            room && yomo.toRoom(room);

            yomo.on$<CursorMessage>('online')
                .pipe(filter((data) => data.id !== ID))
                .subscribe((data) => {
                    setOthersMap((old) => {
                        if (old.has(data.id)) {
                            return old;
                        }
                        const cursorMap = new Map(old);
                        const others = new Others(data);
                        others.goOnline(yomo);
                        cursorMap.set(others.id, others);
                        return cursorMap;
                    });
                });

            yomo.on<OfflineMessage>('offline', (data) => {
                setOthersMap((old) => {
                    const cursorMap = new Map(old);
                    const others = cursorMap.get(data.id);
                    if (others) {
                        others.unsubscribe();
                    }
                    cursorMap.delete(data.id);
                    return cursorMap;
                });
            });

            yomo.on$<CursorMessage>('sync')
                .pipe(filter((data) => data.id !== ID))
                .subscribe((data) => {
                    setOthersMap((old) => {
                        if (old.has(data.id)) {
                            return old;
                        }
                        const cursorMap = new Map(old);
                        const others = new Others(data);
                        others.goOnline(yomo);
                        cursorMap.set(others.id, others);
                        return cursorMap;
                    });
                });

            me.goOnline(yomo);

            window.addEventListener('unload', close);
        });
    });

    onCleanup(() => {
        close();
        window.removeEventListener('unload', close);
    });

    const getOthers = () => {
        const others: Others[] = [];
        othersMap().forEach((value) => {
            others.push(value);
        });
        return others;
    };

    return (
        <div class="online-cursor-wrapper">
            <MeCursor cursor={me} showLatency={showLatency} theme={theme} />
            <For each={getOthers()}>
                {(item) => (
                    <OthersCursor
                        cursor={item}
                        showLatency={showLatency}
                        theme={theme}
                    />
                )}
            </For>
        </div>
    );
}

export default CursorChat;
