module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-control-regex": ["error"],
    "react/prop-types": 0,
    "no-fallthrough": 0
  },
  globals: {
    API: false,
    IS_PRODUCTION: false,
    ga: false,
    SC: false,
    mapboxgl: false
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
