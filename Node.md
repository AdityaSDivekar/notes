

(athentication/authorization)  

openfga(authentication )

JWT (JOSE) git Link https://github.com/panva/jose

restify(advanced version of restful apis )
 resful API's https://aws.amazon.com/what-is/restful-api/
[^1]
for validation express-validator or joy
## Asynchronous context tracking

These classes are used to associate state and propagate it throughout callbacks and promise chains. They allow storing data throughout the lifetime of a web request or any other asynchronous duration. It is similar to thread-local storage in other languages.

The `AsyncLocalStorage` and `AsyncResource` classes are part of the `node:async_hooks` module:

`const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');`

## Table of Contents

- [1. Features of NodeJS architecture](https://www.turing.com/kb/understanding-the-nodejs-architecture#features-of-nodejs-architecture)
- [1.1. Event-driven architecture](https://www.turing.com/kb/understanding-the-nodejs-architecture#event-driven-architecture)
- [1.2. I/O model](https://www.turing.com/kb/understanding-the-nodejs-architecture#i/o-model)
- [1.3. Asynchronous architecture](https://www.turing.com/kb/understanding-the-nodejs-architecture#asynchronous-architecture)
- [2. Nodejs design patterns](https://www.turing.com/kb/understanding-the-nodejs-architecture#nodejs-design-patterns)
- [2.1. Microservices](https://www.turing.com/kb/understanding-the-nodejs-architecture#microservices)
- [2.2. Singleton](https://www.turing.com/kb/understanding-the-nodejs-architecture#singleton)
- [2.3. Event loop](https://www.turing.com/kb/understanding-the-nodejs-architecture#event-loop)
- [2.4. Concurrency](https://www.turing.com/kb/understanding-the-nodejs-architecture#concurrency)
- [2.5. Modules](https://www.turing.com/kb/understanding-the-nodejs-architecture#modules)
- [3. Libraries](https://www.turing.com/kb/understanding-the-nodejs-architecture#libraries)
- [4. NPM](https://www.turing.com/kb/understanding-the-nodejs-architecture#npm)
- [5. NodeJS application architecture](https://www.turing.com/kb/understanding-the-nodejs-architecture#nodejs-application-architecture)
- [6. Conclusion](https://www.turing.com/kb/understanding-the-nodejs-architecture#conclusion)

## Features of NodeJS architecture

The Node.JS architecture comprises different features like

1. Event-driven architecture
2. I/O model
3. Asynchronous architecture 

# hw
# How NodeJS internally works?
 NodeJS runtime environment is asynchronous non-blocking system, it internally uses even-looping system to implement asynchronicity.

- NodeJS is written in C++ and JavaScript with Google V8 JavaScript Engine embedded in it
- V8 will convert from JavaScript code to low/machine level code
- V8 is written in C++ and its open source.

Node has two parts.  
**1. JavaScript Part  
-** JavaScript is synchronous  
- It has JS native library code like **_util_**, **_crypto_** etc .
- This will interact with NodeJS application and pass the data to **V8** JS engine and other dependency modules if required

**2. Dependencies Part**  
- It has many low level modules like **_V8_**, **_libuv_**, **_openssl_**  
- V8 is one of the main dependency module  
- Most of these dependency modules are written in C/C++  
- V8 is synchronous

**NodeJS is asynchronous:  
-** NodeJS is implemented to work in asynchronous way with the help of **_libuv_** dependency library which is written in C.  
- Check **_libuv_** design overview [here](http://docs.libuv.org/en/v1.x/design.html)  
- You can refer its git repository [here](https://github.com/libuv/libuv).  
- [**_libuv_**](https://libuv.org/) is a multi-platform support library with a focus on asynchronous I/O.  
- **_libuv_** is primarily developed for NodeJS, but will support other platforms as well.



![NodeJS event loop using libuv](https://miro.medium.com/v2/resize:fit:875/1*ZtWfPUvy0s6GC38rdGlHUw.png)

NodeJS event loop using libuv

flow of node js working is 
4. Request comes from the application
5. Node JavaScript part passes it to V8 module
6. V8 module passes it to libuv module
7. Until step3, everything is synchronous, but libuv will make this asynchronous
8. Meanwhile V8 will continue to process other tasks
9. When V8 receives callback from libuv, V8 will continue to complete its current execution task and takes callback after completing current task

This is how internal event loop works for NodeJS.

## ****Libuv****
libuv is a C library originally written for Node.js to abstract ****non-blocking I/O operations****.

If a program is querying the database, the CPU sits idle until the query is processed and the program stays at a halt, thereby causing wastage of system resources. To prevent this, ****libuv**** is used in Node.js which facilitates a non-blocking I/O.

It also has mechanisms to handle services like [****File System****](https://www.geeksforgeeks.org/node-js-file-system)****,**** [****DNS****](https://www.geeksforgeeks.org/nodejs-dns)****, network,**** [****child processes****](https://www.geeksforgeeks.org/node-js-child-process)****, pipes, signal handling, polling****, ****and**** [****streaming****](https://www.geeksforgeeks.org/node-js-streams)****.****  
To perform blocking operations that can’t be done asynchronously at OS level, libuv also includes a ****thread pool**** to distribute CPU loads.

---

## How tasks are executed in javascript

Call Stack

The call stack is where synchronous function executions are managed. When a function is called, it's added to the top of the stack, and when it completes, it's removed. However, asynchronous operations, like those using `setTimeout` or fetching data from an API, don't block the call stack.

Callback Queue (or Task Queue)
When an asynchronous operation completes (e.g., the timer in `setTimeout` finishes or data is received from an API), its associated callback function is placed in the callback queue. This queue holds callbacks waiting to be executed.

Event Loop

The event loop continuously monitors both the call stack and the callback queue. If the call stack is empty, the event loop takes the first callback from the callback queue and moves it to the call stack for execution. This mechanism allows JavaScript to handle asynchronous operations without blocking the main thread.

### Storage Details

- **Callbacks:**
    Callback functions themselves are stored in memory like any other JavaScript object. When they are passed as arguments to asynchronous functions, a reference to them is maintained.
    
- **Async Tasks:**
    The actual execution of asynchronous tasks (e.g., network requests, timers) is often handled by external APIs provided by the browser or Node.js environment. These APIs operate outside the JavaScript engine.
    
- **Promises and Async/Await:**
    While Promises introduce a more structured way to handle asynchronous operations, they still rely on the callback queue and event loop for execution. `async/await` is syntactic sugar built on top of Promises, making asynchronous code look more like synchronous code but still operating asynchronously.
    
    --- 
    # Node js folder structure
    
    ```
/app
├── config/
│   ├── db.conf.js
│   ├── app.conf.js
│   ├── app.keys.js
│   ├── db.keys.js
│   ├── init.js
├── database/
│   ├── Redis.database.js
│   ├── Mongo.database.js
│   ├── init.js
├── routes/
│   ├── App.routes.js
│   ├── Auth.routes.js
│   ├── Dashboard.routes.js
├── utils/
│   ├── Logger.util.js
├── middleware/
│   ├── App.middleware.js
│   ├── ErrorHandler.middleware.js
│   ├── init.js
├── models/
│   ├── User.model.js
├── controllers/
│   ├── App.controller.js
│   ├── User.controller.js
├── helpers/
│   ├── App.helper.js
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── support/
│   │   ├── index.ejs
│   ├── documentation/
│   │   ├── index.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
/public
├── dist/
├── images/
│   ├── dashboard/
│   ├── auth/
│   ├── documentation/      
├── sitemap.xml
/samples
├── .env.sample
├── db.conf.sample
├── app.conf.sample
├── app.keys.sample
/src
├── javascript/
├── css/
/node_modules
/server.js
/package.json
/.env


![[roles-concerns-node-js-project-folder-structure.avif]]

Restful Apis
are set of instructions which are follwed for best practices



**Methods for the** `**req**` **(Request) Object:**

1. `req.url`: Returns the URL of the incoming request.
2. `req.method`: Returns the HTTP method used by the client (e.g., GET, POST, etc.).
3. `req.headers`: Returns an object containing the headers of the request.
4. `req.params`: Returns an object containing route parameters from the URL.
5. `req.query`: Returns an object containing the query parameters from the URL (for GET requests).
6. `req.body`: Returns the data sent by the client (for POST, PUT, and PATCH requests).
7. `req.cookies`: Returns an object containing the cookies sent by the client.
8. `req.get(headerName)`: Returns the value of a specific header in the request.
9. `req.is(type)`: Checks if the request's content type matches the specified MIME type.

**Methods for the** `**res**` **(Response) Object:**

1. `res.setHeader(headerName, headerValue)`: Sets a single response header.
2. `res.writeHead(statusCode, [headers])`: Sets the response status code and headers together.
3. `res.status(statusCode)`: Sets the HTTP status code of the response.
4. `res.send(data)`: Sends the response data to the client. It automatically sets the appropriate Content-Type header based on the data type.
5. `res.json(data)`: Sends a JSON response to the client.
6. `res.redirect(statusCode, path)`: Redirects the client to the specified path.
7. `res.sendFile(path, [options], [callback])`: Sends a file as the response.
8. `res.render(view, [locals], callback)`: Renders a view template and sends it as the response.
9. `res.cookie(name, value, [options])`: Sets a cookie in the response.
10. `res.clearCookie(name, [options])`: Clears a previously set cookie.
11. `res.end([data])`: Ends the response process. Optionally, data can be sent as the last chunk.

### difference in static methods and instance methods
### **Instance Methods**

- **Definition**: Instance methods are defined on the schema's [methods](vscode-file://vscode-app/c:/Users/ADI/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) object. They operate on a specific document (an instance of the model).
- **Use Case**: Use instance methods when you need to perform operations on a single document, such as hashing a password for a specific admin or generating a token for a specific user.
- **Access**: Instance methods are called on individual documents.

### **Static Methods**

- **Definition**: Static methods are defined on the schema's `statics` object. They operate on the model itself, not on individual documents.
- **Use Case**: Use static methods when you need to perform operations that involve the entire collection, such as finding a user by email or generating a unique admin ID.
- **Access**: Static methods are called directly on the model.

**Example: Static Method**

`adminSchema.statics.findByEmail = async function (email) {`
  `return await this.findOne({ email });`
`};`
`// Usage`
`const admin = await adminModel.findByEmail('admin@example.com');`

---
# Stream in Node

### Types of streams[#](https://nodejs.org/api/stream.html#types-of-streams)

There are four fundamental stream types within Node.js:

- [`Writable`](https://nodejs.org/api/stream.html#class-streamwritable): streams to which data can be written (for example, [`fs.createWriteStream()`](https://nodejs.org/api/fs.html#fscreatewritestreampath-options)).
- [`Readable`](https://nodejs.org/api/stream.html#class-streamreadable): streams from which data can be read (for example, [`fs.createReadStream()`](https://nodejs.org/api/fs.html#fscreatereadstreampath-options)).
- [`Duplex`](https://nodejs.org/api/stream.html#class-streamduplex): streams that are both `Readable` and `Writable` (for example, [`net.Socket`](https://nodejs.org/api/net.html#class-netsocket)).
- [`Transform`](https://nodejs.org/api/stream.html#class-streamtransform): `Duplex` streams that can modify or transform the data as it is written and read (for example, [`zlib.createDeflate()`](https://nodejs.org/api/zlib.html#zlibcreatedeflateoptions)).

Additionally, this module includes the utility functions [`stream.duplexPair()`](https://nodejs.org/api/stream.html#streamduplexpairoptions), [`stream.pipeline()`](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-callback), [`stream.finished()`](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback) [`stream.Readable.from()`](https://nodejs.org/api/stream.html#streamreadablefromiterable-options), and [`stream.addAbortSignal()`](https://nodejs.org/api/stream.html#streamaddabortsignalsignal-stream).


The `stream/promises` API provides an alternative set of asynchronous utility functions for streams that return `Promise` objects rather than using callbacks. The API is accessible via `require('node:stream/promises')` or `require('node:stream').promises`.

#### `stream.pipeline(source[, ...transforms], destination[, options])`[#](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)

#### `stream.pipeline(streams[, options])`

- `streams` [<Stream[]>](https://nodejs.org/api/stream.html#stream) | [<Iterable[]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) | [<AsyncIterable[]>](https://tc39.github.io/ecma262/#sec-asynciterable-interface) | [<Function[]>
- `options <Object> Pipeline options`
    `- `signal` <AbortSignal>`
    `- `end` <boolean> End the destination stream when the source stream ends. Transform streams are always ended, even if this value is `false`. **Default:** `true`.`
      
      `- Returns: <Promise> Fulfills when the pipeline is complete`.
```js
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

To use an `AbortSignal`, pass it inside an options object, as the last argument. When the signal is aborted, `destroy` will be called on the underlying pipeline, with an `AbortError`.


```js
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  const ac = new AbortController();
  const signal = ac.signal;

  setImmediate(() => ac.abort());
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
    { signal },
  );
}

run().catch(console.error); // AbortError
```

The `pipeline` API also supports async generators:

```js
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    fs.createReadStream('lowercase.txt'),
    async function* (source, { signal }) {
      source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
      for await (const chunk of source) {
        yield await processChunk(chunk, { signal });
      }
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

Remember to handle the `signal` argument passed into the async generator. Especially in the case where the async generator is the source for the pipeline (i.e. first argument) or the pipeline will never complete.

```js
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    async function* ({ signal }) {
      await someLongRunningfn({ signal });
      yield 'asd';
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

#### `stream.finished(stream[, options])`

- `stream[<Stream> | <ReadableStream> | [<WritableStream>] A readable and/or writable stream/webstream.`
- `- options [<Object>]
    `- `error` [<boolean>] | [<undefined>]
    `- `readable` [<boolean>] | [<undefined>]
    `- `writable` [<boolean>] | [<undefined>]
    `- `signal` [<AbortSignal>] | [<undefined>]
    `- `cleanup` [<boolean>]| [<undefined>]
    If `true`, removes the listeners registered by this function before the promise is fulfilled. **Default:** `false`.`
`- Returns: [<Promise>] Fulfills when the stream is no longer readable or writable.`

```js
const { finished } = require('node:stream/promises');
const fs = require('node:fs');

const rs = fs.createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('Stream is done reading.');
}

run().catch(console.error);
rs.resume(); // Drain the stream.
```

The `finished` API also provides a [callback version](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback).


- [Types of streams](https://nodejs.org/api/stream.html#types-of-streams)
    - [Streams Promises API](https://nodejs.org/api/stream.html#streams-promises-api)
    - [`stream.pipeline(source[, ...transforms], destination[, options])`](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)
    - [`stream.pipeline(streams[, options])`](https://nodejs.org/api/stream.html#streampipelinestreams-options)
    - [`stream.finished(stream[, options])`](https://nodejs.org/api/stream.html#streamfinishedstream-options)
    - [Object mode](https://nodejs.org/api/stream.html#object-mode)
    - [Buffering](https://nodejs.org/api/stream.html#buffering)
- [API for stream consumers](https://nodejs.org/api/stream.html#api-for-stream-consumers)
    - [Writable streams](https://nodejs.org/api/stream.html#writable-streams)
        - [Class: `stream.Writable`](https://nodejs.org/api/stream.html#class-streamwritable)
            - [Event: `'close'`](https://nodejs.org/api/stream.html#event-close)
            - [Event: `'drain'`](https://nodejs.org/api/stream.html#event-drain)
            - [Event: `'error'`](https://nodejs.org/api/stream.html#event-error)
            - [Event: `'finish'`](https://nodejs.org/api/stream.html#event-finish)
            - [Event: `'pipe'`](https://nodejs.org/api/stream.html#event-pipe)
            - [Event: `'unpipe'`](https://nodejs.org/api/stream.html#event-unpipe)
            - [`writable.cork()`](https://nodejs.org/api/stream.html#writablecork)
            - [`writable.destroy([error])`](https://nodejs.org/api/stream.html#writabledestroyerror)
            - [`writable.closed`](https://nodejs.org/api/stream.html#writableclosed)
            - [`writable.destroyed`](https://nodejs.org/api/stream.html#writabledestroyed)
            - [`writable.end([chunk[, encoding]][, callback])`](https://nodejs.org/api/stream.html#writableendchunk-encoding-callback)
            - [`writable.setDefaultEncoding(encoding)`](https://nodejs.org/api/stream.html#writablesetdefaultencodingencoding)
            - [`writable.uncork()`](https://nodejs.org/api/stream.html#writableuncork)
            - [`writable.writable`](https://nodejs.org/api/stream.html#writablewritable)
            - [`writable.writableAborted`](https://nodejs.org/api/stream.html#writablewritableaborted)
            - [`writable.writableEnded`](https://nodejs.org/api/stream.html#writablewritableended)
            - [`writable.writableCorked`](https://nodejs.org/api/stream.html#writablewritablecorked)
            - [`writable.errored`](https://nodejs.org/api/stream.html#writableerrored)
            - [`writable.writableFinished`](https://nodejs.org/api/stream.html#writablewritablefinished)
            - [`writable.writableHighWaterMark`](https://nodejs.org/api/stream.html#writablewritablehighwatermark)
            - [`writable.writableLength`](https://nodejs.org/api/stream.html#writablewritablelength)
            - [`writable.writableNeedDrain`](https://nodejs.org/api/stream.html#writablewritableneeddrain)
            - [`writable.writableObjectMode`](https://nodejs.org/api/stream.html#writablewritableobjectmode)
            - [`writable[Symbol.asyncDispose]()`](https://nodejs.org/api/stream.html#writablesymbolasyncdispose)
            - [`writable.write(chunk[, encoding][, callback])`](https://nodejs.org/api/stream.html#writablewritechunk-encoding-callback)
    - [Readable streams](https://nodejs.org/api/stream.html#readable-streams)
        - [Two reading modes](https://nodejs.org/api/stream.html#two-reading-modes)
        - [Three states](https://nodejs.org/api/stream.html#three-states)
        - [Choose one API style](https://nodejs.org/api/stream.html#choose-one-api-style)
        - [Class: `stream.Readable`](https://nodejs.org/api/stream.html#class-streamreadable)
            - [Event: `'close'`](https://nodejs.org/api/stream.html#event-close_1)
            - [Event: `'data'`](https://nodejs.org/api/stream.html#event-data)
            - [Event: `'end'`](https://nodejs.org/api/stream.html#event-end)
            - [Event: `'error'`](https://nodejs.org/api/stream.html#event-error_1)
            - [Event: `'pause'`](https://nodejs.org/api/stream.html#event-pause)
            - [Event: `'readable'`](https://nodejs.org/api/stream.html#event-readable)
            - [Event: `'resume'`](https://nodejs.org/api/stream.html#event-resume)
            - [`readable.destroy([error])`](https://nodejs.org/api/stream.html#readabledestroyerror)
            - [`readable.closed`](https://nodejs.org/api/stream.html#readableclosed)
            - [`readable.destroyed`](https://nodejs.org/api/stream.html#readabledestroyed)
            - [`readable.isPaused()`](https://nodejs.org/api/stream.html#readableispaused)
            - [`readable.pause()`](https://nodejs.org/api/stream.html#readablepause)
            - [`readable.pipe(destination[, options])`](https://nodejs.org/api/stream.html#readablepipedestination-options)
            - [`readable.read([size])`](https://nodejs.org/api/stream.html#readablereadsize)
            - [`readable.readable`](https://nodejs.org/api/stream.html#readablereadable)
            - [`readable.readableAborted`](https://nodejs.org/api/stream.html#readablereadableaborted)
            - [`readable.readableDidRead`](https://nodejs.org/api/stream.html#readablereadabledidread)
            - [`readable.readableEncoding`](https://nodejs.org/api/stream.html#readablereadableencoding)
            - [`readable.readableEnded`](https://nodejs.org/api/stream.html#readablereadableended)
            - [`readable.errored`](https://nodejs.org/api/stream.html#readableerrored)
            - [`readable.readableFlowing`](https://nodejs.org/api/stream.html#readablereadableflowing)
            - [`readable.readableHighWaterMark`](https://nodejs.org/api/stream.html#readablereadablehighwatermark)
            - [`readable.readableLength`](https://nodejs.org/api/stream.html#readablereadablelength)
            - [`readable.readableObjectMode`](https://nodejs.org/api/stream.html#readablereadableobjectmode)
            - [`readable.resume()`](https://nodejs.org/api/stream.html#readableresume)
            - [`readable.setEncoding(encoding)`](https://nodejs.org/api/stream.html#readablesetencodingencoding)
            - [`readable.unpipe([destination])`](https://nodejs.org/api/stream.html#readableunpipedestination)
            - [`readable.unshift(chunk[, encoding])`](https://nodejs.org/api/stream.html#readableunshiftchunk-encoding)
            - [`readable.wrap(stream)`](https://nodejs.org/api/stream.html#readablewrapstream)
            - [`readable[Symbol.asyncIterator]()`](https://nodejs.org/api/stream.html#readablesymbolasynciterator)
            - [`readable[Symbol.asyncDispose]()`](https://nodejs.org/api/stream.html#readablesymbolasyncdispose)
            - [`readable.compose(stream[, options])`](https://nodejs.org/api/stream.html#readablecomposestream-options)
            - [`readable.iterator([options])`](https://nodejs.org/api/stream.html#readableiteratoroptions)
            - [`readable.map(fn[, options])`](https://nodejs.org/api/stream.html#readablemapfn-options)
            - [`readable.filter(fn[, options])`](https://nodejs.org/api/stream.html#readablefilterfn-options)
            - [`readable.forEach(fn[, options])`](https://nodejs.org/api/stream.html#readableforeachfn-options)
            - [`readable.toArray([options])`](https://nodejs.org/api/stream.html#readabletoarrayoptions)
            - [`readable.some(fn[, options])`](https://nodejs.org/api/stream.html#readablesomefn-options)
            - [`readable.find(fn[, options])`](https://nodejs.org/api/stream.html#readablefindfn-options)
            - [`readable.every(fn[, options])`](https://nodejs.org/api/stream.html#readableeveryfn-options)
            - [`readable.flatMap(fn[, options])`](https://nodejs.org/api/stream.html#readableflatmapfn-options)
            - [`readable.drop(limit[, options])`](https://nodejs.org/api/stream.html#readabledroplimit-options)
            - [`readable.take(limit[, options])`](https://nodejs.org/api/stream.html#readabletakelimit-options)
            - [`readable.reduce(fn[, initial[, options]])`](https://nodejs.org/api/stream.html#readablereducefn-initial-options)
    - [Duplex and transform streams](https://nodejs.org/api/stream.html#duplex-and-transform-streams)
        - [Class: `stream.Duplex`](https://nodejs.org/api/stream.html#class-streamduplex)
            - [`duplex.allowHalfOpen`](https://nodejs.org/api/stream.html#duplexallowhalfopen)
        - [Class: `stream.Transform`](https://nodejs.org/api/stream.html#class-streamtransform)
            - [`transform.destroy([error])`](https://nodejs.org/api/stream.html#transformdestroyerror)
        - [`stream.duplexPair([options])`](https://nodejs.org/api/stream.html#streamduplexpairoptions)
    - [`stream.finished(stream[, options], callback)`](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback)
    - [`stream.pipeline(source[, ...transforms], destination, callback)`](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-callback)
    - [`stream.pipeline(streams, callback)`](https://nodejs.org/api/stream.html#streampipelinestreams-callback)
    - [`stream.compose(...streams)`](https://nodejs.org/api/stream.html#streamcomposestreams)
    - [`stream.Readable.from(iterable[, options])`](https://nodejs.org/api/stream.html#streamreadablefromiterable-options)
    - [`stream.Readable.fromWeb(readableStream[, options])`](https://nodejs.org/api/stream.html#streamreadablefromwebreadablestream-options)
    - [`stream.Readable.isDisturbed(stream)`](https://nodejs.org/api/stream.html#streamreadableisdisturbedstream)
    - [`stream.isErrored(stream)`](https://nodejs.org/api/stream.html#streamiserroredstream)
    - [`stream.isReadable(stream)`](https://nodejs.org/api/stream.html#streamisreadablestream)
    - [`stream.Readable.toWeb(streamReadable[, options])`](https://nodejs.org/api/stream.html#streamreadabletowebstreamreadable-options)
    - [`stream.Writable.fromWeb(writableStream[, options])`](https://nodejs.org/api/stream.html#streamwritablefromwebwritablestream-options)
    - [`stream.Writable.toWeb(streamWritable)`](https://nodejs.org/api/stream.html#streamwritabletowebstreamwritable)
    - [`stream.Duplex.from(src)`](https://nodejs.org/api/stream.html#streamduplexfromsrc)
    - [`stream.Duplex.fromWeb(pair[, options])`](https://nodejs.org/api/stream.html#streamduplexfromwebpair-options)
    - [`stream.Duplex.toWeb(streamDuplex)`](https://nodejs.org/api/stream.html#streamduplextowebstreamduplex)
    - [`stream.addAbortSignal(signal, stream)`](https://nodejs.org/api/stream.html#streamaddabortsignalsignal-stream)
    - [`stream.getDefaultHighWaterMark(objectMode)`](https://nodejs.org/api/stream.html#streamgetdefaulthighwatermarkobjectmode)
    - [`stream.setDefaultHighWaterMark(objectMode, value)`](https://nodejs.org/api/stream.html#streamsetdefaulthighwatermarkobjectmode-value)
- [API for stream implementers](https://nodejs.org/api/stream.html#api-for-stream-implementers)
    - [Simplified construction](https://nodejs.org/api/stream.html#simplified-construction)
    - [Implementing a writable stream](https://nodejs.org/api/stream.html#implementing-a-writable-stream)
        - [`new stream.Writable([options])`](https://nodejs.org/api/stream.html#new-streamwritableoptions)
        - [`writable._construct(callback)`](https://nodejs.org/api/stream.html#writable_constructcallback)
        - [`writable._write(chunk, encoding, callback)`](https://nodejs.org/api/stream.html#writable_writechunk-encoding-callback)
        - [`writable._writev(chunks, callback)`](https://nodejs.org/api/stream.html#writable_writevchunks-callback)
        - [`writable._destroy(err, callback)`](https://nodejs.org/api/stream.html#writable_destroyerr-callback)
        - [`writable._final(callback)`](https://nodejs.org/api/stream.html#writable_finalcallback)
        - [Errors while writing](https://nodejs.org/api/stream.html#errors-while-writing)
        - [An example writable stream](https://nodejs.org/api/stream.html#an-example-writable-stream)
        - [Decoding buffers in a writable stream](https://nodejs.org/api/stream.html#decoding-buffers-in-a-writable-stream)
    - [Implementing a readable stream](https://nodejs.org/api/stream.html#implementing-a-readable-stream)
        - [`new stream.Readable([options])`](https://nodejs.org/api/stream.html#new-streamreadableoptions)
        - [`readable._construct(callback)`](https://nodejs.org/api/stream.html#readable_constructcallback)
        - [`readable._read(size)`](https://nodejs.org/api/stream.html#readable_readsize)
        - [`readable._destroy(err, callback)`](https://nodejs.org/api/stream.html#readable_destroyerr-callback)
        - [`readable.push(chunk[, encoding])`](https://nodejs.org/api/stream.html#readablepushchunk-encoding)
        - [Errors while reading](https://nodejs.org/api/stream.html#errors-while-reading)
        - [An example counting stream](https://nodejs.org/api/stream.html#an-example-counting-stream)
    - [Implementing a duplex stream](https://nodejs.org/api/stream.html#implementing-a-duplex-stream)
        - [`new stream.Duplex(options)`](https://nodejs.org/api/stream.html#new-streamduplexoptions)
        - [An example duplex stream](https://nodejs.org/api/stream.html#an-example-duplex-stream)
        - [Object mode duplex streams](https://nodejs.org/api/stream.html#object-mode-duplex-streams)
    - [Implementing a transform stream](https://nodejs.org/api/stream.html#implementing-a-transform-stream)
        - [`new stream.Transform([options])`](https://nodejs.org/api/stream.html#new-streamtransformoptions)
        - [Event: `'end'`](https://nodejs.org/api/stream.html#event-end_1)
        - [Event: `'finish'`](https://nodejs.org/api/stream.html#event-finish_1)
        - [`transform._flush(callback)`](https://nodejs.org/api/stream.html#transform_flushcallback)
        - [`transform._transform(chunk, encoding, callback)`](https://nodejs.org/api/stream.html#transform_transformchunk-encoding-callback)
        - [Class: `stream.PassThrough`](https://nodejs.org/api/stream.html#class-streampassthrough)
- [Additional notes](https://nodejs.org/api/stream.html#additional-notes)
    - [Streams compatibility with async generators and async iterators](https://nodejs.org/api/stream.html#streams-compatibility-with-async-generators-and-async-iterators)
        - [Consuming readable streams with async iterators](https://nodejs.org/api/stream.html#consuming-readable-streams-with-async-iterators)
        - [Creating readable streams with async generators](https://nodejs.org/api/stream.html#creating-readable-streams-with-async-generators)
        - [Piping to writable streams from async iterators](https://nodejs.org/api/stream.html#piping-to-writable-streams-from-async-iterators)

# What is Stream?

In Node.js, a stream is a way to handle data as it is being consumed or produced, rather than loading all the data into memory at once. This is particularly useful for handling large files or real-time data efficiently. Streams are categorized into different types, including Readable, Writable, Duplex, and Transform streams.

Readable streams are used to read data in chunks, allowing you to process large files or data streams without loading everything into memory. For example, you can create a Readable stream from an iterable object or an async iterable object using the `stream.Readable.from()` method. This method converts an array or iterable data source into a stream that emits each element as a chunk of data.

Writable streams, on the other hand, are used to write data in chunks. Instead of writing all data at once, you can stream it into a file or another writable destination. For instance, you can use `fs.createWriteStream()` to create a writable stream that writes data to a file.

Duplex streams can both read and write data simultaneously, and Transform streams are a type of Duplex stream where the output is a modified version of the input, such as data compression or encryption.

Streams in Node.js are built on top of the EventEmitter class, making them event-driven and allowing for efficient handling of data flow and I/O operations. They provide a powerful and efficient way to manage data flow, ensuring optimal performance and memory usage in applications.

Streams can be piped together, passing the output of one stream as the input to another, which is useful for chaining operations like reading from a file, processing the data, and then writing it to another file. This approach is memory-efficient and allows for non-blocking I/O operations, making the program more responsive.

Streams are essential for handling large amounts of data efficiently and are widely used in Node.js for tasks such as file I/O, HTTP requests, and real-time data processing. They are a key part of the Node.js ecosystem, providing a versatile and powerful toolset for managing data flow and I/O operations efficiently.

---

### Types of Streams

- **Stream Types**: Node.js streams are Readable, Writable, Duplex, or Transform. They handle data flow, either as chunks of buffers/strings or objects in object mode.
- **Streams Promises API**: Provides promise-based versions of stream methods (e.g., stream.pipeline, stream.finished) for async/await usage.
- **stream.pipeline(source[, ...transforms], destination[, options])**: Chains a source stream through transforms to a destination, handling errors and cleanup. Returns a promise if no callback is provided.
- **stream.pipeline(streams[, options])**: Alternative syntax for pipeline, accepting an array of streams to chain.
- **stream.finished(stream[, options])**: Tracks when a stream ends or errors, resolving a promise or calling a callback when complete.
- **Object Mode**: Streams can process JavaScript objects instead of buffers/strings, enabled via objectMode: true.
- **Buffering**: Streams buffer data internally when the consumer/producer is slower, controlled by highWaterMark.

---

### API for Stream Consumers

#### Writable Streams

- **Class: stream.Writable**: Represents streams data can be written to (e.g., file write stream).
- **Event: 'close'**: Emitted when the stream and its resources are closed.
- **Event: 'drain'**: Emitted when the internal buffer is emptied after being full, signaling it’s safe to write more.
- **Event: 'error'**: Emitted when an error occurs (e.g., write failure).
- **Event: 'finish'**: Emitted when end() is called and all data is flushed.
- **Event: 'pipe'**: Emitted when a readable stream pipes into the writable stream.
- **Event: 'unpipe'**: Emitted when a readable stream stops piping to the writable stream.
- **writable.cork()**: Buffers all writes until uncork() is called, improving performance for burst writes.
- **writable.destroy([error])**: Closes the stream, optionally emitting an error. Prevents further writes.
- **writable.closed**: Boolean indicating if the stream is closed.
- **writable.destroyed**: Boolean indicating if the stream is destroyed.
- **writable.end([chunk[, encoding]][, callback])**: Signals no more data will be written, optionally writing a final chunk.
- **writable.setDefaultEncoding(encoding)**: Sets the default encoding for string writes (e.g., 'utf8').
- **writable.uncork()**: Flushes all buffered data from cork().
- **writable.writable**: Boolean indicating if the stream is writable.
- **writable.writableAborted**: Boolean indicating if the stream was aborted.
- **writable.writableEnded**: Boolean indicating if end() was called.
- **writable.writableCorked**: Number indicating how many times cork() was called without uncork().
- **writable.errored**: Returns the error if the stream errored, or null.
- **writable.writableFinished**: Boolean indicating if the stream has finished writing.
- **writable.writableHighWaterMark**: Number representing the buffer size threshold before pausing writes.
- **writable.writableLength**: Number of bytes/objects in the write buffer.
- **writable.writableNeedDrain**: Boolean indicating if the buffer is full and needs draining.
- **writable.writableObjectMode**: Boolean indicating if the stream operates in object mode.
- **writable**: Asynchronously closes the stream, releasing resources.
- **writable.write(chunk[, encoding][, callback])**: Writes a chunk to the stream, calling the callback when processed.

#### Readable Streams

- **Two Reading Modes**: Flowing (data events emitted automatically) and paused (manual read() calls).
- **Three States**: Flowing, paused, or ended (no more data).
- **Choose One API Style**: Use either event-driven, read(), or async iterator style for consistency.
- **Class: stream.Readable**: Represents streams data can be read from (e.g., file read stream).
- **Event: 'close'**: Emitted when the stream and its resources are closed.
- **Event: 'data'**: Emitted in flowing mode when data is available.
- **Event: 'end'**: Emitted when no more data is available.
- **Event: 'error'**: Emitted when an error occurs (e.g., read failure).
- **Event: 'pause'**: Emitted when the stream switches to paused mode.
- **Event: 'readable'**: Emitted when data is available to read in paused mode.
- **Event: 'resume'**: Emitted when the stream switches to flowing mode.
- **readable.destroy([error])**: Closes the stream, optionally emitting an error. Prevents further reads.
- **readable.closed**: Boolean indicating if the stream is closed.
- **readable.destroyed**: Boolean indicating if the stream is destroyed.
- **readable.isPaused()**: Returns true if the stream is in paused mode.
- **readable.pause()**: Switches the stream to paused mode, stopping 'data' events.
- **readable.pipe(destination[, options])**: Pipes the readable stream to a writable stream.
- **readable.read([size])**: Reads size bytes/objects from the stream in paused mode.
- **readable.readable**: Boolean indicating if the stream is readable.
- **readable.readableAborted**: Boolean indicating if the stream was aborted.
- **readable.readableDidRead**: Boolean indicating if any data was read.
- **readable.readableEncoding**: The encoding set by setEncoding(), or null.
- **readable.readableEnded**: Boolean indicating if the stream has ended.
- **readable.errored**: Returns the error if the stream errored, or null.
- **readable.readableFlowing**: Boolean indicating if the stream is in flowing mode.
- **readable.readableHighWaterMark**: Number representing the buffer size threshold for reads.
- **readable.readableLength**: Number of bytes/objects in the read buffer.
- **readable.readableObjectMode**: Boolean indicating if the stream operates in object mode.
- **readable.resume()**: Switches the stream to flowing mode, emitting 'data' events.
- **readable.setEncoding(encoding)**: Sets the encoding for string reads (e.g., 'utf8').
- **readable.unpipe([destination])**: Stops piping to a specific or all destinations.
- **readable.unshift(chunk[, encoding])**: Pushes a chunk back to the read buffer.
- **readable.wrap(stream)**: Wraps an older stream interface for compatibility.
- **readable**: Enables async iteration over the stream’s data.
- **readable**: Asynchronously closes the stream, releasing resources.
- **readable.compose(stream[, options])**: Chains the readable stream with another stream or function.
- **readable.iterator([options])**: Returns an async iterator for the stream.
- **readable.map(fn[, options])**: Applies a function to each chunk, returning a new readable stream.
- **readable.filter(fn[, options])**: Filters chunks based on a predicate, returning a new readable stream.
- **readable.forEach(fn[, options])**: Calls a function for each chunk, returning a promise.
- **readable.toArray([options])**: Collects all chunks into an array, returning a promise.
- **readable.some(fn[, options])**: Checks if any chunk satisfies a predicate, returning a promise.
- **readable.find(fn[, options])**: Finds the first chunk satisfying a predicate, returning a promise.
- **readable.every(fn[, options])**: Checks if all chunks satisfy a predicate, returning a promise.
- **readable.flatMap(fn[, options])**: Maps each chunk to an iterable and flattens, returning a new stream.
- **readable.drop(limit[, options])**: Skips the first limit chunks, returning a new stream.
- **readable.take(limit[, options])**: Takes the first limit chunks, returning a new stream.
- **readable.reduce(fn[, initial[, options]])**: Reduces the stream to a single value, returning a promise.

#### Duplex and Transform Streams

- **Class: stream.Duplex**: A stream that is both readable and writable (e.g., TCP socket).
- **duplex.allowHalfOpen**: Boolean controlling if the readable side can remain open after the writable side closes.
- **Class: stream.Transform**: A duplex stream that transforms data (e.g., compression stream).
- **transform.destroy([error])**: Closes the transform stream, optionally emitting an error.
- **stream.duplexPair([options])**: Creates a pair of duplex streams where each side’s input is the other’s output.

#### General Stream Methods

- **stream.finished(stream[, options], callback)**: Calls a callback when a stream ends or errors (callback version of stream.finished).
- **stream.pipeline(source[, ...transforms], destination, callback)**: Callback version of pipeline, chaining streams with error handling.
- **stream.pipeline(streams, callback)**: Callback version of pipeline with an array of streams.
- **stream.compose(...streams)**: Combines multiple streams into a single duplex stream.
- **stream.Readable.from(iterable[, options])**: Creates a readable stream from an iterable (sync or async).
- **stream.Readable.fromWeb(readableStream[, options])**: Converts a web ReadableStream to a Node.js readable stream.
- **stream.Readable.isDisturbed(stream)**: Returns true if the stream has been read or canceled.
- **stream.isErrored(stream)**: Returns true if the stream has errored.
- **stream.isReadable(stream)**: Returns true if the stream is readable and not ended.
- **stream.Readable.toWeb(streamReadable[, options])**: Converts a Node.js readable stream to a web ReadableStream.
- **stream.Writable.fromWeb(writableStream[, options])**: Converts a web WritableStream to a Node.js writable stream.
- **stream.Writable.toWeb(streamWritable)**: Converts a Node.js writable stream to a web WritableStream.
- **stream.Duplex.from(src)**: Creates a duplex stream from a source (readable, writable, or iterable).
- **stream.Duplex.fromWeb(pair[, options])**: Converts a web ReadableStream/WritableStream pair to a Node.js duplex stream.
- **stream.Duplex.toWeb(streamDuplex)**: Converts a Node.js duplex stream to a web stream pair.
- **stream.addAbortSignal(signal, stream)**: Attaches an AbortSignal to a stream for cancellation.
- **stream.getDefaultHighWaterMark(objectMode)**: Returns the default buffer size for streams (16KB or 16 objects).
- **stream.setDefaultHighWaterMark(objectMode, value)**: Sets the default buffer size for streams.

---

### API for Stream Implementers

#### Implementing a Writable Stream

- **new stream.Writable([options])**: Creates a custom writable stream with options like write and highWaterMark.
- **writable._construct(callback)**: Initializes the stream’s resources, calling callback when done.
- **writable._write(chunk, encoding, callback)**: Processes a single chunk of data, calling callback when complete.
- **writable._writev(chunks, callback)**: Processes multiple chunks (from cork()), calling callback when complete.
- **writable._destroy(err, callback)**: Cleans up resources, optionally handling an error, calling callback when done.
- **writable._final(callback)**: Called before the stream ends, for final cleanup, calling callback when done.
- **Errors While Writing**: Errors in _write or _writev emit 'error' events unless handled.
- **An Example Writable Stream**: Demonstrates implementing a custom writable stream with _write.
- **Decoding Buffers in a Writable Stream**: Shows how to handle encoded buffers in _write.

#### Implementing a Readable Stream

- **new stream.Readable([options])**: Creates a custom readable stream with options like read and highWaterMark.
- **readable._construct(callback)**: Initializes the stream’s resources, calling callback when done.
- **readable._read(size)**: Requests data to be pushed to the stream’s buffer.
- **readable._destroy(err, callback)**: Cleans up resources, optionally handling an error, calling callback when done.
- **readable.push(chunk[, encoding])**: Adds a chunk to the stream’s buffer; null signals end.
- **Errors While Reading**: Errors in _read emit 'error' events unless handled.
- **An Example Counting Stream**: Demonstrates a readable stream that emits numbers.

#### Implementing a Duplex Stream

- **new stream.Duplex(options)**: Creates a stream that is both readable and writable, with separate read/write methods.
- **An Example Duplex Stream**: Shows a duplex stream with independent read/write logic.
- **Object Mode Duplex Streams**: Duplex streams can operate in object mode for both sides.

#### Implementing a Transform Stream

- **new stream.Transform([options])**: Creates a transform stream with options like transform and flush.
- **Event: 'end'**: Emitted when the readable side ends.
- **Event: 'finish'**: Emitted when the writable side finishes.
- **transform._flush(callback)**: Called before the stream ends, to push final data, calling callback when done.
- **transform._transform(chunk, encoding, callback)**: Transforms a chunk, pushing results, calling callback when done.
- **Class: stream.PassThrough**: A transform stream that passes data through unchanged.

---
### Additional Notes

- **Streams Compatibility with Async Generators and Iterators**:
    - **Consuming Readable Streams with Async Iterators**: Use for await...of to iterate over readable stream chunks.
    - **Creating Readable Streams with Async Generators**: Use Readable.from with an async generator.
    - **Piping to Writable Streams from Async Iterators**: Write data from an async iterator to a writable stream.

---
# OS(OPERATING SYSTEM)

The os module in Node.js is a built-in module that provides operating system-related utility methods and properties, allowing developers to interact with the underlying operating system. It’s useful for retrieving system information, such as CPU details, memory usage, network interfaces, and more, enabling the creation of system-aware applications. Below is a comprehensive overview of the os module, including its key methods, properties, and practical use cases.

### Accessing the os Module

The os module is a core module, so it doesn’t require installation. You can include it in your Node.js application using:

javascript

Copy

`// CommonJS const os = require('node:os'); // ES Modules import os from 'node:os';`

### Key Methods and Properties

The os module provides various methods and properties to access system information. Below are some of the most commonly used ones:

#### 1. **System Information**

- **os.arch()**: Returns the CPU architecture for which the Node.js binary was compiled (e.g., 'x64', 'arm', 'arm64', 'ia32'). Useful for determining whether the system is 32-bit or 64-bit.
    
    javascript
    
    Copy
    
    `console.log(os.arch()); // e.g., 'x64'`
    
- **os.platform()**: Returns the operating system platform (e.g., 'linux', 'darwin' (macOS), 'win32' (Windows), 'freebsd', 'sunos').
    
    javascript
    
    Copy
    
    `console.log(os.platform()); // e.g., 'linux'`
    
- **os.type()**: Returns the operating system name (e.g., 'Linux', 'Darwin', 'Windows_NT').
    
    javascript
    
    Copy
    
    `console.log(os.type()); // e.g., 'Windows_NT'`
    
- **os.release()**: Returns the operating system release version.
    
    javascript
    
    Copy
    
    `console.log(os.release()); // e.g., '10.0.19045'`
    
- **os.version()**: Returns the operating system version (e.g., 'Windows 10 Pro' or kernel version for Linux).
    
    javascript
    
    Copy
    
    `console.log(os.version()); // e.g., 'Windows 10 Pro'`
    
- **os.hostname()**: Returns the hostname of the operating system.
    
    javascript
    
    Copy
    
    `console.log(os.hostname()); // e.g., 'DESKTOP-12345'`
    

#### 2. **CPU Information**

- **os.cpus()**: Returns an array of objects containing information about each logical CPU core, including model, speed (in MHz), and usage times (user, nice, sys, idle, irq).
    
    
`console.log(os.cpus());`
`// Example output:`
`// [`
`//   { model: 'Intel(R) Core(TM) i7 CPU', speed: 2926, times: { user: 252020, nice: 0, sys: 30340, idle: 1070356870, irq: 0 } },`
`//   ...`
`// ]`
    
- **os.availableParallelism()**: Returns an estimate of the default amount of parallelism a program should use (typically the number of logical CPU cores). This is a wrapper around libuv's uv_available_parallelism().
    
    
    
    `console.log(os.availableParallelism()); // e.g., 8`
    

#### 3. **Memory Information**

- **os.totalmem()**: Returns the total amount of system memory in bytes.
    

    
    `console.log(os.totalmem()); // e.g., 17179869184 (16 GB)`
    
- **os.freemem()**: Returns the amount of free system memory in bytes.
    
    
    `console.log(os.freemem()); // e.g., 4294967296 (4 GB free)`
    

#### 4. **Directory and File Paths**

- **os.homedir()**: Returns the path to the current user’s home directory.
    
    
    `console.log(os.homedir()); // e.g., 'C:\\Users\\Username'`
    
- **os.tmpdir()**: Returns the operating system’s default directory for temporary files.
    
    
    `console.log(os.tmpdir()); // e.g., 'C:\\Users\\Username\\AppData\\Local\\Temp'`
    

#### 5. **Network Information**

- **os.networkInterfaces()**: Returns an object containing information about network interfaces (e.g., IP addresses, netmasks, MAC addresses).
    
    
    `console.log(os.networkInterfaces());`
`// Example output:`
`// {`
`//   lo: [`
`//     { address: '127.0.0.1', netmask: '255.0.0.0', family: 'IPv4', mac: '00:00:00:00:00:00', internal: true, cidr: '127.0.0.1/8' },`
`//     { address: '::1', netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', family: 'IPv6', mac: '00:00:00:00:00:00', scopeid: 0, internal: true, cidr: '::1/128' }`
`//   ],`
`//   eth0: [`
`//     { address: '192.168.1.108', netmask: '255.255.255.0', family: 'IPv4', mac: '01:02:03:0a:0b:0c', internal: false, cidr: '192.168.1.108/24' },`
`//     ...`
`//   ]`
`// }`

#### 6. **System Uptime**

- **os.uptime()**: Returns the system uptime in seconds.

    `console.log(os.uptime()); // e.g., 3600 (1 hour)`
    

#### 7. **User Information**

- **os.userInfo([options])**: Returns information about the current user, including uid, gid, username, homedir, and shell. Note: uid and gid are -1 on Windows.
 
    `console.log(os.userInfo()); // Example output: // { uid: -1, gid: -1, username: 'Username', homedir: 'C:\\Users\\Username', shell: null }`
    

#### 8. **Constants**

- **os.constants**: Contains operating system-specific constants for error codes, process signals, and priority levels.
    

    `console.log(os.constants.priority); // Example output: { PRIORITY_LOW: 19, PRIORITY_BELOW_NORMAL: 10, PRIORITY_NORMAL: 0, ... }`
    

#### 9. **End-of-Line Marker**

- **os.EOL**: A constant that returns the operating system-specific end-of-line marker (\r\n on Windows, \n on POSIX systems).
    
    javascript
    
    Copy
    
    `console.log(JSON.stringify(os.EOL)); // e.g., "\\r\\n" on Windows`
    

#### 10. **Process Priority**

- **os.getPriority([pid])**: Retrieves the scheduling priority of a process (specified by pid or the current process if not provided).
- **os.setPriority([pid], priority)**: Sets the scheduling priority of a process. The priority must be an integer between -20 (high) and 19 (low). Note: Due to differences between Unix and Windows, priority mapping may vary slightly on Windows.

### Practical Use Cases

The os module is useful in various scenarios, including:

1. **System Monitoring**:
    - Check available memory (os.freemem()) before performing memory-intensive tasks.
    - Monitor CPU usage (os.cpus()) to optimize process distribution.
2. **Load Balancing**:
    
    - Use os.availableParallelism() or os.cpus().length to determine the number of worker threads or processes for load balancing in a Node.js cluster module.
  
  
  `const os = require('os');`
`const cluster = require('cluster');`
`if (cluster.isMaster) {`
  `for (let i = 0; i < os.availableParallelism(); i++) {`
    `cluster.fork();`
  `}`
`} else {`
  `console.log(Worker ${process.pid} started);`
`}`


3. **Cross-Platform Development**:
    
    - Use os.platform() and os.EOL to handle platform-specific logic, such as file path separators or line endings.
    
    `const os = require('os');`
`const fs = require('fs');`
`fs.writeFileSync('example.txt', Line 1${os.EOL}Line 2);`
    
4. **Network Configuration**:
    - Retrieve network interface details (os.networkInterfaces()) for network diagnostics or server configuration.
5. **Dynamic File Paths**:
    
    - Use os.homedir() or os.tmpdir() to store user-specific or temporary files.
    
    
    `const os = require('os');`
`const path = require('path');`
`const configPath = path.join(os.homedir(), 'config.json');`
`console.log(configPath); // e.g., 'C:\\Users\\Username\\config.json'`
    
6. **System-Specific Commands**:
    
    - Execute platform-specific commands based on os.platform().
    
    
  `const os = require('os');`
`const { execSync } = require('child_process');`
`if (os.platform() === 'win32') {`
  `execSync('dir');`
`} else {`
  `execSync('ls');`
`}`

### Notes and Best Practices

- **Platform Differences**: Some methods behave differently across operating systems. For example, nice values in os.cpus() are always 0 on Windows, and os.userInfo() returns -1 for uid and gid on Windows.
- **Memory Conversion**: Memory-related methods (os.totalmem(), os.freemem()) return values in bytes. To convert to MB or GB, divide by 1048576 (1024²) or 1073741824 (1024³), respectively.
    
 
    
    ``console.log(`Free memory: ${os.freemem() / 1073741824} GB`);``
    
- **Performance**: Methods like os.cpus() and os.networkInterfaces() can be resource-intensive on systems with many cores or interfaces, so use them judiciously.
- **Experimental Support**: The 'android' value for os.platform() is experimental, as Android support in Node.js is limited.
- **Documentation**: For a complete list of methods and properties, refer to the official Node.js documentation: [https://nodejs.org/api/os.html.[](https://nodejs.org/api/os.html.%5B)]([https://nodejs.org/api/os.html](https://nodejs.org/api/os.html))

### Example: System Information Dashboard

Here’s a simple script that creates a system information dashboard using the os module:

`const os = require('node:os');`

`console.log('System Information Dashboard');`
`console.log('===========================');`
`console.log(OS: ${os.type()} ${os.release()} (${os.version()}));`
`console.log(Platform: ${os.platform()});`
`console.log(Architecture: ${os.arch()});`
`console.log(Hostname: ${os.hostname()});`
`console.log(CPU Cores: ${os.cpus().length});`
`console.log(Total Memory: ${(os.totalmem() / 1073741824).toFixed(2)} GB);`
`console.log(Free Memory: ${(os.freemem() / 1073741824).toFixed(2)} GB);`
`console.log(Uptime: ${(os.uptime() / 3600).toFixed(2)} hours);`
`console.log(Home Directory: ${os.homedir()});`
`console.log('Network Interfaces:');`
`Object.entries(os.networkInterfaces()).forEach(([name, interfaces]) => {`
  `console.log(  ${name}:);`
  `interfaces.forEach(iface => {`
    `console.log(    - ${iface.family}: ${iface.address} (Internal: ${iface.internal}));`
  `});`
`});`
`**Sample Output** (varies by system):`


`text`

`Copy`

System Information Dashboard
===========================
OS: Windows_NT 10.0.19045 (Windows 10 Pro)
Platform: win32
Architecture: x64
Hostname: DESKTOP-12345
CPU Cores: 8
Total Memory: 16.00 GB
Free Memory: 4.23 GB
Uptime: 2.50 hours
Home Directory: C:\Users\Username
Network Interfaces:
  lo:
    - IPv4: 127.0.0.1 (Internal: true)
    - IPv6: ::1 (Internal: true)
  eth0:
    - IPv4: 192.168.1.108 (Internal: false)
    - IPv6: fe80::a00:27ff:fe4e:66a1 (Internal: false)

### Additional Resources

- **Official Node.js Documentation**: [https://nodejs.org/api/os.html[](https://nodejs.org/api/os.html%5B)]([https://nodejs.org/api/os.html](https://nodejs.org/api/os.html))
- **GeeksforGeeks Tutorial**: [https://www.geeksforgeeks.org/node-js-os/[](https://www.geeksforgeeks.org/node-js-os/%5B)]([https://www.geeksforgeeks.org/node-js-os/](https://www.geeksforgeeks.org/node-js-os/))
- **W3Schools Node.js OS Module**: [https://www.w3schools.com/nodejs/ref_os.asp[](https://www.w3schools.com/nodejs/ref_os.asp%5B)]([https://www.w3schools.com/nodejs/ref_os.asp](https://www.w3schools.com/nodejs/ref_os.asp))
- **Nodejsera OS Module Guide**: [https://www.nodejsera.com/nodejs-os-module.html[](https://www.nodejsera.com/nodejs-os-module.html%5B)]([https://www.nodejsera.com/os_module_in_nodejs.html](https://www.nodejsera.com/os_module_in_nodejs.html))

The os module is a powerful tool for building Node.js applications that need to adapt to or monitor the operating system environment. By leveraging its methods and properties, you can optimize performance, handle platform-specific logic, and create more robust applications. If you have a specific use case or need help with a particular method, let me know, and I can provide a tailored example or explanation!

---
The path module in Node.js is a built-in module that provides utilities for working with file and directory paths, making it easier to handle file system operations in a cross-platform way. It abstracts platform-specific path conventions, such as separators (/ on POSIX vs. \ on Windows) and path formats, ensuring your code works consistently across operating systems. Below is a comprehensive overview of the path module, including its key methods, properties, and practical use cases.

### Accessing the path Module

The path module is a core module, so it doesn’t require installation. You can include it in your Node.js application using:

javascript

Copy

`// CommonJS const path = require('node:path'); // ES Modules import path from 'node:path';`

### Key Methods and Properties

The path module provides methods and properties for manipulating file paths. Below are the most commonly used ones:

#### 1. **Path Construction and Manipulation**

- **path.join([...paths])**: Joins multiple path segments into a single path, using the platform-specific separator (/ on POSIX, \ on Windows). Normalizes the resulting path by resolving .. and ..
    
    javascript
    
    Copy
    
    `console.log(path.join('/home', 'user', 'docs', 'file.txt')); // Output (POSIX): /home/user/docs/file.txt // Output (Windows): \home\user\docs\file.txt`
    
- **path.resolve([...paths])**: Resolves a sequence of paths into an absolute path, starting from the current working directory (or the root if an absolute path is provided). It processes paths from right to left, applying each segment.
    
    javascript
    
    Copy
    
    `console.log(path.resolve('docs', 'file.txt')); // Output (POSIX): /current/working/directory/docs/file.txt // Output (Windows): C:\current\working\directory\docs\file.txt`
    
- **path.normalize(path)**: Normalizes a path by resolving .., ., and consecutive separators, ensuring a clean path format.
    
    javascript
    
    Copy
    
    `console.log(path.normalize('/home/user//docs/../file.txt')); // Output: /home/user/file.txt`
    

#### 2. **Path Decomposition**

- **path.dirname(path)**: Returns the directory name of a path (everything before the last separator).
    
    javascript
    
    Copy
    
    `console.log(path.dirname('/home/user/docs/file.txt'));// Output: /home/user/docs`
    
- **path.basename(path[, ext])**: Returns the last portion of a path (the file or directory name). If an optional ext is provided, it removes the specified extension.
    
    javascript
    
    Copy
    
    `console.log(path.basename('/home/user/docs/file.txt')); // file.txt console.log(path.basename('/home/user/docs/file.txt', '.txt')); // file`
    
- **path.extname(path)**: Returns the file extension (including the dot) of the path, or an empty string if there’s no extension.
    
    javascript
    
    Copy
    
    `console.log(path.extname('/home/user/docs/file.txt')); // .txt console.log(path.extname('/home/user/docs')); // ''`
    

#### 3. **Path Information**

- **path.isAbsolute(path)**: Returns true if the path is absolute (starts from the root), false otherwise.
    
    javascript
    
    Copy
    
    `console.log(path.isAbsolute('/home/user/docs')); // true console.log(path.isAbsolute('docs/file.txt')); // false`
    
- **path.parse(path)**: Returns an object with the path’s components: root, dir, base, name, and ext.
    
    javascript
    
    Copy
    
    `console.log(path.parse('/home/user/docs/file.txt')); // Output: // { // root: '/', // dir: '/home/user/docs', // base: 'file.txt', // name: 'file', // ext: '.txt' // }`
    
- **path.format(pathObject)**: Constructs a path string from a path object (reverse of path.parse).
    
    javascript
    
    Copy
    
    `const pathObj = { dir: '/home/user/docs', base: 'file.txt' }; console.log(path.format(pathObj)); // /home/user/docs/file.txt`
    

#### 4. **Relative Paths**

- **path.relative(from, to)**: Returns the relative path from the from path to the to path.
    
    javascript
    
    Copy
    
    `console.log(path.relative('/home/user/docs', '/home/user/images')); // Output: ../images`
    

#### 5. **Platform-Specific Properties**

- **path.sep**: The platform-specific file separator ('/' on POSIX, '\' on Windows).
    
    javascript
    
    Copy
    
    `console.log(path.sep); // e.g., '\' on Windows`
    
- **path.delimiter**: The platform-specific path delimiter (':' on POSIX, ';' on Windows), used in environment variables like PATH.
    
    javascript
    
    Copy
    
    `console.log(path.delimiter); // e.g., ';' on Windows`
    
- **path.posix**: Provides POSIX-specific path methods for consistent behavior on non-POSIX systems.
    
    javascript
    
    Copy
    
    `console.log(path.posix.join('home', 'user', 'docs')); // home/user/docs`
    
- **path.win32**: Provides Windows-specific path methods for consistent behavior on non-Windows systems.
    
    javascript
    
    Copy
    
    `console.log(path.win32.join('home', 'user', 'docs')); // home\user\docs`
    

#### 6. **URL and File Path Conversion (Node.js 10.0.0+)**

- **path.toNamespacedPath(path)**: On Windows, returns a path with a namespace prefix (e.g., \\?\ for long paths); on other platforms, returns the path unchanged.
    
    javascript
    
    Copy
    
    `console.log(path.toNamespacedPath('C:\\long\\path')); // \\?\C:\long\path (Windows)`
    

### Practical Use Cases

The path module is essential for file system operations and cross-platform development. Here are some common scenarios:

1. **File System Operations**:
    
    - Use path.join or path.resolve to construct reliable file paths when reading or writing files with the fs module.
    
    javascript
    
    Copy
    
    `const fs = require('fs');                                           const path = require('path');                                       const filePath = path.join(__dirname, 'data', 'file.txt'); fs.readFileSync(filePath, 'utf8');`
    
2. **Cross-Platform Compatibility**:
    
    - Use path.sep or path.join to handle platform-specific separators, avoiding hard-coded / or \.
    
    javascript
    
    Copy
    
    `const path = require('path'); 
    const configPath = path.join('config', 'settings.json');
     console.log(configPath); // config/settings.json (POSIX) or config\settings.json (Windows)`
    
3. **Dynamic Path Manipulation**:
    
    - Extract file names or directories for processing, such as renaming files or checking extensions.
    
    javascript
    
    Copy
    
    ``const path = require('path');
     const file = '/home/user/docs/report.pdf';
      console.log(`File: ${path.basename(file)}`); // File: report.pdf console.log(`Extension: ${path.extname(file)}`); // Extension: .pdf``
    
4. **Relative Path Navigation**:
    
    - Use path.relative to compute paths for linking resources or navigating directories.
    
    javascript
    
    Copy
    
    `const path = require('path');
     const relPath = path.relative('/app/src', '/app/public/images');
      console.log(relPath); // ../public/images`
    
5. **Path Parsing and Formatting**:
    
    - Parse a path to modify components and reconstruct it.
    
    `const path = require('path');` 
    `const parsed = path.parse('/home/user/docs/file.txt');` 
    `parsed.base = 'newfile.txt';` 
    `console.log(path.format(parsed)); // /home/user/docs/newfile.txt`
    
6. **Environment Variable Handling**:
    
    - Use path.delimiter to split or construct environment variable paths like PATH.
    
    javascript
    
    Copy
    
    `const path = require('path'); const paths = process.env.PATH.split(path.delimiter); console.log(paths); // Array of paths in PATH variable`
    

### Notes and Best Practices

- **Cross-Platform Development**: Always use path methods instead of hard-coding path separators (/ or \) to ensure compatibility across Windows, macOS, and Linux.
- **Absolute vs. Relative Paths**: Use path.resolve for absolute paths and path.join for relative paths, depending on your needs. Be aware that path.resolve depends on the current working directory (process.cwd()).
- **Path Normalization**: Use path.normalize to clean up user-provided paths that may contain redundant or incorrect separators.
- **Performance**: Path operations are lightweight, but avoid excessive calls in performance-critical loops, especially when combined with file system operations.
- **Windows Long Paths**: For very long paths on Windows, consider path.toNamespacedPath to avoid issues with the 260-character limit.
- **Use with __dirname and __filename**: Combine path with __dirname (directory of the current module) or __filename (file path of the current module) for robust file path handling.
    

    
    `const path = require('path'); 
    `console.log(path.join(__dirname, 'config.json')); // Path relative to current module`
    
- **Documentation**: For a complete list of methods and properties, refer to the official Node.js documentation: [https://nodejs.org/api/path.html](https://nodejs.org/api/path.html).

### Example: File Path Utility Script

Here’s a script demonstrating various path module features to manipulate and analyze file paths:

`const path = require('node:path');`

`console.log('Path Utility Demo');`
`console.log('================');`

`// Constructing paths`
`const filePath = path.join('home', 'user', 'docs', 'file.txt');`
`console.log(Joined Path: ${filePath});`

`// Resolving absolute path`
`const absPath = path.resolve('docs', 'file.txt');`
`console.log(Absolute Path: ${absPath});`

`// Normalizing a messy path`
`const messyPath = '/home//user/docs/../file.txt';`
`console.log(Normalized Path: ${path.normalize(messyPath)});`

`// Parsing a path`
`const parsed = path.parse('/home/user/docs/file.txt');`
`console.log('Parsed Path:', parsed);`

`// Formatting a modified path`
`parsed.base = 'newfile.pdf';`
`const newPath = path.format(parsed);`
`console.log(Formatted Path: ${newPath});`

`// Extracting components`
`console.log(Directory: ${path.dirname(filePath)});`
`console.log(File Name: ${path.basename(filePath)});`
`console.log(Extension: ${path.extname(filePath)});`

`// Checking if absolute`
`console.log(Is Absolute: ${path.isAbsolute(filePath)});`

`// Relative path`
`const from = '/home/user/docs';`
`const to = '/home/user/images';`
`console.log(Relative Path: ${path.relative(from, to)});`

`// Platform-specific constants`
`console.log(Separator: ${path.sep});`
`console.log(Delimiter: ${path.delimiter});`
`**Sample Output** (varies by system):`

Path Utility Demo
================
Joined Path: home\user\docs\file.txt
Absolute Path: C:\current\working\directory\docs\file.txt
Normalized Path: /home/user/file.txt
Parsed Path: {
  root: '/',
  dir: '/home/user/docs',
  base: 'file.txt',
  name: 'file',
  ext: '.txt'
}
Formatted Path: /home/user/docs/newfile.pdf
Directory: home\user\docs
File Name: file.txt
Extension: .txt
Is Absolute: false
Relative Path: ../images
Separator: \
Delimiter: ;

### Additional Resources

- **Official Node.js Documentation**: [https://nodejs.org/api/path.html](https://nodejs.org/api/path.html)
- **GeeksforGeeks Tutorial**: [https://www.geeksforgeeks.org/node-js-path-module/](https://www.geeksforgeeks.org/node-js-path-module/)
- **W3Schools Node.js Path Module**: [https://www.w3schools.com/nodejs/ref_path.asp](https://www.w3schools.com/nodejs/ref_path.asp)
- **Dev.to Guide**: [https://dev.to/iggredible/the-nodejs-path-module-4n8](https://dev.to/iggredible/the-nodejs-path-module-4n8)

The path module is a fundamental tool for any Node.js application that interacts with the file system, ensuring robust, platform-agnostic path handling. Whether you’re building a simple script or a complex server, mastering the path module will save time and prevent platform-specific bugs. If you have a specific use case, need clarification on a method, or want an example tailored to your project, let me know!

---

# Socket.IO
## Introduction[​](https://socket.io/docs/v4/tutorial/introduction#introduction "Direct link to Introduction")

Writing a chat application with popular web applications stacks like LAMP (PHP) has normally been very hard. It involves polling the server for changes, keeping track of timestamps, and it’s a lot slower than it should be.

Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.

This means that the server can _push_ messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.