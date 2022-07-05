# BABEL, WEBPACK, ESLINT - how to configure

---

## Babel

Let's add Babel to the project. Babel allows us to use the latest ES syntax - it will transpile our code for browsers that do not support new features. The official docs can be found [here](https://babeljs.io/docs/en/).

1. We need to create package.json. In your terminal:

   ```
   npm init
   ```

   If you are ok with standart config and don't want to be promted with questions:

   ```
   npm init -y
   ```

   Side note: do not forget to <strong>add node_modules to your .gitignore</strong> file before you start to commit!

   </br>

2. Let's install <strong>Babel</strong> and <strong>Babel CLI</strong>

   ```
   npm install --save-dev @babel/core @babel/cli
   ```

   <code>--save-dev</code> flag shows that it's a dev-dependency (as a short version we can use <code>-D</code> flag)

   </br>

3. If you want to compile:

   ```
   npx babel src --out-dir build
   ```

   <strong>src</strong> - folder where our source files are, <strong>build</strong> - folder where to put the result files (names are totally up to you)

   </br>

   <i>Further we'll add Webpack to do it for us</i>

   </br>

4. Let's install preset for all last JS features (<strong>preset-env</strong>)

   ```
     npm install -D @babel/preset-env
   ```

   You can find docs about this preset [here](https://babeljs.io/docs/en/babel-preset-env)

   </br>

   <i>Presets are like sets of different plugins. For example you can add all plugins one by one, but it's handy to use presets for common purposes</i>

   </br>

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

   </br>

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

   <strong>Debug</strong> prop will allow you to see all browsers and other details in terminal when you build your app

   </br>

   <strong>Or</strong> we can add it in <strong>package.json</strong> (more preferable)

   ```json
   {
     "browserslist": ["last 2 chrome versions", "last 2 safari versions"]
   }
   ```

   <strong>Or</strong> we can create <strong>.browserslist</strong> file and put the list of browsers there (<i>I like this approach more</i>)

   ```
    > 0.5%
    last 2 versions
    Firefox ESR
    not dead
   ```

   More info about this expressions you can see [on the ifficial page](https://github.com/browserslist/browserslist#query-composition)

   </br>

   How to detect if some feature is supported or not? Take a look in [CanIUse](https://caniuse.com/). Just search for a feature and you'll see the browser support

   </br>

9. <strong>Polyfills</strong>. Sometimes we want to support not a new syntax added to JS, but some feature (for example new method added to Array.prototype). In this case we need a library that provides us such polyfills. Let's install it

   ```
   npm install core-js
   ```

   Docs for this library can be found [here](https://www.npmjs.com/package/core-js)

   </br>

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

    <p><strong>corejs</strong> - release version of the library (first number in version)</p>
    <p><strong>useBuiltIns</strong> - with set to "usage", it will add only polyfills for features we are using in our code (based on browser list)</p>
    <p><strong>modules</strong> - by default it will convert all imports to CommonJS syntax (require), but we do not need it, as we will add Webpack soon</p>

Now we are good to go with Babel. Please note, that there are other presets that allow you to add the support of some other syntax as well (react, for example). You can combine several presets.

---

# Webpack
