# ESLint plugin: Pureness
Check the pureness of some files.

# Usage
1. Install the plugin via `npm install --save-dev eslint-plugin-pureness`
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object. See [rules](#rules) below.

# History
- **v2.2.0**
  - `pureness/forbid-new` recognizes params so far.
  - new syntax of `forbid-new` rule introduced.
- **v2.1.2**
  - ESLint version bumped.
- **v2.1.1**
  - `import/require` things are now case-insensitive. This version **still works with ESLint v2.x.x** but installation emits warnings.
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
  - `new Ctor()` is considered as impure code too.
- **v1.0.0** The newborn.
  - Plugin understands impure expressions like `Date.now()`;
  - Expression list is configurable.

# General notes
Each rule ha syntax `"pureness/<rule-name>": [<level>, <...options>]`, where
- **`<rule-name>`** is one of described below,
- **`<level>`** is error level to raise (`"warn"`, `"error"`, or `1` and `2` according to legacy rules),
- **`<...options>`** is the sequence of objects describing rule-specific parameters. Every option **must contain the `masks` field** (`String` or `String[]`). It determines files the rule is run against. A **mask** is the part of the _full file path._ If you have, for instance,  
   `"pureness/forbid-new": ["error", { "masks": ["formatter", "helper"], ... }]`  
   both `src/formatters/time.es` and `src/utils/time-helper.es` are verified but `src/views/clock.es` is skipped for this particular rule.

**Mind following:**
- by default, without defining correct masks, plugin rules won't work;
- masks are case-insensitive (Unix and Windows users should work fine together;
- `"*"` means force verifying all files.

# Rules
## `"pureness/forbidden-expressions": ["error", <...options>]`
Forbids certain expressions in given files. **`<...options>`** is the sequence objects of following structure:

- **`"masks"`** is `String` or `String[]`; determines which files to verify;
- **`"expressions"`** is `String` or `String[]`, determines the list of forbidden calls, like `"ObjectName.methodName"`. `"*"` is allowed as a wildcard for both _ObjectName_ and _methodName_.  
   **`"expressions"`** are case-sensitive (according to general ECMA language principles).

**Example:**
```
// ----- single rule -----
"pureness/forbidden-expressions": ["error",
  {
    "masks": "formatter",
    "expressions": ["Date.now", "_.now"]
  }
]

// ----- different rules for different areas -----
"pureness/forbidden-expressions": ["error",
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

## `"pureness/forbidden-import": ["error", <...options>]`
Forbids importing/requiring certain modules in given files. **`<...options>`** work in same way as in `"pureness/forbidden-expressions"` but use **`"modules"`** instead of `"expressions"`.

- Part of the module name works _as a mask_ so example below works against both `require('./classMate')` and `require('classnames')`.
- **`"modules"`** are case-insensitive, so `import Cls from './MyPrettyClass'` also raises an error (see example).
- Submodules and import decomposition is also analyzed. `import { MyClass } from './allowed-file'` raises the error with the example as well.

**Example:**
```
"pureness/forbidden-import": ["error",
  {
    "masks": "formatter",
    "modules": ["adapter", "class"]
  }
]
```

## `"pureness/forbid-new": ["warn", <...options>]`
Raises the error/warning when meets `new AnyConstructor()` in given files. **`<...options>`** is sequence of objects of following structure:

- **`"masks"`** is `String` or `String[]`; determines which files to verify;
- **`"allow"`** is `String` or `String[]`; determines list of constructors that are allowed.  
   For example, `new Promise()` does not affect code pureness;
- **`"allow-with-params"`** or **`"allowWithParams"`** is `String` or `String[]`, determines the list of constructors that produce pure code being called with params.  
   For example, `new Date()` is impure because changes result from time to time; `new Date(2016, 12, 31)` always returns similar object (however not _the same_ object) so might be considered as pure.

The legacy (v2.1.x and below) syntax `"pureness/forbid-new": ["warn", <...masks>]` is still supported.


**Example (legacy syntax):** `"pureness/forbid-new": ["warn", "formatter", "helper"]`

**Example (syntax of v2.2.x):**
```
"pureness/forbid-new": ["warn",
  {
    "masks": ["formatter", "helper"],
    "allow-with-params": ["Date"]
  },
  {
    "masks": "views"
  },
  {
    "masks": "*",
    "allow": "Promise"
  }
]
```

# Plugin development
1. Run `npm install`.
  - Run `npm install && npm install eslint` (it's mandatory to install **eslint** separately because `npm` changed the `peerDependencies` treatment since v3).
1. Create the softlink from project root folder to `node_modules\eslint-plugin-pureness`:
  - Linux: `sudo ln -s $(pwd) $(pwd)/node_modules/eslint-plugin-pureness`;
  - Windows: `junction -s node_modules\eslint-plugin-pureness .\` _(usually you have to install the `junction`)_.
1. Run `node node_modules/eslint/bin/eslint.js test-me/*` to check how the plugin works.
1. After development is done,
  1. create new git annotated tag, `git tag -a <version.number> -m "New release"`
  1. and push it: `git push origin <version.number>`

The `EsLint.RuleTester` will be introduced with one of next releases.

---

# Credits
Roman Melnyk, <email.rom.melnyk@gmail.com>, (https://codedoc255.wordpress.com)
