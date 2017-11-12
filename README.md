# @xch/meteor-create-react-component

This is a CLI utility for generating React components in Meteor.

## Install

```Bash
npm i --save-dev @xch/meteor-create-react-component
```

## Usage

```Bash
npx createNewUiComponent [options] <component-name>
```

Use `--help` flag to learn more about the options.

## Simple Example

```Bash
npx createNewUiComponent some-component
```

This creates a new component file at `imports/ui/components/some-component/index.js` in the Meteor app. If `react-redux` package is detected in the app, the component file will be renamed to `component.js` and a Redux container file will be created with the name `index.js`.

## Configurable Options

You can customize the behavior of the generators with CLI options. You can also save any option under the `"meteor-create-react-component"` namespace in your NPM manifest (`package.json`) to change the default behavior across the project.

CLI options would always take priority but not all options are available.

### `componentsDirectory`

- Relative path from the root of your project to the single place for all of your UI components.
- Default value: `imports/ui/components`.
- Can only be configured in the manifest.

### `useReduxContainer`

- Set to `true` to create a `react-redux` container for the component.
- If `react-redux` is detected in your project, the default value would be `true`, otherwise `false`.
- When this is active, the component would be named `component.js` while the container would be named `index.js`.
- Use `--no-container` flag to suppress this option per command.

### `pureComponent`

- Set to `true` to create a pure React component (with an arrow function) instead of a complex one (that extends `React.Component`).
- Use `--pure-component` flag to activate this option per command.

### `dryRun`

- Set to `true` to see the results described in text without performing any changes.
- Use `--dry-run` flag to activate this option per command.

## License

MIT
