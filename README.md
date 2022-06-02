# Vite & Svelte & am-mocktimes Starter kit

## Setup

Click on the `Use this template` button above, or run the following command.

```shell
npm install -g degit
npx degit ampcpmgp/vite-svelte-mocktimes-starter
npm i
```

Then

* edit `package.json` `name` property
* edit `README.md`
* edit `index.html` title

## Start

```shell
npm run dev
npm run storybook
```

## Test

```shell
npm test
# or watch mode
npm run test:watch
# or watch spefied test name
npx ava --match 'composite/example' --watch
```

## Lint

```shell
npm run lint
```

or vscode extensions <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

## Code Format

```shell
npm run format
```

or vscode extensions <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

## Generate parts template

```shell
npx am-parts -n <COMPONENT_NAME>
```
