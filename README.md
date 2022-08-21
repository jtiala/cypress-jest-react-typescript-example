# Cypress + Jest + React + TypeScript Example

Setting up a TypeScript project with both Cypress and Jest can sometimes be a bit troublesome, especially if you want to have all the test files to live besides the component or view they are testing.

In this repository I have set up a working dev environment with the following features:

- [Create React App](http://create-react-app.dev) based React application
  - with a component-centric directory structure where all component related files live in the same directory as the component
  - the setup should be easy enough to apply on a [Next.js](https://nextjs.org) or [Vite](https://vitejs.dev) based React app as well
- [Jest](http://jestjs.io) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
  - both come bundled with CRA, but need some configuration
- [Cypress](http://cypress.io) with [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)
  - with both E2E and component testing configured
  - test files can live under `cypress` or in `src`
- [ESLint](http://eslint.org) configured for both Jest and Cypress
- [VS Code](https://code.visualstudio.com) should handle the typing and linting correctly and IntelliSense should work as expected. I haven't tried any other editors or IDEs.
- Free Bonus: [GitHub Actions workflow](https://github.com/jtiala/cypress-jest-react-typescript-example/actions/workflows/ci.yml) that runs all the tests

## The Problem & The Solution

The main problem is that Jest and Cypress both register global types with same names. Cypress provides [a good workaround](https://docs.cypress.io/guides/tooling/typescript-support#Clashing-types-with-Jest) clashing types: create separate TypeScript configs for your Cypress tests (`cypress/tsconfig.json`) and for the rest of your code (root `tsconfig.json`). Unfortunately this means that all the Cypress tests should live in their default location, under `cypress` directory, and we don't want that.

Now, it's important to understand that TypeScript usually runs in [two different ways](https://code.visualstudio.com/docs/typescript/typescript-compiling#_compiler-versus-language-service): in the language service in your editor/IDE and in the TypeScript compiler, which is bundled with CRA in this case. While it's [somewhat possible](https://github.com/facebook/create-react-app/issues/6023) to tell the compiler which `tsconfig.json` file to use, the language service always uses a config the same directory as the file, or the first config it finds in parent directories. In other words, currently there is no way to have two separate configs targeting a different set of files in same directory and have both the compiler and the language service to use them correctly. Please correct me if I'm wrong.

This is the best solution I have found for the problem:

1. `cypress/tsconfig.json` should be pretty much what [Cypress docs](https://docs.cypress.io/guides/tooling/typescript-support#Configure-tsconfig-json) suggests, but specifying type packages isn't necessary as `index.d.ts` will reference them. Also, a include rule for `.tsx` files and `jsx` compiler option are added for Cypress component testing support.
2. `cypress/index.d.ts` references Cypress and Cypress Testing Library types and specifies typings for custom commands. Every Cypress test file **outside** `cypress` directory should reference this file with `/// <reference types="../../cypress" />`
3. In the root `tsconfig.json` configure anything your app needs with an exclude rule for all `.cy.ts` and `.cy.tsx` files.
4. Unfortunately this means that there isn't any way to configure TypeScript for the Cypress test files outside of `cypress`. The files won't get compiled by CRA's compiler, because they are excluded in the root `tsconfig.json`, so that's not a problem. The language service will use it's default configuration, which should be enough. Only minor annoyance I have ran into so far is that files need to `import React from "react"` as compiler option for `jsx` cannot be set to `react-jsx`.
5. In `cypress.config.ts`, `specPatterns` for both E2E and component test files are added for both `cypress` and `src` directories. Test files under `src` are called `.e2e.cy.ts` or `.component.cy.ts` so that Cypress can tell them apart. If you are using only E2E tests, feel free to simplify the naming scheme.
6. Finally, in `package.json`, a plugin and a config extension are added for ESLint to handle Cypress correctly.

The setup is not in any way ideal, but it should work. If you'll come up with better ways to handle the problem, please let me know. If you open some of the test files, you'll find comments telling where some functions should be coming from. You can validate that the setup is working correctly by hovering the function calls and checking if the comments are true. Also, there shouldn't be any wiggly red lines or linting errors anywhere and all the tests should pass.

## Scripts

These are the testing related npm scripts available in the example:

`npm run test`

Runs all the tests. Note that Cypress E2E tests need the app to be available in [localhost:3000](localhost:3000).

`npm run jest:run`

Runs Jest tests

`npm run jest:watch`

Runs Jest tests in watch mode

`npm run cypress:run`

Runs all Cypress tests headlessly

`npm run cypress:run:e2e`

Runs Cypress E2E tests headlessly

`npm run cypress:run:component`

Runs Cypress component tests headlessly

`npm run cypress:open`

Opens Cypress

`npm run lint`

Runs ESLint for TypeScript files
