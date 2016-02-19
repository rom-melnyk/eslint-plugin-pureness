# ESLint plugin: Pureness
Check the pureness of some files.

# Development
1. Create the softlink from project root folder to `node_modules\eslint-plugin-pureness`:
  - Linux: `sudo ln -s node_modules/eslint-plugin-pureness ./`;
  - Windows: `junction -s node_modules\eslint-plugin-pureness .\`.
1. Put test files in `test-me/` folder.
1. Run `node node_modules/eslint/bin/eslint.js test-me/<your-file.es>` to check how the plugin works.

# Usage in production
1. Install the plugin via `npm i --save-dev git://git@github.com/rom-melnyk/eslint-plugin-pureness`
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object like this:  
   `"pureness/pure": [2, "formatter", "helper"]`  
   what means that if `"formatter"` or `"helper"` is the part of the _full filename,_ the file **will be analyzed** otherwise it **will be ignored**.  
   **Pay attention,** filename parts are case-insensitive (Unix and Windows users should work fine together).
1. Create the `.eslint-plugin-pureness-rc` file which describes project-specific unpure calls _(see example below)._

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
