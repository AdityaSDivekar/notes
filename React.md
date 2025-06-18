What is react?
=>React is an frontend library which is used to create single page applications and design webpages.

history of react ?
=>It was `==created by Jordan Walke, a software engineer at Facebook, and released as an open-source project in May 2013==`

JSX
javascript and XML which allows us to write javascript with XML 

Entry Point
bable is javascript transcompiler that converts the jsx into javascript 

---
Package.json  
---

^(carot)=>Allows update for minor and patch versions but prevents major updates 

example :- "Express" 4.22.1 will accept updates upto <5.0.0  

- **Tilde (`~`)**: When you use the tilde before a version number, it means that you are willing to accept any patch-level changes (bug fixes) but not minor or major changes.
    
For example:
- `~1.2.3` means any version from `1.2.3` up to, but not including, `1.3.0`.
- `~1.2` means any version from `1.2.0` up to, but not including, `1.3.0`.
- `~1` means any version from `1.0.0` up to, but not including, `2.0.0`

---

# Webpack
webpack in module bundler which is used to bundle modules and dependencies in your project into one or more optimised files.
Entry point: webpack starts from the entry point. it is root of all dependency graph 

#### **Dependency Resolution** 

- Webpack analyzes the entry file and recursively resolves all its dependencies (e.g., `import`, `require`, `@import` in CSS).
    
- It builds a **dependency graph** that maps all the modules and their relationships.

#### **Loaders**
- Webpack uses **loaders** to process non-JavaScript files (e.g., CSS, images, TypeScript).
- Loaders transform these files into valid modules that can be included in the dependency graph.
    
- Example: `babel-loader` transpiles ES6+ code to ES5, and `css-loader` processes CSS files.

### Webpack Dependency Graph

Webpack builds a dependency graph by:

1. Starting from the entry point.
    
2. Parsing the file to find dependencies (e.g., `import`, `require`).
    
3. Recursively resolving and processing each dependency.
    
4. Creating a graph where each node represents a module, and edges represent dependencies.
5. Starting from these [_entry points_](https://webpack.js.org/concepts/entry-points/), webpack recursively builds a _dependency graph_ that includes every module your application needs, then bundles all of those modules into a small number of _bundles_ - often, only one - to be loaded by the browser

# Hot Module Replacement
Hot Module Replacement (HMR) exchanges, adds, or removes [modules](https://webpack.js.org/concepts/modules/) while an application is running, without a full reload. This can significantly speed up development in a few ways:

- Retain application state which is lost during a full reload.
- Save valuable development time by only updating what's changed.
- Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools.

## How It Works[](https://webpack.js.org/concepts/hot-module-replacement/#how-it-works)

Let's go through some different viewpoints to understand exactly how HMR works...

### In the Application[](https://webpack.js.org/concepts/hot-module-replacement/#in-the-application)

The following steps allow modules to be swapped in and out of an application:

1. The application asks the HMR runtime to check for updates.
2. The runtime asynchronously downloads the updates and notifies the application.
3. The application then asks the runtime to apply the updates.
4. The runtime synchronously applies the updates.

### In the Compiler[](https://webpack.js.org/concepts/hot-module-replacement/#in-the-compiler)

In addition to normal assets, the compiler needs to emit an "update" to allow updating from the previous version to the new version. The "update" consists of two parts:

1. The updated [manifest](https://webpack.js.org/concepts/manifest) (JSON)
2. One or more updated chunks (JavaScript)

The manifest contains the new compilation hash and a list of all updated chunks. Each of these chunks contains the new code for all updated modules (or a flag indicating that the module was removed).

The compiler ensures that module IDs and chunk IDs are consistent between these builds. It typically stores these IDs in memory (e.g. with [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)), but it's also possible to store them in a JSON file.

### In a Module[](https://webpack.js.org/concepts/hot-module-replacement/#in-a-module)

HMR is an opt-in feature that only affects modules containing HMR code. One example would be patching styling through the [`style-loader`](https://github.com/webpack-contrib/style-loader). In order for patching to work, the `style-loader` implements the HMR interface; when it receives an update through HMR, it replaces the old styles with the new ones.

Similarly, when implementing the HMR interface in a module, you can describe what should happen when the module is updated. However, in most cases, it's not mandatory to write HMR code in every module. If a module has no HMR handlers, the update bubbles up. This means that a single handler can update a complete module tree. If a single module from the tree is updated, the entire set of dependencies is reloaded.

See the [HMR API page](https://webpack.js.org/api/hot-module-replacement) for details on the `module.hot` interface.
### In the Runtime[](https://webpack.js.org/concepts/hot-module-replacement/#in-the-runtime)
For the module system runtime, additional code is emitted to track module `parents` and `children`. On the management side, the runtime supports two methods: `check` and `apply`.
A `check` makes an HTTP request to the update manifest. If this request fails, there is no update available. If it succeeds, the list of updated chunks is compared to the list of currently loaded chunks. For each loaded chunk, the corresponding update chunk is downloaded. All module updates are stored in the runtime. When all update chunks have been downloaded and are ready to be applied, the runtime switches into the `ready` state.

The `apply` method flags all updated modules as invalid. For each invalid module, there needs to be an update handler in the module or in its parent(s). Otherwise, the invalid flag bubbles up and invalidates parent(s) as well. Each bubble continues until the app's entry point or a module with an update handler is reached (whichever comes first). If it bubbles up from an entry point, the process fails.

Afterwards, all invalid modules are disposed (via the dispose handler) and unloaded. The current hash is then updated and all `accept` handlers are called. The runtime switches back to the `idle` state and everything continues as normal

# webpack under the hood 
 what is bundling?
 =>The bundling is a function that takes some files and emits others.
 But between input and output, it also has [modules](https://webpack.js.org/concepts/modules/), [entry points](https://webpack.js.org/concepts/entry-points/), chunks, chunk groups, and many other intermediate parts.
 Every file used in your project is a [Module](https://webpack.js.org/concepts/modules/)
 Eg:-**./index.js**
 **./app.js**
 
 By using each other, the modules form a graph (`ModuleGraph`).
 
 module graph formation internally
 =>During the bundling process, modules are combined into chunks. Chunks combine into chunk groups and form a graph (`ChunkGraph`) interconnected through modules. When you describe an entry point - under the hood, you create a chunk group with one chunk.
 
 **./webpack.config.js**

```js
module.exports = {
  entry: './index.js',
};
```

One chunk group with the `main` name created (`main` is the default name for an entry point). This chunk group contains `./index.js` module. As the parser handles imports inside `./index.js` new modules are added into this chunk.

## Chunks[](https://webpack.js.org/concepts/under-the-hood/#chunks)

Chunks come in two forms:

- `initial` is the main chunk for the entry point. This chunk contains all the modules and their dependencies that you specify for an entry point.
- `non-initial` is a chunk that may be lazy-loaded. It may appear when [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) or [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) is being used.

Each chunk has a corresponding **asset**. The assets are the output files - the result of bundling.

Turbopack