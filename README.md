# ESLint plugin: Pureness
Check the pureness of some files.

# Usage
1. Install the plugin via `npm install --save-dev git://git@github.com/rom-melnyk/eslint-plugin-pureness`
1. Include `"pureness"` to the `"plugins": []` array of your `.eslintrc` file.
1. Add the rule definition to the `"rules": {}` object. See [rules](#rules) below.

# History
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
1. Create the `test-me/` folder and put test files in it.
1. Create the `.eslintrc` file _(see the [example](#eslintrc-example) below)._
  - Ensure [file masks](#file-masks) for rules match the filename in `test-me/` folder. For instance, `"pureness/allow-new": [2, "formatter"]` and `test-me/some-formatter.es`.
1. Run `node node_modules/eslint/bin/eslint.js test-me/<your-file.es>` to check how the plugin works.
1. After development is done,
  1. create new git annotated tag, `git tag -a <version.number> -m "New release"`
  1. and push it: `git push origin <version.number>`

# File masks
Each plugin rule could be run against certain files determined by _masks_. A **mask** is the part of the _full file path._ Say you have `"pureness/allow-new": [2, "formatter", "helper"]`, so both `~/app/src/formatters/time.es` and `~/app/src/utils/time-helper.es` are verified but `~/app/src/views/clock.es` is skipped for this particular rule.

**Mind following:**
- by default, without defining correct masks, plugin rules won't work;
- masks are case-insensitive (Unix and Windows users should work fine together;
- `"*"` means force verifying all files.

# Rules
## `"pureness/forbidden-expressions": [2, <...options>]`
Forbids certain expressions in given files. **`<...options>`** is the sequence `Object`s of following structure:

- **`"masks"`** is `String` or `String[]`; determines which files to verify;
- **`"expression"`** is `String` or `String[]`, determines the list of forbidden calls, like `"ObjectName.methodName"` or `"ObjectName.*"`

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

## `"pureness/allow-new": [1, <...masks>]`
This raises the error/warning when meets `new SomeConstructor()` in any file that matches any of given masks.

**Example:** `"pureness/allow-new": [1, "formatter", "helper"]`

# `.eslintrc` example _(for development purposes)_
```
{
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "pureness"
    ],
    "rules": {
        // pureness-related
        "pureness/forbidden-expressions": [2,
            {
                "masks": "formatter",
                "expressions": ["Date.now", "_.now"]
            },
            {
                "masks": ["helper"],
                "expressions": "adapter.*"
            }
        ],
        "pureness/allow-new": [1, "formatter"],

        // some general rules for testing purposes
        "eqeqeq": [2, "allow-null"],
        "no-undef": 2
    },
    "globals": {
        "_": true
    }
}
```

# `test-me/some-formatter.es` example _(for development purposes)_
```
import adapter from 'adapter';

export function format_01(value) {
    let x;
    return value;
}

export function format_02(value) {
    value++;
    return value + Math.random() + _.now();
}

export function format_03(value) {
    adapter.do('azaza', value);
    return value;
}

export function format_04(value) {
    let x = new  Date();
    let y = new  Date.some.Ctor();
    let z = new  Promise((resolve) => {
        "use strict";
        // here be dragons
    });

    return value + x + y + z;
}
```

# Credits
Roman Melnyk, <email.rom.melnyk@gmail.com>, https://codedoc255.wordpress.com
