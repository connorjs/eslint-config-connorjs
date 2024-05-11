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
const config = [
	...javascriptAndTypescript,
	...react,
	...json,
	...html,
	...graphql,
	...base, // Last to apply to all file types
];

// eslint-disable-next-line import/no-default-export -- ESLint configs use default export (community practice)
export default config;
