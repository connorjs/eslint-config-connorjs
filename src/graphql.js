import {
	flatConfigs,
	parseForESLint,
	rules,
} from "@graphql-eslint/eslint-plugin";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const graphql = [
	{
		files: [`**/*.graphql`],
		languageOptions: {
			parser: { parseForESLint },
			// Assumes that GraphQL projects will use GraphQL config file,
			// which GraphQL ESLint plugin will use to find the schema.
			// Provide the schema directly if you do not use GraphQL config.
			// parserOptions: {
			// 	schema: `path/to/schema`
			// },
		},
		plugins: {
			"@graphql-eslint": { rules },
		},
		rules: {
			...flatConfigs[`schema-recommended`].rules,
			"@graphql-eslint/naming-convention": `off`, // Use Lifecycle naming (Get*, List*, etc)
		},
	},
];
