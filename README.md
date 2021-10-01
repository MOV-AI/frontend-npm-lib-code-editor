# Mov.ai library for code editor

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

Mov.ai's library to expose Code Editors

## Packages available

- MonacoCodeEditor

## Development

Open the project in VS Code and then choose to reopen in container.
Once the container is ready, open a new terminal inside VS Code and run

```
npm ci
npm start
```

Note: ~/.npmrc must be previously configured with access to github

## Proxy

During development requests are proxied using http-proxy-middleware.
Edit src/setupProxy.js to add more endpoints.

## Installation

Add the package "movai-adminboard" to the robot's configuration file.
Then apply the changes and update the frontend.

```
movai-cli apply robot.json
movai-cli frontend <robot name>
```

## Troubleshooting

### Invalid hook

When running the lib-scene locally from IDE or another app, you might have an issue with invalid hooks with the following message: "Error: Invalid hook call. Hooks can only be called inside of the body of a function component."

To fix it, stop the development server of IDE (or the other app), stop the buildDev of lib-scene and run the following command in lib-scene repository root:

`npm link ../<app_directory_name>/node_modules/react`
