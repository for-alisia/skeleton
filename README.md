# BABEL, WEBPACK, ESLINT - how to configure

## Babel

Let's add Babel to the project

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

8. To optimize our output file we should specify browsers we want to support (to support all browsers is not nice as our files will be too big)

   We can do it in .babelrc this way:

   ```json
   {
     "presets": [
       [
         "@babel/env",

         "targets": {
           "edge": "18",
           "chrome": "74"
         }
       ]
     ],
     "plugins": ["@babel/plugin-proposal-partial-application"]
   }
   ```

   Or we can add it in package.json (more preferable)

   ```json
   {}
   ```
