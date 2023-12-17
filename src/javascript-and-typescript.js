import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const jsAndTsExtensions = `{cjs,cts,js,jsx,ts,tsx}`;
const tsOnlyExtensions = `{cts,ts,tsx}`;

// https://typescript-eslint.io/rules/member-ordering/#default-configuration
const defaultMemberOrder =
	typescriptPlugin.rules[`member-ordering`].defaultOptions[0].default;

/** @type {import("eslint").Linter.FlatConfig<import("@typescript-eslint/parser").ParserOptions>} */
const tsLanguageOptions = {
	files: [`**/*.${tsOnlyExtensions}`],
	languageOptions: {
		// https://typescript-eslint.io/packages/parser
		parser: typescriptParser,
		parserOptions: {
			ecmaVersion: `latest`,
			project: true, // Uses nearest tsconfig
			sourceType: `module`,
			// tsconfigRootDir: root-dir, // You need to configure TS root dir
		},
	},
};

/** @type {import("eslint").Linter.FlatConfig[]} */
export const javascriptAndTypescript = [
	tsLanguageOptions,
	{
		// General rules (JS + TS)
		files: [`**/*.${jsAndTsExtensions}`],
		languageOptions: {
			ecmaVersion: `latest`,
			globals: { ...globals[`shared-node-browser`] },
		},
		plugins: {
			sonarjs,
			unicorn,
		},
		rules: {
			...js.configs.recommended.rules,
			...sonarjs.configs.recommended.rules,
			...unicorn.configs.recommended.rules,
			// Standardizes order (no need to think or worry about the “best” order)
			// and reduces merge conflicts. Feel free to `eslint-disable`.
			// Also see `@typescript-eslint/member-ordering`.
			"sort-keys": [`error`, `asc`, { caseSensitive: false }],
			"unicorn/no-unused-properties": `error`,
			// 1. I prefer the explicit `return undefined;` syntax
			// 2. `return;` led to conflict with `sonarjs/no-redundant-jump` and tsc
			"unicorn/no-useless-undefined": `off`,
			"unicorn/prevent-abbreviations": [
				`error`,
				{
					allowList: {
						args: true, // Clear enough + common for GraphQL
						props: true, // Clear enough + common for React
						Props: true, // Clear enough + common for React
					},
				},
			],
			"unicorn/string-content": [
				`error`,
				{
					/* eslint-disable unicorn/string-content -- Configuring this rule */
					patterns: {
						// The quote items can cause controversy, so I’ve
						// commented out by default.
						//
						// '"': {
						// 	fix: false, // Should not fix quotes
						// 	message: `Use curly quotes (eslint-disable if needed)`,
						// 	suggest: `“”`, // Suggest both for easier fixing (delete the undesired one)
						// },
						// "'": {
						// 	fix: false, // Should not fix quotes
						// 	message: `Use curly quotes (eslint-disable if needed)`,
						// 	suggest: `‘’`, // Suggest both for easier fixing (delete the undesired one)
						// },
						"->": `→`,
						"<-": `←`,
						"\\.\\.\\.": `…`,
					},
					/* eslint-enable unicorn/string-content -- END */
				},
			],
		},
	},
	{
		// TypeScript-specific rules
		files: [`**/*.${tsOnlyExtensions}`],
		plugins: {
			"@typescript-eslint": typescriptPlugin,
		},
		rules: {
			...typescriptPlugin.configs[`recommended-type-checked`].rules,
			...typescriptPlugin.configs[`stylistic-type-checked`].rules,
			"@typescript-eslint/consistent-type-definitions": [`error`, `type`], // Prefer type!
			// Also see `sort-keys`.
			"@typescript-eslint/member-ordering": [
				`error`,
				{
					default: {
						memberTypes: defaultMemberOrder,
						optionalityOrder: `required-first`,
						order: `alphabetically-case-insensitive`,
					},
				},
			],
			"@typescript-eslint/no-non-null-assertion": `error`, // Require comment

			// Relax the recommended rule to allow `||` for strings (handle empty string)
			"@typescript-eslint/prefer-nullish-coalescing": [
				`error`,
				{ ignorePrimitives: { string: true } },
			],
		},
	},
	{
		// Dedicated import configuration
		files: [`**/*.${jsAndTsExtensions}`],
		languageOptions: {
			parserOptions: { ecmaVersion: `latest`, sourceType: `module` },
		},
		plugins: {
			import: importPlugin,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			...importPlugin.configs.recommended.rules,
			"import/extensions": [`error`, `ignorePackages`],
			"import/first": `error`,
			"import/newline-after-import": `error`,
			"import/no-absolute-path": `error`,
			"import/no-anonymous-default-export": `error`,
			"import/no-default-export": `error`,
			"import/no-deprecated": `warn`,
			"import/no-duplicates": `error`,
			"import/no-empty-named-blocks": `error`,
			"import/no-mutable-exports": `error`,
			// I had too many issues with `no-unresolved` (monorepo, exports, etc)
			"import/no-unresolved": `off`,
			"import/no-useless-path-segments": `error`,
			"simple-import-sort/exports": `error`,
			"simple-import-sort/imports": `error`,
		},
		settings: {
			// https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
			"import/parsers": { espree: [`.cjs`, `.js`] },
			"import/resolver": { node: true },
		},
	},
	{
		// And TS-specific import configuration
		files: [`**/*.${tsOnlyExtensions}`],
		rules: {
			...importPlugin.configs.typescript.rules,
			// Top-level for import elision. We need both rules for best fix-it dev
			// experience: one to add `type` and the other to fix the placement.
			"@typescript-eslint/consistent-type-imports": `error`,
			"import/consistent-type-specifier-style": [`error`, `prefer-top-level`],
		},
		settings: {
			"import/parsers": { "@typescript-eslint/parser": [`.ts`, `.tsx`] },
			"import/resolver:": { node: true, typescript: true },
		},
	},
	{
		// Allow default export for configuration files that must use it
		files: [
			`**/*.config.{js,ts}`,
			`**/.storybook/*.{js,ts}`,
			`**/*.stories.tsx`,
		],
		rules: { "import/no-default-export": `off` },
	},
	{
		// TS-specific test rules
		files: [`**/*.{spec,test}.${tsOnlyExtensions}`],
		rules: {
			// Let tests use non-null assertion (example: after checking defined or length)
			"@typescript-eslint/no-non-null-assertion": `off`,
		},
	},
];
