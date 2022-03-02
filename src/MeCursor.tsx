import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import Me from './cursor/me';
import CursorIcon from './CursorIcon';
import Latency from './Latency';
import { MousePosition } from './types';

export default function MeCursor({
    cursor,
    showLatency,
}: {
    cursor: Me;
    showLatency: boolean;
}) {
    const [showInput, setShowInput] = createSignal(false);
    const [inputValue, setInputValue] = createSignal('');
    let $container: HTMLDivElement | undefined;
    let $input: HTMLInputElement | undefined;

    const onKeydown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.code === 'Slash') {
            e.preventDefault();
            setShowInput(true);
            setTimeout(() => {
                if ($input) {
                    $input.value =
                        cursor.name && !cursor.avatar ? cursor.name + ': ' : '';
                    $input.focus();
                }
            }, 500);
        }

        if (e.code === 'Escape') {
            setShowInput(false);
            setInputValue('');
            cursor.sendMessage('');
        }
    };

    const onInput = (e: any) => {
        const inputValue = e.target.value;
        setInputValue(inputValue);
        cursor.sendMessage(inputValue);
    };

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

        document.addEventListener('keydown', onKeydown);
    });

    onCleanup(() => {
        document.removeEventListener('keydown', onKeydown);
    });

    return (
        <div class="online-cursor-wrapper__cursor" ref={$container}>
            <CursorIcon color={cursor.color} />
            <Latency cursor={cursor} showLatency={showLatency} />
            <Show
                when={!!cursor.avatar}
                fallback={
                    <Show when={cursor.name && !cursor.avatar && !showInput()}>
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
            <Show when={!!showInput()}>
                <div class="online-cursor-wrapper__input-box">
                    <span>{inputValue()}</span>
                    <input
                        ref={$input}
                        style={
                            cursor.name && !cursor.avatar && showInput()
                                ? 'padding-left: 10px;'
                                : ''
                        }
                        placeholder="Say something"
                        onInput={onInput}
                    />
                </div>
            </Show>
        </div>
    );
}
