import prettierConfig from "eslint-config-prettier";
import eslintComments from "eslint-plugin-eslint-comments";
import tseslint from "typescript-eslint";

export const base = tseslint.config(
	{
		// ESLint linter options (apply to all files)
		// https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-linter-options
		linterOptions: {
			reportUnusedDisableDirectives: `error`,
		},
	},
	{
		// ESLint comments plugin/rules (apply to all files)
		plugins: { "eslint-comments": eslintComments },
		rules: {
			...eslintComments.configs.recommended.rules,
			"eslint-comments/require-description": `error`,
		},
	},
	prettierConfig,
	{
		// Use template literals to allow easier change to interpolation.
		// This MUST follow prettier.
		files: [`**/*.{cjs,cts,js,jsx,ts,tsx}`],
		rules: { quotes: [`error`, `backtick`, { avoidEscape: true }] },
	},
	{
		// Global ignores. Related to `.gitignore`
		// https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
		ignores: [
			`**/{build,coverage,dist,generated,.nx,.turbo}`,
			`**/*.generated.*`,
		],
	},
);
