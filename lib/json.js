import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";
import tseslint from "typescript-eslint";

export function json(options = {}) {
	const config = tseslint.config(
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
	);
	if (options.packageJson) {
		config.push({
			// Special rules for package.json
			files: [`**/package.json`],
			rules: {
				"jsonc/sort-keys": [
					`warn`, // warn because nothing is “wrong” and this config may change often
					{
						// Defines order of root properties
						order: [
							`name`,
							`version`,
							`description`,
							`private`,

							// Additional publish info
							`keywords`,
							`homepage`,
							`bugs`,
							`license`,
							`author`,
							`repository`,
							`publishConfig`,
							// End publish info

							`type`,
							`engines`, // Often used for ESM, so relates to `type`
							`engineStrict`,

							// Export fields
							`bin`,
							`directories`,
							`files`,
							`main`,
							`types`,
							`exports`,
							// End export fields

							`scripts`,
							// Tool-specific directly after scripts, alphabetical
							`browserslist`,
							`eslint`,
							`lint-staged`,
							// End tool-specific

							// Dependency related, specific order
							`overrides`, // Overrides before dependencies to emphasize their existence
							`optionalDependencies`,
							`peerDependencies`,
							`peerDependenciesMeta`,
							`dependencies`,
							`devDependencies`,
							// End dependency related

							`workspaces`,
							{ order: { type: `desc` } }, // Force other properties to go last
						],
						pathPattern: `^$`,
					},
					// Reinstate normal order for non-root properties
					{ order: { type: `asc` }, pathPattern: `.*` },
				],
			},
		});
	}
	return config;
}
