# solid-cursor-chat

## 🧬 Introduction

A SolidJS component helps bring Figma's Cursor Chat to your web applications in less than 3 minutes, making real-time collaboration anywhere. based on [Presencejs](https://presence.yomo.run).

-   Press `/` to bring up the input box
-   Press `ESC` to close the input box

## 🤹🏻‍♀️ Quick Start

### Installation

by `npm`:

```shell
$ npm i --save solid-cursor-chat
```

by `yarn`:

```shell
$ yarn add solid-cursor-chat
```

by `pnpm`:

```shell
$ pnpm i solid-cursor-chat
```

### Request free dev/test account

Login with your Github account on `https://presence.yomo.run`, will get a free `app_id` and `app_secret`

then, add `/api/auth` api:

```javascript
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('https://prsc.yomo.dev/api/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_id: 'app_id',
                    app_secret: 'app_secret',
                }),
            });
            const data = await response.json();
            const token = data.data;
            if (token) {
                res.status(200).json(token);
            } else {
                res.status(400).json({ msg: data.message });
            }
        } catch (error) {
            if (typeof error === 'string') {
                res.status(500).json({ msg: error });
            } else if (error instanceof Error) {
                res.status(500).json({ msg: error.message });
            }
        }
    } else {
        // Handle any other HTTP method
    }
}
```
Response data:

```json
{
    "token": "eyJhbGciOiJIUzI1..."
}
```

### Integrate to your project

```javascript
import CursorChat from 'solid-cursor-chat';

const App = () => {
    return (
        <CursorChat
            presenceURL="wss://prsc.yomo.dev"
            presenceAuth={{
                type: 'token',
                endpoint: '/api/auth',
            }}
            avatar="https://cursor-chat-example.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75"
            theme="light"
        />
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

```
-   `presenceURL: string`: to set the WebSocket service address.
-   `presenceAuth: { type: 'publickey' | 'token'; publicKey?: string; endpoint?: string; }`: to set `presencejs` service Auth
-   `room?: string`: to set room.
-   `showLatency?: boolean`: to show connected mesh server and the end-to-end latency.
-   `avatar?: string`: to set avatar.
-   `name?: string`: to set name.
-   `theme?: 'light' | 'dark'`: The background color of the chat box, the default value is "light".

## LICENSE

<a href="/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
</a>
