// import CursorChat from '../../dist/esm';
// import '../../dist/esm/xinghuang.css'
import CursorChat from 'solid-cursor-chat';
import 'solid-cursor-chat/dist/esm/maolv.css';
import logo from './assets/logo.png';
// import avatar from './assets/avatar.png';

function App() {
    return (
        <div className="main">
            <img className="logo" src={logo} alt="logo" />
            <p className="tips">
                Press <span>Ctrl + /</span> to bring up the input box <br />{' '}
                Press <span>ESC</span> to close the input box
            </p>
            <CursorChat
                showLatency
                presenceURL="https://prsc.yomo.dev"
                presenceAuthEndpoint="/.netlify/functions/presence-auth"
                room="solid"
                // avatar={avatar}
                name="osdodo"
            />
        </div>
    );
}

export default App;
