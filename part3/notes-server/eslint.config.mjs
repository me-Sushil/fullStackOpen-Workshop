import globals from "globals";
import js from "@eslint/js";
// import stylisticJs from "@stylistic/eslint-plugin-js";


export default [
  js.configs.recommended, // only core error-prevention rules
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    rules: {
      // Keep important ones
      eqeqeq: 'error',         // no accidental ==
      'no-undef': 'error',     // no using undefined variables
      'no-unused-vars': 'error', // no unused variables

      // Allow developer freedom
      'no-console': 'off',     // console.log is fine
    },
  },
  {
    ignores: ['dist/**'],
  },
];

// export default [
//   js.configs.recommended,
//   {
//     files: ["**/*.js"],
//     languageOptions: {
//       sourceType: "commonjs",
//       globals: { ...globals.node },
//       ecmaVersion: "latest",
//     },
//     plugins: {
//       "@stylistic/js": stylisticJs,
//     },
//     rules: {
//       "@stylistic/js/indent": ["error", 2],
//       "@stylistic/js/linebreak-style": ["error", "unix"],
//       "@stylistic/js/quotes": ["error", "double"],
//       "@stylistic/js/semi": ["error", "always"],
//       eqeqeq: "error",
//       "no-trailing-spaces": "error",
//       "object-curly-spacing": ["error", "always"],
//       "arrow-spacing": ["error", { before: true, after: true }],
//       "no-console": "off",
//     },
//   },
//   {
//     ignores: ["dist/**"],
//   },
// ];