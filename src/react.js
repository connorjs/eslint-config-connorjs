import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const react = [
	{
		files: [`**/*.{ts,tsx}`],
		plugins: {
			"jsx-a11y": jsxA11y,
			react: reactPlugin,
			"react-hooks": reactHooks,
		},
		rules: {
			...jsxA11y.configs.strict.rules,
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs[`jsx-runtime`].rules,
			// I find it harder to update components that use destructuring, plus it
			// looks horrible with inline types (given TypeScript usage)
			"react/destructuring-assignment": [`error`, `never`],
			// No inline styles! (CSP)
			"react/forbid-component-props": [`error`, { forbid: [`style`] }],
			"react/function-component-definition": [
				`error`,
				{
					// Function declarations are the only way to support generics in TSX,
					// so force it for consistency. Remember: This should auto-fix.
					namedComponents: `function-declaration`,
					// (a) Emphasizes unnamed and (b) nice for lambdas (ex: pass to `map`)
					unnamedComponents: `arrow-function`,
				},
			],
			"react/hook-use-state": `error`, // Should be recommended?
			"react/jsx-boolean-value": `error`, // JSX booleans
			// JSX readability
			"react/jsx-curly-brace-presence": [
				`error`,
				{
					children: `never`, // Disallow children like `{"Hello world"}`
					propElementValues: `always`, // Recommended
					props: `always`, // Allow backticks for quotes (always, not ignore!)
				},
			],
			"react/jsx-no-constructed-context-values": `error`, // Should be recommended?
			"react/jsx-no-leaked-render": `error`, // Do not render 0
			"react/jsx-no-useless-fragment": `error`, // For fix-it
			"react/jsx-props-no-spreading": `error`, // Force documenting why spreading all props
			// Standardizes order (no need to think or worry about the “best” order)
			// and reduces merge conflicts. Feel free to `eslint-disable`.
			"react/jsx-sort-props": [
				`error`,
				{ reservedFirst: true, shorthandFirst: true },
			],
			"react/no-array-index-key": `error`, // Force documenting why using index as key
			"react/no-danger": `error`, // Force documenting why using danger
			...reactHooks.configs.recommended.rules,
		},
		settings: {
			react: {
				pragma: undefined,
				version: `detect`,
			},
		},
	},
];
