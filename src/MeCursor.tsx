import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import Me from './cursor/me';
import CursorIcon from './CursorIcon';
import Latency from './Latency';
import { MousePosition } from './types';

export default function MeCursor({
    cursor,
    showLatency,
    theme,
}: {
    cursor: Me;
    showLatency: boolean;
    theme?: 'light' | 'dark';
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
                $input && $input.focus();
            }, 500);
        }

        if (e.code === 'Escape') {
            setShowInput(false);
            setInputValue('');
            cursor.sendMessage('');
        }
    };

    const onInput = (e: any) => {
        const inputStr = e.target.value;
        const inputValue = inputStr.replace(/^\//, '');
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
            <Show when={!!cursor.avatar}>
                <img
                    class="online-cursor-wrapper__avatar"
                    src={cursor.avatar}
                    alt="avatar"
                />
            </Show>
            <Show when={!!showInput()}>
                <div
                    class={`online-cursor-wrapper__input-box ${
                        theme === 'light' ? 'light' : 'dark'
                    }`}
                >
                    <span>{inputValue()}</span>
                    <input
                        ref={$input}
                        placeholder="Say something"
                        onInput={onInput}
                    />
                </div>
            </Show>
        </div>
    );
}
