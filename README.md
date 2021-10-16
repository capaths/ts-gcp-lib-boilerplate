# TypeScript Google Cloud artifact registry package

This is a boilerplate to generate a library that can be published immediately to the

## How to use this boilerplate?

1. Create a repository at your Google Cloud Project **Artifact Registry**:
2. Set-up your ``package.json`` file. You can do this two ways:
    1. **Automatically**: Execute the following script and set the shown variables or use the default values:

````shell
node ./scripts/setup.js
````

## How to publish this package

1. Creates a ``.npmrc`` config file executing:

````shell
npm run npmrc:build
````

2. Add the authentication token to the ``.npmrc``:

````shell
npm run npmrc:login
````

3. Publish the package using:

````shell
npm publish
````
