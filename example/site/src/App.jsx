// import CursorChat from '../../../dist/esm';
import CursorChat from 'solid-cursor-chat';
import logo from './assets/logo.png';
import avatar from './assets/avatar.png';

function App() {
    return (
        <div className="main">
            <img className="logo" src={logo} alt="logo" />
            <p className="tips">
                Press <span>/</span> to bring up the input box <br /> Press{' '}
                <span>ESC</span> to close the input box
            </p>
            <CursorChat
                showLatency
                presenceURL="wss://prsc.yomo.dev"
                presenceAuth={{
                    type: 'token',
                    endpoint: '/.netlify/functions/presence-auth',
                }}
                avatar={avatar}
            />
        </div>
    );
}

export default App;
