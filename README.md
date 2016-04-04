# ESLint plugin: Pureness
Check the pureness of some files.

# Usage
1. Install the plugin via `npm install --save-dev git://git@github.com/rom-melnyk/eslint-plugin-pureness`
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object. See [rules](#rules) below.

# History
- **v2.2.0**
  - `Promise.then()` sequence recognition;
  - `new Date` vs `new Date(param)` distinguishing.
- **v2.1.1**
  - `import/require` things are now case-insensitive.
- **v2.1.0**
  - `import { forbidden } from 'non_forbidden';` recognized;
  - `"*"` is recognized as object name wildcard.
- **v2.0.1**
  - documentation updated;
  - publishing.
- **v2.0.0**
  - `.eslint-plugin-pureness-rc` removed; config now resides in `.eslintrc`;
  - `"pureness/pure"` does not exist anymore, see [rules](#rules) below.
- **v1.0.1**
  - an error was fixed in the `"pureness/pure"` analyzer;
  - `new Ctor()` is considered as unpure code too.
- **v1.0.0** The newborn.
  - Plugin understands unpure expressions like `Date.now()`;
  - Expression list is configurable.

# Plugin development
1. Run `npm install`.
  - If you use `npm 3+`, install **eslint** by running `npm install eslint`.  
   **Why?** Npm changed the `peerDependencies` treatment since v3.
1. Create the softlink from project root folder to `node_modules\eslint-plugin-pureness`:
  - Linux: `sudo ln -s $(pwd) $(pwd)/node_modules/eslint-plugin-pureness`;
  - Windows: `junction -s node_modules\eslint-plugin-pureness .\` _(usually you have to install the `junction`)_.
1. Run `node node_modules/eslint/bin/eslint.js test-me/*` to check how the plugin works.
1. After development is done,
  1. create new git annotated tag, `git tag -a <version.number> -m "New release"`
  1. and push it: `git push origin <version.number>`

# File masks
Each plugin rule could be run against certain files determined by _masks_. A **mask** is the part of the _full file path._ Say you have `"pureness/forbid-new": [2, "formatter", "helper"]`, so both `~/app/src/formatters/time.es` and `~/app/src/utils/time-helper.es` are verified but `~/app/src/views/clock.es` is skipped for this particular rule.

**Mind following:**
- by default, without defining correct masks, plugin rules won't work;
- masks are case-insensitive (Unix and Windows users should work fine together;
- `"*"` means force verifying all files.

# Rules
## `"pureness/forbidden-expressions": [2, <...options>]`
Forbids certain expressions in given files. **`<...options>`** is the sequence objects of following structure:

- **`"masks"`** is `String` or `String[]`; determines which files to verify;
- **`"expressions"`** is `String` or `String[]`, determines the list of forbidden calls, like `"ObjectName.methodName"`. `"*"` is allowed as a wildcard for both _ObjectName_ and _methodName_.  
   **`"expressions"`** are case-sensitive (according to JS rules).

**Example:**
```
// ----- single rule -----
"pureness/forbidden-expressions": [2,
  {
    "masks": "formatter",
    "expressions": ["Date.now", "_.now"]
  }
]

// ----- different rules for different areas -----
"pureness/forbidden-expressions": [2,
  {
    "masks": ["formatter", "helper"],
    "expressions": ["Date.now", "_.now"]
  },
  {
    "masks": "view",
    "expressions": ["adapter.*", "Math.random"]
  }
]
```

## `"pureness/forbidden-import": [2, <...options>]`
Forbids importing/requiring certain modules in given files. **`<...options>`** work in same way as in `"pureness/forbidden-expressions"` but use **`"modules"`** instead of `"expressions"`.

- Part of the module name works _as a mask_ so following example works against both `require('./classMate')` and `require('classnames')`.
- **`"modules"`** are case-insensitive, so `import Cls from './MyPrettyClass'` also raises an error.
- Submodules and import decomposition is also analyzed. `import { MyClass } from './allowed-file'` raises the error with following example as well.

**Example:**
```
"pureness/forbidden-import": [2,
  {
    "masks": "formatter",
    "modules": ["adapter", "class"]
  }
]
```

## `"pureness/forbid-new": [1, <...masks>]`
Raises the error/warning when meets `new AnyConstructor()` in any file that matches any of given masks. **`<...masks>`** is sequence of strings.

**Example:** `"pureness/forbid-new": [1, "formatter", "helper"]`

## `"pureness/promise-catch": [1, <...masks>]`
Ensures all the `.then()` sequences are terminated by `.catch()` or `.done()`, otherwise raises the error/warning. **`<...masks>`** is sequence of strings.

**Example:** `"pureness/promise-catch": [1, "*"]`

---

# Credits
Roman Melnyk, <email.rom.melnyk@gmail.com>, (https://codedoc255.wordpress.com)
