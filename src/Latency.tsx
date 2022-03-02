import { createSignal, onMount, Show } from 'solid-js';
import Me from './cursor/me';
import Others from './cursor/others';
import flag from './helper/flag'

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
            <div className="online-cursor-wrapper__latency-box">
                <span class="online-cursor-wrapper__meshId">
                    {flag(latencyValue().meshId)} {latencyValue().meshId}
                </span>
                <span
                    class="online-cursor-wrapper__latency"
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
