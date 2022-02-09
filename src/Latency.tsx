import { createSignal, onMount, Show } from 'solid-js';
import Me from './cursor/me';
import Others from './cursor/others';

export default function Latency({
    cursor,
    showLatency,
}: {
    cursor: Me | Others;
    showLatency: boolean;
}) {
    const [latencyValue, setLatencyValue] = createSignal({
        meshId: '',
        latency: 0,
        backgroundColor: 'green',
    });

    onMount(() => {
        if (showLatency) {
            cursor.onGetLatency = (data) => {
                if (data.latency) {
                    let backgroundColor = 'green';
                    if (data.latency >= 200 && data.latency < 300) {
                        backgroundColor = '#FFB02A';
                    }
                    if (data.latency >= 300) {
                        backgroundColor = 'red';
                    }
                    setLatencyValue({
                        backgroundColor,
                        meshId: data.meshId,
                        latency: data.latency,
                    });
                }
            };
        }
    });

    return (
        <Show when={latencyValue().latency > 0}>
            <div className="online-cursor-wrapper__latency">
                📍 {latencyValue().meshId}{' '}
                <span
                    style={{
                        backgroundColor: latencyValue().backgroundColor,
                    }}
                >
                    {latencyValue().latency}ms
                </span>
            </div>
        </Show>
    );
}
