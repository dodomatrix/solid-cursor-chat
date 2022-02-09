import CursorChat from '../../dist/esm';
import '../../dist/esm/index.css';

function App() {
    return (
        <CursorChat
            presenceURL="wss://presence.yomo.dev"
            presenceAuth={{
                type: 'token',
                endpoint: '/api/auth',
            }}
            avatar={`/src/assets/cursor-avatar-${
                new Date().getSeconds() % 9
            }.png`}
        />
    );
}

export default App;
