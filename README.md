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

   <strong>Or</strong> we can create <strong>.browserslistrc</strong> file and put the list of browsers there (<i>I like this approach more</i>)

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

Webpack - a bundler that can build projects. By default it can work only with js files, but by adding loaders and plugins we can expand it's functionality significantly. Official docs are [here](https://webpack.js.org/)

1. Let's install <strong>Webpack</strong> in our project.

   ```
   npm install -D webpack webpack-cli
   ```

</br>

2. Even without any configuration file we can start Webpack using command:

   ```
   npx webpack
   ```

   But we'll get a warning, that Webpack doesn't know what mode it should use. Usually we should specify at least 2 configurations - development and production.

   </br>

   For now let's add a flag to our command:

   ```
   npx webpack --mode development
   ```

   </br>

3. Let's create <code>webpack.config.js</code> file, where we can create our configuration.

   <i>It's a usual JS file, runtime is NodeJS, so we can use all Node features (for example path). And this file uses CommonJS syntax</i>

   ```javascript
   module.exports = {
     mode: 'development',
     entry: './src/main.js', // not nessesary
     output: {
       filename: './dist/main', // default setting
     },
   };
   ```

   You can read about <strong>entry</strong> [here](https://webpack.js.org/concepts/entry-points)

   You can read about <strong>output</strong> [here](https://webpack.js.org/concepts/output)

   Output and input have default settings and if we are ok with it we can not change them (just skip these options in the configuration file)

4. Now we can run webpack using <code>npx webpack</code>, but let's add a script to <code>package.json</code>

   ```json
     "scripts": {
       "start": "webpack"
     }
   ```

   If we run <code>npm start</code>, it will buid our project in development mode (as we have it in config file)

5. Let's install file-loader for other files (images, fonts).

   ```
   npm install -D file-loader
   ```

6. Then we need to change config file to explain Webpack what it should do and with what files

   ```javascript
   module.exports = {
     mode: 'development',
     module: {
       rules: [
         // Loading images
         {
           test: /\.(png|jpg|jpeg|gif|ico)$/, // regexp for file type
           use: [
             {
               loader: 'file-loader', // what loader to use
               options: {
                 outputPath: 'images', // where to put images
                 name: '[name]-[sha1:hash:7].[ext]', // how to change name for images
               },
             },
           ],
         },
         // Loading fonts
         {
           test: /\.(ttf|otf|eot|woff|woff2)$/,
           use: [
             {
               loader: 'file-loader',
               options: {
                 outputPath: 'fonts',
                 name: '[name].[ext]',
               },
             },
           ],
         },
       ],
     },
   };
   ```

7. Let's install loader for babel - to use our .babelrc we created before

   ```
   npm install -D babel-loader
   ```

   And add the rule to <code>webpack.config.js</code>

   ```javascript
   module.exports = {
     mode: 'development',
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
         },
         // Loading images
         // ...
         // Loading fonts
         // ...
       ],
     },
   };
   ```

   <i>We need to exclude node_modules as we do not want to convert files from libraries</i>

   <strong>Note:</strong> we have 3 different possibilities to create a rule:

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/,
           loader: 'babel-loader', // just with loader as a string
         },
       ],
     },
   };
   ```

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/,
           use: ['babel-loader'], // with use and array of strings
         },
       ],
     },
   };
   ```

   ```javascript
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/,
           use: [
             {
               // with object - we can specify options
               loader: 'babel-loader',
               options: {},
             },
           ],
         },
       ],
     },
   };
   ```

8. Let's add loader for styles (we will need 2 loaders)

   ```
   npm install -D style-loader css-loader
   ```

   And then let's add them to our config file:

   ```javascript
   module.exports = {
     module: {
       rules: [
         // Styles (CSS)
         {
           test: /\.(css)$/,
           use: ['style-loader', 'css-loader'],
         },
       ],
     },
   };
   ```

   The order is important here - Webpack will start from the end - this way css-loader will create our css, style-loader will add it on the page (with style tag - it's very convenient for the development, but bad for production)

9. If we want to add support of SCSS to our project:

   Install loader and sass:

   ```
   npm install -D node-sass sass-loader
   ```

   Then configure the rule:

   ```javascript
   module.exports = {
     module: {
       rules: [
         // Styles (SCSS/SASS)
         {
           test: /\.(s[ca]ss)$/,
           use: ['style-loader', 'css-loader', 'sass-loader'],
         },
       ],
     },
   };
   ```

   Do not remove CSS rule - we can use it for CSS from libraries

10. Now let's add plugins to our configuration. If loaders work with modules, plugins work with the whole project. They have different syntax to add them

11. Let's add HTML plugin

    ```
    npm install -D html-webpack-plugin
    ```

    Plugins should be imported in config file:

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ```

    And after let's add it to the <code>plugins</code> section in our config

    ```javascript
    module.exports = {
      module: {
        // your rules here...
      },
      plugins: [new HtmlWebpackPlugin()],
    };
    ```

    By default HTMLWebpackPlugin doesn't copy our index.html to dist - it creates a new one in dist folder.
    To change it we need to add config to the constructor:

    ```javascript
    module.exports = {
      module: {
        // your rules here...
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Example of config web app',
          buildTime: new Date().toISOString(),
          template: 'src/index.html',
        }),
      ],
    };
    ```

    template - tells Webpack to take our html from src folder

    Other fields can be used in html - to specify some additional info about your build. To use it let's modify index.html:

    ```html
    <div><%= htmlWebpackPlugin.options.buildTime %></div>
    ```

    In this block we'll see the time when we created build

12. Let's add Dev Server to start our project

    ```
    npm install -D webpack-dev-server
    ```

    Now we need to change our script in <code>package.json</code>

    ```json
    "scripts": {
      "start": "webpack-dev-server",
      "build": "webpack --mode production"
    }
    ```

    To start our project you need to run <code>npm start</code> and to build a project - <code>npm run build</code>

13. Let's add some config options for our dev server to <code>webpack.config.js</code>

    ```javascript
    module.exports = {
      module: {
        // your rules here...
      },
      plugins: [
        // your plugins
      ],
      devServer: {
        open: true, // will open new tab in browser
        port: 3333, // change the default port
      },
    };
    ```

    Dev Server has a lot of options. See details [here](https://webpack.js.org/configuration/dev-server/)

14. For development and production we want to have different configs. For example, we do not want to add styles in html for production. Let's add plugin to add styles as css file

    ```
    npm install -D mini-css-extract-plugin
    ```

    And then add it to our plugins:

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module.exports = {
      module: {
        // your rules here...
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Example of config web app',
          buildTime: new Date().toISOString(),
          template: 'public/index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css',
        }),
      ],
    };
    ```

    And to make it work we need to change <code>'style-loader'</code> in our rules to <code>MiniCssExtractPlugin.loader</code>

15. Let's specify what config we need to use for development and for production. We can create separate files for each mode and then in our scripts add this config files:

    ```json
    "build": "webpack --config webpack.prod.config.js"
    ```

    But we can use 1 common file and check in what mode our webpack is now. First of all, we'll need to change our syntax in <code>webpack.config.js</code> to return not an object, but a function that returns an object. This function will get args, and we will be able to get our mode from there.

    </br>

    The whole file can look like this:

    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    // We need to export a function that returns our config
    module.exports = (_, argv) => {
      // Let's get in what mode we are
      const isProd = argv.mode === 'production';
      // Return loaders for styles based on the mode
      const getStyleLoaders = () => [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
      ];
      // We need extract-css plugin only for prod
      const getPlugins = () => {
        const plugins = [
          new HtmlWebpackPlugin({
            title: 'Example of config web app',
            buildTime: new Date().toISOString(),
            template: 'public/index.html',
          }),
        ];

        if (isProd) {
          plugins.push(
            new MiniCssExtractPlugin({
              filename: 'main-[hash:8].css',
            })
          );
        }

        return plugins;
      };

      return {
        mode: isProd ? 'production' : 'development',
        output: {
          filename: isProd ? 'main-[hash:8].js' : undefined,
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            },
            // Styles (CSS)
            {
              test: /\.(css)$/,
              use: getStyleLoaders(),
            },
            // Styles (SCSS/SASS)
            {
              test: /\.(s[ca]ss)$/,
              use: [...getStyleLoaders(), 'sass-loader'],
            },
            // Loading images
            {
              test: /\.(png|jpg|jpeg|gif|ico)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: 'images',
                    name: '[name]-[sha1:hash:7].[ext]',
                  },
                },
              ],
            },
            // Loading fonts
            {
              test: /\.(ttf|otf|eot|woff|woff2)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    outputPath: 'fonts',
                    name: '[name].[ext]',
                  },
                },
              ],
            },
          ],
        },
        plugins: getPlugins(),
        devServer: {
          open: true,
        },
      };
    };
    ```

---

## ESLint

1. Let's install eslint to our project. We use it to be sure that our code is formatted according the rules we agreed in our team. Docs can be found [here](https://eslint.org/docs/latest/user-guide/getting-started)

   ```
   npm install -D eslint
   ```

2. Now let's init and configure eslint:

   ```
   npm init @eslint/config
   ```

   You will be promted with several questions.

   - How would you like to use ESLint? - To check syntax, find problems, and enforce code style
   - What type of modules does your project use? - JavaScript modules (import/export)
   - Which framework does your project use? - none (if we do not use it, of course)
   - Does your project use TypeScript? - No
   - Where does your code run? - Browser
   - How would you like to define a style for your project? - Use a popular style guide
   - Which style guide do you want to follow? - Airbnb: https://github.com/airbnb/javascript
   - What format do you want your config file to be in? - JSON
   - Would you like to install them now with npm? - Yes

   </br>

   That's all. You'll get all packages installed and config file is ready.

   </br>

3. Next step is to install ESLint extension to your IDE (for VSCode it's [this one](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)). Don't forget to enable it and restart IDE.

</br>

4. Now let's configure ESLint to fix our errors on save:

   Open <code>settings.json</code> under your Workspace and put there (.vscode -> settings.json if you do not have it):

   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "eslint.validate": ["javascript"]
   }
   ```

5. If you have Prettier as a default formatter - disable it for current project (or you can configure them to work together)
