## Configure environment variables

Create an .env file in the root of the example directory and fill in the environment variables according to the .env.example file

## Build front-end files

```bash
npm run build
```

## Install Netlify CLI

```bash
npm install netlify-cli -g
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
    netlify deploy -p
    ```

## Develop

```bash
netlify dev
```
