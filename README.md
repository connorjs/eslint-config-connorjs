# eslint-config-connorjs

My ([@connorjs][connorjs]) preferred [ESLint][eslint] configuration.
With ESLint flat config.

Use it directly ([§ Install](#install)) or take inspiration from it ([§ Rules and reasoning](#rules-and-reasoning)).

> 🛑 **IMPORTANT**
>
> [eslint-comments/require-description] is the single most important rule to configure! Please use it.

> 🟢 **Tip**: I highly recommend [eslint-plugin-unicorn], which my config uses.

[connorjs]: https://github.com/connorjs
[eslint]: https://eslint.org
[eslint-comments/require-description]: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
[eslint-plugin-unicorn]: https://www.npmjs.com/package/eslint-plugin-unicorn

## Table of contents

- [Install](#install)
- [Project structure](#project-structure)
- [Rules and reasoning](#rules-and-reasoning)
  - [Base rules](#base-rules)
  - [JSON (and JSONC)](#json)
  - [JavaScript and TypeScript](#javascript-and-typescript)
  - [React](#react)
  - [HTML](#html)
  - [GraphQL](#graphql)

## Install

1. Add the dependency

   ```shell
   npm i -D eslint-config-connorjs
   ```

2. Include the config in your ESLint flat config.

   ```js
   import connorjsConfig from "eslint-config-connorjs";

   export default [
   	// earlier configuration
   	...connorjsConfig,
   	// later
   ];
   ```

To learn more about ESLint flat config, check out the [blog posts][eslint-flat-config-blog] or the [documentation][eslint-flat-config-docs].

[eslint-flat-config-blog]: https://eslint.org/blog/2022/08/new-config-system-part-2/
[eslint-flat-config-docs]: https://eslint.org/docs/latest/use/configure/configuration-files-new

## Project structure

The [src](./src) directory contains the ESLint configuration files.
It groups them by “use case.”
A use case could represent an entire language (`html` or `json` for example) or a tool (`react` or `vitest`).

Splitting by use case helps copying desired configuration or building a functional form of the ESLint config.
(See [Sheriff] for an example of the functional form.)

[Sheriff]: https://github.com/AndreaPontrandolfo/sheriff#readme

## Rules and reasoning

The remainder of the README discusses the rules, configurations, and plugins used and why I used them.

The 🔧 emoji indicates that configured rules are automatically fixable with `--fix`.

> 🟢 **Tip**: The [source code](./src) has inline comments that may provide more detail.

### Base rules

The [base rules config](./src/base.js) apply to all file types.

- Configures ESLint linter options.

  - [reportUnusedDisableDirectives] to keep code clean and up to date.

- Includes [eslint-plugin-eslint-comments] and enforces comment descriptions ([eslint-comments/require-description]) to document why the code should ignore a configured ESLint rule.

- Includes [eslint-config-prettier] to turns off all rules that are unnecessary or might conflict with [Prettier].

- 🔧 Enforces template literals (backtick strings) to allow easier change to interpolation with [eslint/quotes].

- Configures the [global ignores][global-ignores].

[eslint-config-prettier]: https://github.com/prettier/eslint-config-prettier/#readme
[eslint-plugin-eslint-comments]: https://mysticatea.github.io/eslint-plugin-eslint-comments/
[eslint/quotes]: https://eslint.org/docs/latest/rules/quotes
[global-ignores]: https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
[Prettier]: https://prettier.io
[reportUnusedDisableDirectives]: https://eslint.org/docs/latest/use/configure/configuration-files-new#reporting-unused-disable-directives

### JSON

The [JSON config](./src/json.js) applies to all JSON files. It handles JSONC (JSON with comments) and JSONC-like files.

- Configures [jsonc-eslint-parser] as the parser for the `.json` and `.jsonc` files.

  It does not lint `package-lock.json`.

- Includes [eslint-plugin-jsonc] and registers its `recommended-with-json` and `prettier` rule sets.

- 🔧 Configures sorting rules to standardize the order (no need to think or worry about the “best” order) and reduces merge conflicts.
	Feel free to `eslint-disable` at call sites.

  - 🔧 [jsonc/sort-array-values]

  - 🔧 [jsonc/sort-keys]

- Allows comments in JSONC and JSONC-like files (for example, `tsconfig.json`).

- 🔧 Configures an explicit sort order for `package.json` keys.
	See the code for details.

  > 🔷 **Note**: This overrides the previous jsonc/sort-keys configuration. You
  > can configure specific sort orders for other files using similar logic.

[eslint-plugin-jsonc]: https://ota-meshi.github.io/eslint-plugin-jsonc/
[jsonc-eslint-parser]: https://www.npmjs.com/package/jsonc-eslint-parser
[jsonc/sort-array-values]: https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-array-values.html
[jsonc/sort-keys]: https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html

### JavaScript and TypeScript

The [JS and TS config](./src/javascript-and-typescript.js) applies to all JS and
TS files: `cjs,js,ts,tsx`. _The largest configuration set!_

- Configures language options.

  - `ecmaVersion: latest` because projects use bundlers or other build tools to transpile to target versions.
  
  - Includes isomorphic globals (shared by node and the browser) via [globals]
  
  - Also see the [@typescript-eslint/parser] documentation

- 🔧 Configures sorting rules to standardize the order (no need to think or worry about the “best” order) and reduces merge conflicts.
  Feel free to `eslint-disable` at call sites.
  They are case-insensitive.

  - 🔧 [sort-keys]
  
  - 🔧 [@typescript-eslint/member-ordering] with required properties first

- Includes [@eslint/js] `recommended` rule set.

- Includes [eslint-plugin-sonarjs] `recommended` rule set.

- Includes [eslint-plugin-unicorn] `recommended` rule set and configures additional rules from unicorn.
  Some specific call-outs follow.

  - 🔧 Configures an allow list for [unicorn/prevent-abbreviations] to allow some abbreviations.
    Example: Allow `props`, which React commonly uses.

  - 🔧 Configures patterns for [unicorn/string-content] to enforce better string content.
    Example: Use unicode arrow `→` instead of hyphen and greater than (`->`).

    The auto-fix feature makes this rule very useful.
    See the source code for a “smart quotes” pattern.

- Uses [typescript-eslint] and includes its `recommended-type-checked` and `stylistic-type-checked` rule sets.

  - 🔧 Configures [@typescript-eslint/consistent-type-definitions] to enforce using `type` instead of `interface` (as the default).

    Interfaces use declaration merging, which I do not recommend as the default.
    See the [_Differences Between Type Aliases and Interfaces_ documentation][type-vs-interface].

  - 🔧 Configures [@typescript-eslint/no-non-null-assertion] to require a comment via `eslint-disable` when needed.
    It allows non-null assertions in test files.

- Uses [eslint-plugin-simple-import-sort] and [eslint-plugin-import] to configure import rules.
  Some specific call-outs follow.

  - 🔧 Includes `simple-import-sort/imports` and `simple-import-sort/exports` to sort the imports and re-exports.
    See the [Sort order docs][eslint-plugin-simple-import-sort-sort-order].

    I recommend the default configuration instead of creating your own order.

  - Includes [eslint-plugin-import] `recommended` rule set.
  
  - Configures [import/no-default-export] to disallow default exports.

    I have experienced various issues resulting from default exports over the years, so I strongly recommend configuring this rule.
    You can always `eslint-disable` at the call site when you need it and explain why (example: dynamic imports for React code-splitting point).

    1. Naming exports leads to a stronger contract and can help refactoring.
    2. You can use `as` syntax to rename named exports very easily, so the supposed benefit of “name default exports whatever you want” has little benefit in practice.
    3. _I want to add more of my reasons, so TODO!_

    The ESLint configuration opts-out known configuration files that require default exports (example: storybook files).

  - Configures [import/no-anonymous-default-export] to disallow anonymous default exports in the case that you `eslint-disable` the `import/no-default-export` rule.

  - 🔧 Uses [@typescript-eslint/consistent-type-imports] and [import/consistent-type-specifier-style] to enforce consistent usage of type imports.

    We need both rules for best fix-it developer experience: one to add `type` and the other to fix the placement.

[@eslint/js]: https://www.npmjs.com/package/@eslint/js
[eslint-plugin-import]: https://github.com/import-js/eslint-plugin-import#readme
[eslint-plugin-simple-import-sort]: https://github.com/lydell/eslint-plugin-simple-import-sort#readme
[eslint-plugin-simple-import-sort-sort-order]: https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order
[eslint-plugin-sonarjs]: https://www.npmjs.com/package/eslint-plugin-sonarjs
[globals]: https://www.npmjs.com/package/globals
[import/consistent-type-specifier-style]: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
[import/no-anonymous-default-export]: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
[import/no-default-export]: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
[sort-keys]: https://eslint.org/docs/latest/rules/sort-keys
[type-vs-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
[typescript-eslint]: https://typescript-eslint.io
[@typescript-eslint/consistent-type-definitions]: https://typescript-eslint.io/rules/consistent-type-definitions/
[@typescript-eslint/consistent-type-imports]: https://typescript-eslint.io/rules/consistent-type-imports/
[@typescript-eslint/member-ordering]: https://typescript-eslint.io/rules/member-ordering/
[@typescript-eslint/no-non-null-assertion]]: https://typescript-eslint.io/rules/no-non-null-assertion/
[@typescript-eslint/parser]: https://typescript-eslint.io/packages/parser
[unicorn/prevent-abbreviations]: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
[unicorn/string-content]: https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md

### React

The [react config](./src/react.js) applies to all typescript files (`ts` and `tsx`) and only makes sense to use in a React project.

- Uses [eslint-plugin-jsx-a11y] and its `recommended` rule set.

- Uses [eslint-plugin-react] and its `recommended` and `jsx-runtime` rule sets.

- Uses [eslint-plugin-react-hooks] and its `recommended` rule set.

- Configures [react/destructuring-assignment] to disallow destructuring props.
  (Controversial, I know.)

  I find it harder to update components that use destructuring.
  Plus I think it looks bad with inline types given TypeScript usage.

- Configures [react/forbid-component-props] to disallow props.
  (Example: `style` to disallow inline styles.)

- 🔧 Configures [react/function-component-definition] to enforce component definition consistency.

  Uses “function declarations” for named components because they are the only way to support generics in TSX, so using it for consistency.
  Remember: This will auto-fix.

  Uses “arrow functions” for unnamed components to emphasize unnamed and for nice lambda readability (example: pass to `map`).

- 🔧 Enables [react/hook-use-state] to enforce symmetric naming of the `useState` hook value and setter variables.

- 🔧 Configures [react/jsx-boolean-value] and [react/jsx-curly-brace-presence] to enforce consistent JSX styles. See the code for details.

- Configures the following rules to force a comment explaining the use case.
  While this may seem like extra work, it helps catch improper usage.
  - react/jsx-no-leaked-render
  - react/jsx-props-no-spreading
  - react/no-array-index-key
  - react/no-danger

[eslint-plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme
[eslint-plugin-react]: https://github.com/jsx-eslint/eslint-plugin-react
[eslint-plugin-react-hooks]: https://www.npmjs.com/package/eslint-plugin-react-hooks
[react/destructuring-assignment]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
[react/forbid-component-props]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
[react/hook-use-state]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
[react/jsx-boolean-value]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/
[react/jsx-curly-brace-presence]: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/

### HTML

The [HTML config](./src/html.js) applies to all HTML files.

- Uses [html-eslint].

- Includes the `recommended` ruleset and accessibility and best practice oriented rules.
	See the code for details, but some specific call-outs follow.

  - [@html-eslint/id-naming-convention] to enforce kebab case for `id` naming.

  - [@html-eslint/no-inline-styles] to disallow inline styles, mostly for [Content Security Policy (CSP)][mdn-csp] reasons.

    Even if you allow `unsafe-inline` for the CSP, this rule would also require explanations for using inline styles instead of CSS with `eslint-disable`.

  - [@html-eslint/no-skip-heading-levels] to disallow skipping heading levels.

  - [@html-eslint/no-target-blank] to disallow usage of unsafe `target='_blank'`.

[html-eslint]: https://yeonjuan.github.io/html-eslint/
[@html-eslint/id-naming-convention]: https://yeonjuan.github.io/html-eslint/docs/rules/id-naming-convention/
[@html-eslint/no-inline-styles]: https://yeonjuan.github.io/html-eslint/docs/rules/no-inline-styles/
[@html-eslint/no-skip-heading-levels]: https://yeonjuan.github.io/html-eslint/docs/rules/no-skip-heading-levels/
[@html-eslint/no-target-blank]: https://yeonjuan.github.io/html-eslint/docs/rules/no-target-blank/
[mdn-csp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

### GraphQL

The [GraphQL config](./src/graphql.js) applies to all GraphQL SDL files.

- Uses [@graphql-eslint/eslint-plugin].

- Includes the `schema-recommended` ruleset.

- Disables [@graphql-eslint/naming-convention] to allow the use of lifecycle style naming (example: `Get*` and `List*`).

[@graphql-eslint/eslint-plugin]: https://the-guild.dev/graphql/eslint/docs
[@graphql-eslint/naming-convention]: https://the-guild.dev/graphql/eslint/rules/naming-convention
