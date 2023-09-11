# eslint-config-connorjs

My (@connorjs’) preferred [ESLint][eslint] configuration. With ESLint flat config.

Use it directly ([§ Install](#install)) or take inspiration from it
([§ Rules and reasoning](#rules-and-reasoning)).

[eslint]: https://eslint.org

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
   
   export default {
     // earlier configuration
     connorjsConfig,
     // later 
   }
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

> 🟢 **Tip**: The [source code](./src) has inline comments that may provide more
> detail.
