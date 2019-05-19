# A browser-based design linter for Figma files.

Try it here: https://jamiemill.github.io/figma-xray/

## Features

Shows you:

- What library components you are using, how many instances, and where they are
- What local components you're using or not using (maybe time to delete some components?).
- Whether you have any instances that are pointing to deleted components (maybe time to restore them?).

## How it works

There is no backend. Everything is running client-side in your browser.

Your personal access token will be stored in your browser's localstorage for convenience, so you can refresh the page without losing it.

## Development

### `npm install`

Install dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
