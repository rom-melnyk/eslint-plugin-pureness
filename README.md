# ESLint plugin: Pureness
Check the pureness of some files.

# Usage in production
1. Install the plugin via `npm install --save-dev git://git@github.com/rom-melnyk/eslint-plugin-pureness`
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object like this:  
   `"pureness/pure": [2, "formatter", "helper"]`  
   what means that if `"formatter"` or `"helper"` is the part of the _full filename,_ the file **will be analyzed** otherwise it **will be ignored**.  
   **Pay attention,** filename parts are case-insensitive (Unix and Windows users should work fine together).
1. Create the `.eslint-plugin-pureness-rc` file which describes project-specific unpure calls _(see the example below)._

# Development
1. Run `npm install`.
  - If you use `npm 3+`, install **eslint** by running `npm install eslint`.  
   **Why?** Npm changed the `peerDependencies` treatment since v3.
1. Create the softlink from project root folder to `node_modules\eslint-plugin-pureness`:
  - Linux: `sudo ln -s node_modules/eslint-plugin-pureness ./`;
  - Windows: `junction -s node_modules\eslint-plugin-pureness .\` (usually you have to install `junction`).
1. Create the `test-me/` folder and put test files in it.
1. Create the `.eslintrc` file _(see the example below)._  
   **Pay attention,** at least one `"pureness/pure"` option should match the filename in `test-me/` folder. For instance, `"pureness/pure": [2, "formatter"]` and `test-me/some-formatter.es`.  
   See [Usage](#usage-in-production) for more info.
1. Create the `.eslint-plugin-pureness-rc` file _(see the example below)._
1. Run `node node_modules/eslint/bin/eslint.js test-me/<your-file.es>` to check how the plugin works.
1. After development is done,
  1. create new git annotated tag, `git tag -a <version.number> -m "New release"`
  1. and push it: `git push origin <version.number>`

# `.eslintrc` example
```
{
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "plugins": [
        "pureness"
    ],
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
    "rules": {
        // pureness-related
        "pureness/pure": [2, "formatter"],

        // some general rules for testing purposes
        "eqeqeq": [2, "allow-null"],
        "no-undef": 2
    },
    "globals": {
        "_": true
    }
}
```

# `.eslint-plugin-pureness-rc` example
```
{
    /**
     * @type {String[]}
     * Defines calls that make methods unpure.
     * "Obj.*" means that any method of "Obj" object will raise the error/warning.
     */
    "unpure-expressions": [
        "Math.random", "Date.now", "_.now"
    ]
}
```

# Credits
Roman Melnyk, <email.rom.melnyk@gmail.com>, https://codedoc255.wordpress.com
