import { createSignal, onMount, Show } from 'solid-js';
import Others from './cursor/others';
import CursorIcon from './CursorIcon';
import Latency from './Latency';
import { MousePosition } from './types';

export default function OthersCursor({
    cursor,
    showLatency,
}: {
    cursor: Others;
    showLatency: boolean;
}) {
    const [msg, setMsg] = createSignal('');

    let $container: HTMLDivElement | undefined;

    onMount(() => {
        const renderPosition = (position: MousePosition) => {
            $container &&
                $container.setAttribute(
                    'style',
                    `transform: translate3d(${position.mouseX}px, ${position.mouseY}px, 0);`
                );
        };

        renderPosition({ mouseX: cursor.x, mouseY: cursor.y });

        cursor.onMove = (position) => {
            renderPosition(position);
        };

        cursor.onTextMessage = (msg) => {
            setMsg(msg);
        };
    });

    return (
        <div class="online-cursor-wrapper__cursor" ref={$container}>
            <CursorIcon color={cursor.color} />
            <Latency cursor={cursor} showLatency={showLatency} />
            <Show
                when={!!cursor.avatar}
                fallback={
                    <Show when={cursor.name && !cursor.avatar && !msg()}>
                        <span class="online-cursor-wrapper__name">
                            {cursor.name}
                        </span>
                    </Show>
                }
            >
                <img
                    class="online-cursor-wrapper__avatar"
                    src={cursor.avatar}
                    alt="avatar"
                />
            </Show>
            <Show when={!!msg()}>
                <div
                    class="online-cursor-wrapper__text"
                    style={
                        cursor.name && !cursor.avatar && msg()
                            ? 'padding-left: 10px;'
                            : ''
                    }
                >
                    {msg()}
                </div>
            </Show>
        </div>
    );
}
