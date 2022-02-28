# solid-cursor-chat

## 🧬 Introduction

A SolidJS component helps bring Figma's Cursor Chat to your web applications in less than 3 minutes, making real-time collaboration anywhere. based on [Presencejs](https://presence.yomo.run).

-   Press `Ctrl + /` to bring up the input box
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

Login with your Github account on `https://presencejs.yomo.run`, will get a free `app_id` and `app_secret`

then, add serverless functionality to [netlify](https://docs.netlify.com/functions/build-with-javascript):

```javascript
// example/functions/presence-auth.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    if (event.httpMethod === 'GET') {
        try {
            const response = await fetch('https://prsc.yomo.dev/api/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_id: process.env.APP_ID,
                    app_secret: process.env.APP_SECRET,
                }),
            });
            const data = await response.json();
            const token = data.data;
            if (token) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(token),
                };
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ msg: data.message }),
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ msg: error.message }),
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ msg: '' }),
        };
    }
};
```

Response data:

```json
{
    "token": "eyJhbGciOiJIUzI1..."
}
```

### Integrate to your project

```javascript
import { render } from 'solid-js/web';
import CursorChat from 'solid-cursor-chat';

const App = () => {
    return (
        <CursorChat
            showLatency
            presenceURL="wss://prsc.yomo.dev"
            presenceAuthEndpoint="/.netlify/functions/presence-auth"
            avatar="https://cursor-chat-example.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75"
        />
    );
};

render(App, document.getElementById('root'));
```

-   `presenceURL: string`: to set the YoMo's service address.
-   `presenceAuthEndpoint: string`: to set api for getting access token
-   `room?: string`: to set room.
-   `showLatency?: boolean`: to show connected mesh server and the end-to-end latency.
-   `avatar?: string`: to set avatar.
-   `name?: string`: to set name.
-   `theme?: 'light' | 'dark'`: The background color of the chat box, the default value is "light".

## LICENSE

<a href="/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
</a>
