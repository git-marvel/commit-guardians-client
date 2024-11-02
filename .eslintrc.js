export default {
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "unused-imports/no-unused-imports": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/button-has-type": "off",
    "prefer-arrow-callback": "off",
    "func-style": ["error", "expression"],
    "prettier/prettier": "error",
  },
  plugins: ["react", "prettier", "unused-imports"],
};
