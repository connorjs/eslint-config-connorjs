# eslint-config-connorjs

My ([@connorjs’][connorjs]) preferred [ESLint][eslint] configuration. With
ESLint flat config.

Use it directly ([§ Install](#install)) or take inspiration from it
([§ Rules and reasoning](#rules-and-reasoning)).

> 🛑 **IMPORTANT**
>
> [eslint-comments/require-description][eslint-comments-require-description]
> is the single most important rule to configure! Please use it.

[connorjs]: https://github.com/connorjs
[eslint]: https://eslint.org
[eslint-comments-require-description]: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html

## Table of contents

- [Install](#install)
- [Project structure](#project-structure)
- [Rules and reasoning](#rules-and-reasoning)
  - [Base rules](#base-rules)
  - [JSON (and JSONC)](#json)

## Install

> 🟧 **TODO**
>
> Confirm installation before publishing

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

To learn more about ESLint flat config, check out the [blog
posts][eslint-flat-config-blog] or the [documentation][eslint-flat-config-docs].

[eslint-flat-config-blog]: https://eslint.org/blog/2022/08/new-config-system-part-2/
[eslint-flat-config-docs]: https://eslint.org/docs/latest/use/configure/configuration-files-new

## Project structure

The [src](./src) directory contains the ESLint configuration files. It groups
them by “use case.” A use case could represent an entire language (`html` or
`json` for example) or a tool (`react` or `vitest`).

Splitting by use case helps copying desired configuration or building a
functional form of the ESLint config. (See [Sheriff][sheriff] for an example
of the functional form.)

[sheriff]: https://github.com/AndreaPontrandolfo/sheriff#readme

## Rules and reasoning

The remainder of the README discusses the rules, configurations, and plugins
used and why I used them.

The 🔧 emoji indicates that configured rules are automatically fixable with
`--fix`.

> 🟢 **Tip**: The [source code](./src) has inline comments that may provide more
> detail.

### Base rules

The [base rules config](./src/base.js) apply to all file types.

- Configures ESLint linter options.

  - [reportUnusedDisableDirectives] to keep code clean and up to date.

- Includes [eslint-plugin-eslint-comments] and enforces comment descriptions
  ([eslint-comments/require-description][eslint-comments-require-description])
  to document why the code should ignore a configured ESLint rule.

- Includes [eslint-config-prettier] to turns off all rules that are unnecessary
  or might conflict with [Prettier][prettier].

- 🔧 Enforces template literals (backtick strings) to allow easier change to
  interpolation with [eslint/quotes][eslint-quotes].

- Configures the [global ignores][global-ignores].

[eslint-config-prettier]: https://github.com/prettier/eslint-config-prettier/#readme
[eslint-plugin-eslint-comments]: https://mysticatea.github.io/eslint-plugin-eslint-comments/
[eslint-quotes]: https://eslint.org/docs/latest/rules/quotes
[global-ignores]: https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
[prettier]: https://prettier.io
[reportUnusedDisableDirectives]: https://eslint.org/docs/latest/use/configure/configuration-files-new#reporting-unused-disable-directives

### JSON

The [JSON config](./src/json.js) applies to all JSON files. It handles JSONC
(JSON with comments) and JSONC-like files.

- Configures [jsonc-eslint-parser] as the parser for the `.json` and `.jsonc`
  files.

  It does not lint `package-lock.json`.

- Includes [eslint-plugin-jsonc] and registers its `recommended-with-json` and
  `prettier` rule sets. Configures two sorting rules for all JSON files.

  - 🔧 [jsonc/sort-array-values][jsonc-sort-array-values] to standardize the
    array member order (no need to think or worry about the “best” order) and
    reduces merge conflicts. Feel free to `eslint-disable` at call sites.
  - 🔧 [jsonc/sort-keys][jsonc-sort-keys] sorts the keys.

- Allows comments in JSONC and JSONC-like files (for example, `tsconfig.json`).

- 🔧 Configures an explicit sort order for `package.json` keys. See the code for
  details.

  > 🔷 **Note**: This overrides the previous jsonc/sort-keys configuration. You
  > can configure specific sort orders for other files using similar logic.

[eslint-plugin-jsonc]: https://ota-meshi.github.io/eslint-plugin-jsonc/
[jsonc-eslint-parser]: https://www.npmjs.com/package/jsonc-eslint-parser
[jsonc-sort-array-values]: https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-array-values.html
[jsonc-sort-keys]: https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html
