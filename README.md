# mobx-decorators-cra3
React project configuration with MobX decorators for create react app v3

The problem with CRA: ``SyntaxError: Support for the experimental syntax 'decorators-legacy' isn't currently enabled``

credit to original guide: https://tombuyse.be/blog/using-mobx-decorators-in-create-react-app-v3

to remake this follow these steps:
1. npm install --save mobx mobx-react
2. npm install --save-dev customize-cra react-app-rewired
3. change package.json scripts:

```
"start": "react-app-rewired start",
"build": "react-app-rewired build"
```

4. add config-overrides.js

```
const {addDecoratorsLegacy, useEslintRc, override} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    useEslintRc('./.eslintrc')
);
```

5. add .eslintrc file (optional if you don't have it)
```
{
  "extends": "react-app",
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  }
}
```

6. add jsconfig.json file:
```
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

should work now!
