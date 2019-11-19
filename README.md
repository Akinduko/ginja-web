This is a bootstrap react project created to enable quick kickstart of react projects while ensuring proper structure

## Environment Variables

`REACT_APP_API_BASE=`: The API Base URL
`REACT_APP_AUTH_API_BASE=`: The Auth Base URL
`REACT_APP_CLIENT_SECRET=`
`REACT_APP_CLIENT_ID=`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Logging errors

Do not use `console.log` statements in the application.
Instead use the [`Logger` utility](src/utils/logger) through `import { Logger } from '+utils';`

- If a global loader is needed, ensure that `noLoader` is either not set in the `REQUEST` action or that it is set to `false` in the `REQUEST` action
- If a global loader is not needed, ensure that `noLoader` is set to true in the `REQUEST` action.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
