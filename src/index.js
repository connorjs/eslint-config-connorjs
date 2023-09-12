import { base } from "./base.js";
import { json } from "./json.js";

/**
 * The @connorjs ESLint config.
 *
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
	...json,
	...base, // Last to apply to all file types
];
