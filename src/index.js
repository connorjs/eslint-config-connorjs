import { base } from "./base.js";
import { json } from "./json.js";
import { html } from "./html.js";
import { graphql } from "./graphql.js";

/**
 * The @connorjs ESLint config.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
	...json,
	...html,
	...graphql,
	...base, // Last to apply to all file types
];
