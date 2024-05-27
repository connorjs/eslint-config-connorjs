import { base } from "./base.js";
import { graphql } from "./graphql.js";
import { html } from "./html.js";
import { javascriptAndTypescript } from "./javascript-and-typescript.js";
import { json } from "./json.js";
import { react } from "./react.js";

/**
 * The @connorjs ESLint config.
 *
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile}
 */
const connorjsConfig = [
	...javascriptAndTypescript,
	...react,
	...json({ packageJson: true }),
	...html,
	...base, // Last to apply to all file types
];

// eslint-disable-next-line import/no-default-export -- ESLint configs use default export (community practice)
export default connorjsConfig;

/**
 * Creates a custom `@connorjs` ESLint config.
 *
 * @param options - Configuration options.
 * @param options.html {boolean=true} - Enables HTML.
 * @param options.graphql {boolean=false} - Enables GraphQL.
 * @param options.packageJson {boolean=true} - Applies `package.json` sorting rules.
 */
export function createConnorjsConfig(options = {}) {
	return [
		...javascriptAndTypescript,
		...react,
		...json({ packageJson: options.packageJson ?? true }),
		...(options.html ?? true ? html : []),
		...(options.graphql ? graphql : []),
		...base, // Last to apply to all file types
	];
}
