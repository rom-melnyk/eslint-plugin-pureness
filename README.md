# ESLint plugin: Pureness
Check the pureness of some files.

# Development
1. Create the softlink from project root folder to `node_modules\eslint-plugin-pureness`:
  - Linux: `sudo ln -s node_modules/eslint-plugin-pureness ./`;
  - Windows: `junction -s node_modules\eslint-plugin-pureness .\`.
1. Put test files in `test-me/` folder.
1. Run `node node_modules/eslint/bin/eslint.js test-me/<your-file.es>` to check how the plugin works.

# Usage
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object like this:  
   `"pureness/pure": [2, "formatter", "helper"]`  
   what means that if `"formatter"` or `"helper"` is the part of full filename, the file **will be analyzed** otherwise it will be ignored.
