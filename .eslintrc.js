module.exports = {
  extends: "erb",
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "warn",
    // Since React 17 and typescript 4.1 you can safely disable the rule
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": 1,
    "no-undef": 1,
    "no-extra-semi": "warn",
    "no-empty": "warn",
    "no-async-promise-executor": "warn",
    "no-constant-condition": "warn",
    "no-case-declarations": "off",
    "prettier/prettier": "off",
    "import/newline-after-import": "off",
    "vars-on-top": "off",
    "no-var": "off",
    "no-use-before-define": "warn",
    "@typescript-eslint/return-await": "warn",
    "promise/catch-or-return": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "prefer-const": "warn",
    "no-param-reassign": "warn",
    "@typescript-eslint/naming-convention": "warn",
    "eqeqeq": "warn",
    "no-else-return": "warn",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "no-restricted-syntax": "warn",
    "one-var": "warn",
    "consistent-return": "warn",
    "import/prefer-default-export": "warn",
    "no-control-regex": "warn"
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  settings: {
    "import/resolver": {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts")
      },
      typescript: {}
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  }
};
