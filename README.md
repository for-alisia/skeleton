# BABEL, WEBPACK, ESLINT - how to configure

## Babel

Let's add Babel to the project. Babel allows us to use the lates ES syntax - it will transpile our code for browsers that do not support new features

1. We need to create package.json. In your terminal:

   ```
   npm init
   ```

   If you are ok with standart config and don't want to be promted with questions:

   ```
   npm init -y
   ```

2. Let's install Babel and Babel CLI

   ```
   npm install --save-dev @babel/core @babel/cli
   ```

   --save-dev flag shows that it's a dev-dependency (as a short version we can use -D flag)

3. If you want to compile:

   ```
   npx babel src --out-dir build
   ```

   src - folder where our source files are, build - folder where to put the result files (names are totally up to you)

4. Let's install preset for all last JS features (env)

   ```
     npm install -D @babel/preset-env
   ```

   You can find docs about this preset [here](https://babeljs.io/docs/en/babel-preset-env)

5. Let's create .babelrc file - there we keep config for Babel

   ```json
   {
     "presets": ["@babel/env"]
   }
   ```

6. If we need some plugin that is not included under env-preset, we need to install it separately (for example, some proposal syntax, that is not included to a standard yet)

   ```
   npm install -D @babel/plugin-proposal-partial-application
   ```

7. After installation we need to add it to our .babelrc

   ```json
   {
     "presets": ["@babel/env"],
     "plugins": ["@babel/plugin-proposal-partial-application"]
   }
   ```

   [Here](https://babeljs.io/docs/en/plugins-list) we can find all available plugins

8. To optimize our output file we should specify browsers we want to support (to support all browsers is not nice as our files will be too big)

   We can do it in .babelrc this way:

   ```json
   {
     "presets": [
       [
         "@babel/env",
         {
           "targets": {
             "edge": "18",
             "chrome": "74"
           },
           "debug": true
         }
       ]
     ],
     "plugins": ["@babel/plugin-proposal-partial-application"]
   }
   ```

   Debug prop will allow you to see all browsers and other details in terminal when you build your app

   Or we can add it in package.json (more preferable)

   ```json
   {
     "browserslist": ["last 2 chrome versions", "last 2 safari versions"]
   }
   ```

   Or we can create .browserslist file and put the list of browsers there

   ```
    > 0.5%
    last 2 versions
    Firefox ESR
    not dead
   ```

   More info about this expressions you can see [on the ifficial page](https://github.com/browserslist/browserslist#query-composition)

   How to detect if some feature is supported or not? Take a look in [CanIUse](https://caniuse.com/). Just search for a feature and you'll see the browser support

9. Polyfills. Sometimes we want to support not a new feature added to JS, but some feature (for example new method added to Array.prototype). In this case we need a library that provides us such polyfills. Let's install it

   ```
   npm install core-js
   ```

   Docs for this library can be found [here](https://www.npmjs.com/package/core-js)

10. Then we need to change our .babelrc

    ```json
    {
      "presets": [
        [
          "@babel/env",
          {
            "corejs": 3,
            "useBuiltIns": "usage",
            "modules": false,
            "debug": true
          }
        ]
      ],
      "plugins": ["@babel/plugin-proposal-partial-application"]
    }
    ```

    corejs - release version of the library (first number in version)
    useBuiltIns - with set to "usage", it will add only polyfills for features we are using in our code (based on browser list)
    modules - by default it will convert all imports to CommonJS syntax (require), but we do not need it, as we will add Webpack soon
