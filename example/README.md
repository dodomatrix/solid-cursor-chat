## Configure environment variables

Login with your Github account on `https://presencejs.yomo.run`, will get a free `app_id` and `app_secret`.
Create an .env file in the root of the example directory and fill in the environment variables according to the .env.example file

## Install Netlify CLI

```bash
npm install netlify-cli -g
```

## Develop

Start the `presence-auth` cloud function:

```bash
netlify dev
```

## Deploy

1. Create a `netlify.toml` file in your project.

    The `netlify.toml` file is where we configure how the site builds and where your serverless functions live.

2. In `netlify.toml`, add a `[build]` section and add `publish = "dist"` and `functions = "functions"` values

3. We need to create this site in Netlify

    Open your terminal and run the following command:

    ```bash
    netlify init --manual
    ```

    Choose "create & configure a new site", then add a site name or hit enter for one to be generated for you.

4. After configuring your redirect, its time to deploy

    Open your terminal and run the following command:

    ```bash
    netlify deploy --prod
    ```

##### Note: works fine under Node 14.x, not under Node 17.x at the moment
