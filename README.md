# Mov.ai library for code editor

![Movai](https://www.mov.ai/wp-content/uploads/2021/06/MOV.AI-logo-3.png)

Mov.ai's library to expose Code Editors

## Packages available

- MonacoCodeEditor

## Development

### Troubleshooting

#### Invalid hook

When running the lib-scene locally from IDE or another app, you might have an issue with invalid hooks with the following message: "Error: Invalid hook call. Hooks can only be called inside of the body of a function component."

To fix it, stop the development server of IDE (or the other app), stop the buildDev of lib-scene and run the following command in lib-scene repository root:

`npm link ../frontend-npm-ide/node_modules/react`
