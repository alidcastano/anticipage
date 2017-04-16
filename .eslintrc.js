module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "brace-style": ["error", "1tbs"],
    "space-before-function-paren": ["error", "always"],
    "one-var": ["error", {
      var: "always",
      let: "never",
      const: "never"
    }],
    "indent": ["error", 2, {
      "VariableDeclarator": {
        "var": 2,
        "let": 2,
        "const": 3
      }
    }]
  },
  globals: {}
}
