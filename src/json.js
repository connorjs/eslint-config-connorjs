import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export const json = [
	{
		// JSON files
		files: [`**/*.{json,jsonc}`],
		ignores: [`package-lock.json`],
		languageOptions: {
			parser: jsoncParser,
		},
		plugins: { jsonc: jsoncPlugin },
		rules: {
			...jsoncPlugin.configs[`recommended-with-json`].rules,
			...jsoncPlugin.configs.prettier.rules,
			// Standardizes order (no need to think or worry about the “best” order)
			// and reduces merge conflicts. Feel free to `eslint-disable`.
			"jsonc/sort-array-values": [
				`error`,
				{ order: { type: `asc` }, pathPattern: `.*` },
			],
			"jsonc/sort-keys": `error`, // Specify per-file orders as needed (below)
		},
	},
	{
		// These allow comments (a.k.a. JSONC files)
		files: [
			`**/global.json`,
			`**/tsconfig*.json`,
			`**/turbo.json`,
			`**/*.jsonc`,
		],
		rules: { "jsonc/no-comments": `off` },
	},
	{
		// Special rules for package.json
		files: [`**/package.json`],
		rules: {
			"jsonc/sort-keys": [
				`error`,
				{
					// Defines order of root properties
					order: [
						`name`,
						`version`,
						`description`,
						`private`,
						`keywords`,
						`homepage`,
						`bugs`,
						`license`,
						`author`,
						`type`,
						`bin`,
						`directories`,
						`files`,
						`exports`,
						`scripts`,
						`lint-staged`,
						`peerDependencies`,
						`dependencies`,
						`devDependencies`,
						`workspaces`,
						{ order: { type: `desc` } }, // Force other properties to go last
					],
					pathPattern: `^$`,
				},
				// Reinstate normal order for non-root properties
				{ order: { type: `asc` }, pathPattern: `.*` },
			],
		},
	},
];
