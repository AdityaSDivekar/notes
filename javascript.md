### DOM
The DOM is a tree-like representation of an HTML document that allows JavaScript to interact with and manipulate the content, structure, and style of a web page. It works by:

1. Parsing the HTML to create a DOM tree.
    
2. Combining the DOM tree with the CSSOM to create a Render Tree.
    
3. Allowing JavaScript to dynamically update the DOM, which is immediately reflected in the browser.

js data types
String  
Number  
Bigint  
Boolean  
Undefined  
Null  
Symbol  
Object

JavaScript evaluates expressions from left to right. Different sequences can produce different results:
### JavaScript:

let x = 16 + 4 + "Volvo";

Result:

`20Volvo`
___
### JavaScript:

let x = "Volvo" + 16 + 4;

Result:

`Volvo164`
___


JavaScript has dynamic types. This means that the same variable can be used to hold different data types:

### is javascript asynchronous or asynchronous in nature?
==> Javascript is synchronous and singlethreaded at its core and using event-loops non-blocking behaviour javascript handles its asynchronous tasks .
### 🔍 So what's the correct answer?

> ✅ JavaScript is **synchronous by nature**, but it has **asynchronous capabilities** via features like:

- **Callbacks** 
    
- **Promises**
    
- **async/await**
    
- **Web APIs** like `setTimeout`, `fetch`, `XMLHttpRequest`
-
### 🧠 Think of it this way:

JavaScript runs **one line at a time (synchronously)**, but when it hits a task that can take a while (like an API call or timer), it **hands it off to the browser** or **Node.js runtime**, which runs it **asynchronously**, and continues executing the rest of the code.


### How node handles async tasks
`console.log("Start");`

`setTimeout(() => {`
  `console.log("Async task done");`
`}, 1000);`

`console.log("End");`

#### 🧱 What Actually Happens:

1. `"Start"` is printed — goes into **Call Stack**.
    
2. `setTimeout()` is called — moved to **Node.js APIs (libuv)** and runs in the background.
    
3. `"End"` is printed.
    
4. After 1000ms, the callback (`() => console.log(...)`) is placed in the **Callback Queue**.
    
5. The **Event Loop** checks if the **Call Stack** is empty — it is.
    
6. The callback is pushed into the **Call Stack** and executed: `"Async task done"` is printed.
### 🛠 Supported Async Tasks in Node.js:

| Task Type        | Example                                  |
| ---------------- | ---------------------------------------- |
| Timers           | `setTimeout`, `setInterval`              |
| File system      | `fs.readFile`, `fs.writeFile`            |
| Network requests | HTTP server/client using `http`, `axios` |
| Database queries | MongoDB, PostgreSQL drivers              |
| Streams & Events | `fs.createReadStream`, `EventEmitter`    |

### 🧩 Key Components:

| Component            | Role                                                              |
| -------------------- | ----------------------------------------------------------------- |
| **Call Stack**       | Executes your synchronous code line-by-line                       |
| **Web APIs (libuv)** | Handles asynchronous operations like file I/O, timers, HTTP       |
| **Callback Queue**   | Stores completed async task callbacks waiting to be executed      |
| **Event Loop**       | Orchestrates when callbacks move from the queue to the call stack |
|                      |                                                                   |

### Task priority in Event Loop
 ### 🔹 1. **Microtasks Queue (High Priority)**

Executed **right after** the current execution stack is empty, **before** any macrotasks.

**Examples:**

- `Promise.then()`, `Promise.catch()`, `Promise.finally()`
    
- `queueMicrotask()`
    
- `MutationObserver` (browser)
    

### 🔹 2. **Macrotasks Queue (Lower Priority)**

Executed in the **next event loop iteration**, after all microtasks are done.

**Examples:**

- `setTimeout()`, `setInterval()`
    
- `setImmediate()` (Node.js)
    
- `I/O operations` (Node.js)
    
- `UI rendering tasks` (Browser)
    
### 📊 Task Execution Priority (Descending):

|Priority|Type|Examples|When it runs|
|---|---|---|---|
|🥇 1|Microtask|`Promise.then()`, `queueMicrotask()`|Immediately after current script, before rendering or macrotasks|
|🥈 2|Macrotask|`setTimeout()`, `setInterval()`|In the next event loop cycle|
|🥉 3|Rendering|DOM painting/layout (browser only)|After microtasks but before next task cycle|
|🏅 4|I/O Tasks|File system, network requests (Node)|Varies based on OS and libuv scheduling|

### 🔁 How It Works — Execution Order
`console.log("1");`

`setTimeout(() => console.log("2"), 0);`

`Promise.resolve().then(() => console.log("3"));`

`console.log("4");`

#### 🟡 Output:
1
4
3  <-- microtask runs before macrotask
2

## 🔹 MICROTASKS (a.k.a. Jobs Queue)

> **Run immediately after the current synchronous code finishes, before rendering or any macrotask.**

### ✅ Examples:

|Source|Explanation|
|---|---|
|`Promise.then()`|Runs its callback as a microtask|
|`Promise.catch()` / `.finally()`|Same as `.then()`|
|`queueMicrotask()`|Explicitly schedules a microtask|
|`MutationObserver` (Browser)|DOM change detection|
|`process.nextTick()` (Node.js)|Runs **before** regular microtasks (special case in Node)|

### 📌 Characteristics:

- **Higher priority than macrotasks**
    
- Can **starve the event loop** if not used carefully (e.g., infinite microtasks)
    
- Always execute **before rendering** and **before any macrotask**
    

---

## 🔸 MACROTASKS (a.k.a. Tasks Queue)

> **Scheduled to run on the next tick of the event loop**, after all microtasks have been completed.

### ✅ Examples:

|Source|Explanation|
|---|---|
|`setTimeout()`|Timer-based task|
|`setInterval()`|Repeated timer-based task|
|`setImmediate()` (Node.js)|Runs after I/O events (similar to `setTimeout`)|
|`I/O callbacks` (Node.js)|File, network I/O|
|`UI rendering`|Repaints DOM in browser|
|`requestAnimationFrame()`|Scheduled before next repaint|

### 📌 Characteristics:

- **Lower priority** than microtasks
    
- Each event loop cycle runs **one macrotask**, then **all microtasks**, then next macrotask
    
## 🔁 Event Loop Cycle Summary

### Step-by-step per cycle:

1. Run all synchronous code (call stack)
    
2. Run **all microtasks**
    
3. **Repaint** (browser only)
    
4. Run **one macrotask**
    
5. Repeat from step 1

### ⚠️ Caveat in Node.js:

In Node.js:

- `process.nextTick()` runs **before** any other microtask
    
- `setImmediate()` runs after I/O, and later than `setTimeout()`
---

## 📊 Execution Order Example
## ✅ Microtasks (a.k.a. Jobs Queue)

> Run **immediately after the current synchronous code** and **before the next macrotask**.

|Source / API|Platform|Description|
|---|---|---|
|`Promise.then()` / `.catch()` / `.finally()`|Browser & Node.js|Called when a resolved promise is handled|
|`queueMicrotask()`|Browser & Node.js|Directly schedules a microtask|
|`MutationObserver`|Browser|Watches for DOM mutations, runs microtasks on change|
|`process.nextTick()`|**Node.js only**|Special microtask queue that runs before other microtasks|

## ✅ Macrotasks (a.k.a. Tasks Queue)

> Run **one per event loop iteration**, **after all microtasks are cleared**.

|Source / API|Platform|Description|
|---|---|---|
|`setTimeout()`|Browser & Node.js|Schedule a task after a delay|
|`setInterval()`|Browser & Node.js|Schedule recurring tasks|
|`setImmediate()`|**Node.js only**|Executes after I/O events (after timers)|
|`I/O Events`|Node.js|File system, network events, etc.|
|`MessageChannel`|Browser|Post a message from one thread to another|
|`requestAnimationFrame()`|Browser|Schedules a task before the next repaint|
|`UI Events` (click, keydown)|Browser|Browser events are macrotasks|
|`load`, `DOMContentLoaded`|Browser|DOM loading events|
|`fetch`|Browser|Response handling callback is scheduled as a macrotask (after `.then()`)|
|`XMLHttpRequest`|Browser|Callback of `onload`, `onreadystatechange` is macrotask|
|`WebSocket` events|Browser|`onmessage`, `onopen`, etc. are macrotasks|
|`setTimeout(fn, 0)`|Browser & Node.js|A “next tick” simulation, but still macrotask|

---

## Note

Most programming languages have many number types:

Whole numbers (integers):  
byte (8-bit), short (16-bit), int (32-bit), long (64-bit)

Real numbers (floating-point):  
float (32-bit), double (64-bit).

**Javascript numbers are always one type:  
double (64-bit floating point).**

# JavaScript Functions

A JavaScript function is a block of code designed to perform a particular task.

A JavaScript function is executed when "something" invokes it (calls it).

___
## Note

As you see from the examples above, `toCelsius` refers to the function object, and `toCelsius()` refers to the function result.


## Accessing Object Properties

You can access object properties in two ways:

_objectName.propertyName_

_objectName["propertyName"]_

___

Displaying a JavaScript object will output **[object Object]**.

prototype 
---
Prototype-based programming is a style of object-oriented programming in which classes are not explicitly defined, but rather derived by adding properties and methods to an instance of another class or, less frequently, adding them to an empty object. 
### 🔹 Key Concepts

- **Prototype:** An object from which other objects inherit properties.
    
- **Object.create(proto):** Creates a new object with the given prototype.
    
- **this:** Refers to the current object (like in class-based OOP).

==`// Step 1: Create a prototype object`==
==`const personPrototype = {`==
  ==`greet: function() {`==
    ==`console.log(Hello, my name is ${this.name});`==
  ==`}`==
==`};`==

==`// Step 2: Create a new object using the prototype`==
==`const person1 = Object.create(personPrototype);`==
==`person1.name = "Aditya";`==
==`person1.greet(); // Hello, my name is Aditya`==

==`// Step 3: Create another object from the same prototype`==
==`const person2 = Object.create(personPrototype);`==
==`person2.name = "John";`==
==`person2.greet(); // Hello, my name is John`==


---

## Object Constructor Functions

Sometimes we need to create many objects of the same **type**.

To create an **object type** we use an **object constructor function**.

It is considered good practice to name constructor functions with an upper-case first letter.

### Object Type Person

`function Person(first, last, age, eye) {`  
  `this.firstName = first;`  
  `this.lastName = last;`  
  `this.age = age;`  
  `this.eyeColor = eye;`  
`}`

## Adding a Property to a Constructor

You can **NOT** add a new property to an object constructor:
### Example

Person.nationality = "English";

To add a new property, you must add it to the constructor function prototype:

### Example

Person.prototype.nationality = "English";

## Adding a Method to a Constructor

You cannot add a new method to an object constructor function.

This code will produce a TypeError:

### Example

`Person.changeName = function (name) {`  
  `this.lastName = name;`  
`}`  
  
`myMother.changeName("Doe");`

 `TypeError: myMother.changeName is not a function`

Adding a new method must be done to the constructor function prototype:

### Example

`Person.prototype.changeName = function (name) {`  
  `this.lastName = name;`  
`}`  
  
`myMother.changeName("Doe");`

1. **Instantiation with `new`**: You can create an object by calling the constructor function with the `new` keyword. This sets up the `this` keyword to refer to the new object being created.234
    
    - Example:
        
        ```
        function Player(name, marker) {
          this.name = name;
          this.marker = marker;
        }
        const player = new Player('steve', 'X');
        ```
        
2. **Adding Methods**: You can add methods to the constructor function to extend the functionality of the objects created by it.234
    
    - Example:
        
        ```
        function Player(name, marker) {
          this.name = name;
          this.marker = marker;
          this.sayName = function() {
            console.log(this.name);
          };
        }
        const player = new Player('steve', 'X');
        player.sayName(); // logs 'steve'
        ```
        
3. **Prototype Inheritance**: Methods and properties can also be added to the prototype of the constructor function, allowing all instances of the constructor to inherit these properties and methods.234
    
    - Example:
        
        ```
        function Player(name, marker) {
          this.name = name;
          this.marker = marker;
        }
        Player.prototype.sayName = function() {
          console.log(this.name);
        };
        const player = new Player('steve', 'X');
        player.sayName(); // logs 'steve'
        ```
        
4. **Safeguarding Constructors**: To prevent calling the constructor without the `new` keyword, which can lead to unexpected behavior, you can use the `new.target` meta-property.234
    
    - Example:
        
        ```
        function Player(name, marker) {
          if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
          }
          this.name = name;
          this.marker = marker;
        }
        ```
## Built-in JavaScript Constructors

new Object()   // A new Object object  
new Array()    // A new Array object  
new Map()      // A new Map object  
new Set()      // A new Set object  
new Date()     // A new Date object  
new RegExp()   // A new RegExp object  
new Function() // A new Function object


## 🧠 JavaScript Constructor Methods Cheat Sheet

### 🔹 `Object()`

**Static methods** (called on Object itself):
`Object.keys(obj)`
`Object.values(obj)`
`Object.entries(obj)`
`Object.assign(target, source)`
`Object.create(proto)`
`Object.freeze(obj)`
`Object.seal(obj)`
`Object.defineProperty(obj, key, descriptor)`
`Object.getOwnPropertyDescriptor(obj, key)`
`Object.hasOwn(obj, key) // new ES2022`

**Prototype methods**:
`obj.toString()`
`obj.hasOwnProperty("key")`
`obj.valueOf()`

### 🔹 `Array()`

**Static methods**:
`Array.isArray(arr)`
`Array.from(iterable)`
`Array.of(1, 2, 3)`

**Prototype methods**
`arr.push(item)`
`arr.pop()`
`arr.shift()`
`arr.unshift(item)`
`arr.concat(otherArray)`
`arr.slice(start, end)`
`arr.splice(start, deleteCount, ...items)`
`arr.indexOf(val)`
`arr.lastIndexOf(val)`
`arr.includes(val)`
`arr.find(callback)`
`arr.findIndex(callback)`
`arr.filter(callback)`
`arr.map(callback)`
`arr.reduce(callback, initialValue)`
`arr.forEach(callback)`
`arr.sort()`
`arr.reverse()`
`arr.every(callback)`
`arr.some(callback)`
`arr.join(separator)`
`arr.flat(depth)`
`arr.flatMap(callback)`
`arr.toString()`


### 🔹 `String()`

**Static methods**:
`String.fromCharCode(code)`
`String.fromCodePoint(code)`

**Prototype methods**:

`str.charAt(index)`
`str.charCodeAt(index)`
`str.codePointAt(index)`
`str.concat(otherStr)`
`str.includes(substr)`
`str.indexOf(substr)`
`str.lastIndexOf(substr)`
`str.startsWith(prefix)`
`str.endsWith(suffix)`
`str.slice(start, end)`
`str.substring(start, end)`
`str.substr(start, length) // deprecated`
`str.split(separator)`
`str.replace(search, replace)`
`str.replaceAll(search, replace)`
`str.toUpperCase()`
`str.toLowerCase()`
`str.trim()`
`str.trimStart()`
`str.trimEnd()`
`str.padStart(length, char)`
`str.padEnd(length, char)`
`str.repeat(count)`
`str.match(regex)`
`str.matchAll(regex)`
`str.search(regex)`
`str.localeCompare(other)`
`str.normalize()`
`str.valueOf()`
`str.toString()`

### 🔹 `Number()`

**Static methods**:

`Number.isNaN(val)`
`Number.isFinite(val)`
`Number.isInteger(val)`
`Number.parseFloat(str)`
`Number.parseInt(str)`
`Number.MAX_VALUE`
`Number.MIN_VALUE`
`Number.POSITIVE_INFINITY`
`Number.NEGATIVE_INFINITY`

**Prototype methods**:

`num.toFixed(digits)`
`num.toExponential(digits)`
`num.toPrecision(digits)`
`num.toString()`
`num.valueOf()`

### 🔹 `Date()`

**Prototype methods**:
`date.getFullYear()`
`date.getMonth()`
`date.getDate()`
`date.getDay()`
`date.getHours()`
`date.getMinutes()`
`date.getSeconds()`
`date.getMilliseconds()`
`date.getTime()`
`date.getTimezoneOffset()`

`date.setFullYear(year)`
`date.setMonth(month)`
`date.setDate(day)`
`date.setHours(hour)`
`date.setMinutes(min)`
`date.setSeconds(sec)`

`date.toDateString()`
`date.toTimeString()`
`date.toISOString()`
`date.toUTCString()`
`date.toLocaleString()`
`date.toLocaleDateString()`
`date.toLocaleTimeString()`
`date.valueOf()`

### 🔹 `Map()`

**Prototype methods**:
`map.set(key, value)`
`map.get(key)`
`map.has(key)`
`map.delete(key)`
`map.clear()`
`map.keys()`
`map.values()`
`map.entries()`
`map.forEach(callback)`


🔹 Set()
Prototype methods:
`set.add(value)`
`set.has(value)`
`set.delete(value)`
`set.clear()`
`set.forEach(callback)`
`set.keys()`
`set.values()`
`set.entries()`

### 🔹 `RegExp()`

**Prototype methods**:

regex.test(str)
regex.exec(str)

**Properties**:
`regex.source`
`regex.flags`
`regex.global`
`regex.ignoreCase`
`regex.multiline`
`regex.sticky`
`regex.unicode`

### 🔹 `Promise()`
A **Promise** is an object representing the **eventual completion (or failure)** of an asynchronous operation.

`const promise = new Promise((resolve, reject) => {`
  `// async operation`
`});`


**Static methods**:
`Promise.resolve(value)` // Quickly create a resolved promise with a given value
`Promise.reject(reason)` // Quickly create a rejected promise with a given error
`Promise.all([p1, p2])` //Waits for **all** promises to resolve. If **any** fails, it rejects
`Promise.race([p1, p2])` //Resolves or rejects as soon as **any** of the promises does.
`Promise.any([p1, p2])` //Resolves as soon as **any** promise resolves. Rejects only if **all** fail
`Promise.allSettled([p1, p2])` //Waits for **all** promises to settle (either resolve or reject)

**Prototype methods**:
`promise.then(onFulfilled)`
`promise.catch(onRejected)` 
`promise.finally(callback)`


---

## Window Object Methods
|                                                            |                                  |
| ---------------------------------------------------------- | -------------------------------- |
| [atob()](https://www.w3schools.com/jsref/met_win_atob.asp) | Decodes a base-64 encoded string |
|                                                            |                                  |
| [btoa()](https://www.w3schools.com/jsref/met_win_btoa.asp) | Encodes a string in base-64      |

# JavaScript Function bind()

With the `bind()` method, an object can borrow a method from another object.

### Example

const person = {  
  firstName:"John",  
  lastName: "Doe",  
  fullName: function () {  
    return this.firstName + " " + this.lastName;  
  }  
}  
  
const member = {  
  firstName:"Hege",  
  lastName: "Nilsen",  
}  
let fullName = person.fullName.bind(member);

---
When a function is used as a callback, **this** is lost.

This example will try to display the person name after 3 seconds, but it will display **undefined** instead:

### Example

const person = {  
  firstName:"John",  
  lastName: "Doe",  
  display: function () {  
    let x = document.getElementById("demo");  
    x.innerHTML = this.firstName + " " + this.lastName;  
  }  
}  
setTimeout(person.display, 3000);

---
The `this` keyword in JavaScript refers to the **context** in which a function is executed. Its value depends on **how** the function is called — not where it’s written.

---

### 🔹 Common Use Cases of `this`

#### 1. **Inside an object method**

javascript

CopyEdit

``const person = {   name: "Aditya",   greet() {     console.log(`Hello, I am ${this.name}`);   } };  person.greet(); // Hello, I am Aditya``

🔸 `this` refers to the object (`person`) calling the method.

---

#### 2. **In a regular function (non-method)**

javascript

CopyEdit

`function show() {   console.log(this); } show(); // In browsers, this = Window (global object)`

🔸 In non-strict mode, `this` refers to the **global object**. In strict mode (`'use strict'`), `this` is `undefined`.

---

#### 3. **In an event handler**

javascript

CopyEdit

`const button = document.querySelector("button"); button.addEventListener("click", function () {   console.log(this); // the button element });`

🔸 `this` refers to the DOM element that triggered the event.

---

#### 4. **With constructor functions**

javascript

CopyEdit

`function Car(brand) {   this.brand = brand; } const c = new Car("Honda"); console.log(c.brand); // Honda`

🔸 `this` refers to the **newly created object**.

---

#### 5. **With arrow functions**

javascript

CopyEdit

`const obj = {   name: "Aditya",   greet: () => {     console.log(this.name); // undefined (or window.name)   } }; obj.greet();`

🔸 Arrow functions do **not** bind their own `this`. They inherit it from their lexical scope.

---
### Difference in arrow function and normal function 
## Key Differences

1. **`this` binding**:
    
    - Normal functions have their own `this` context
        
    - Arrow functions inherit `this` from the surrounding lexical scope
        
2. **Constructor capability**:
    
    - Normal functions can be used as constructors (with `new`)
        
    - Arrow functions cannot be used as constructors
        
3. **Arguments object**:
    
    - Normal functions have `arguments` object
        
    - Arrow functions don't have `arguments` (use rest parameters instead)
        
4. **Method definitions**:
    
    - Normal functions are better for object methods when you need `this` to refer to the object
        
    - Arrow functions are better for callbacks where you want to preserve the outer `this`
        
5. **Hoisting**:
    
    - Function declarations are hoisted
        
    - Arrow functions (like function expressions) are not hoisted
        

## When to Use Each

- Use arrow functions for short callbacks and when you want lexical `this`
    
- Use normal functions for object methods, constructors, or when you need `arguments`
    
- Arrow functions are generally preferred in modern JavaScript for their concise syntax and predictable `this` behavior

---
## Difference in constructor function and normal function 

## Key Differences

1. **Purpose**:
    
    - Constructor: Creates and initializes objects (blueprint for objects)
        
    - Normal: Performs a specific task and returns a value
        
2. **Invocation**:
    
    - Constructor: Called with `new` keyword
        
    - Normal: Called directly (`greet()`)
        
3. **Return value**:
    
    - Constructor: Implicitly returns the newly created object (unless you explicitly return a different object)
        
    - Normal: Returns whatever is specified with `return` or `undefined`
        
4. **`this` binding**:
    
    - Constructor: `this` refers to the newly created instance
        
    - Normal: `this` depends on how the function is called (global/window in strict mode, undefined in strict mode if not bound)
        
5. **Naming convention**:
    
    - Constructor: Typically PascalCase (e.g., `Person`, `Car`)
        
    - Normal: Typically camelCase (e.g., `calculateTotal`, `getUserData`)
        
6. **Prototype property**:
    
    - Constructor: Has a `prototype` property used for inheritance
        
    - Normal: No `prototype` property (unless it's a function constructor)
        

## Example of the Differences
// Constructor function
`function Car(make, model) {`
  `this.make = make;`
  `this.model = model;`
`}`

`// Normal function`
`function describeCar(make, model) {`
  `return ${make} ${model};`
`}`

`const myCar = new Car('Toyota', 'Camry');  // Creates an object`
`const description = describeCar('Toyota', 'Camry');  // Returns a string`
## Important Notes:

- Any function can technically be used as a constructor if called with `new`
    
- ES6 introduced the `class` syntax which is syntactic sugar over constructor functions
    
- Arrow functions cannot be used as constructors (they throw an error if called with `new`)

---
### 🔑 Summary

| Context              | `this` refers to                              |
| -------------------- | --------------------------------------------- |
| Object method        | The object itself                             |
| Standalone function  | Global object (or `undefined` in strict mode) |
| Constructor function | The newly created object                      |
| Arrow function       | `this` from outer (lexical) scope             |
| Event listener       | The DOM element triggering the event          |

---  
## ✅ Basic Factory Function

A **factory function** is a **normal function** that **returns a new object**. It doesn’t require the `new` keyword or use `this`.

### 🧱 Basic Example:

`function createPerson(name, age) {`
  `return {`
    `name,`
    `age,`
    `greet() {`
      `console.log(Hi, I’m ${this.name} and I’m ${this.age} years old.);`
    `}`
  `};`
`}`

`const p1 = createPerson("Aditya", 25);`
`const p2 = createPerson("John", 30);`

`p1.greet(); // Hi, I’m Aditya and I’m 25 years old.`
`p2.greet(); // Hi, I’m John and I’m 30 years old.`


## ⚠️ Problem with This Version

Each time you call `createPerson`, a **new copy** of the `greet` method is created. That wastes memory if you make many objects.

---

## ✅ Optimized Factory Using **Shared Methods**

We can solve that by defining shared methods **outside** and referencing them inside:

`const personMethods = {`
  `greet() {`
    `console.log(Hi, I’m ${this.name} and I’m ${this.age} years old.);`
  `}`
`};`

`function createPerson(name, age) {`
  `const person = {`
    `name,`
    `age`
  `};`
  `// Attach shared methods`
  `Object.setPrototypeOf(person, personMethods);`
  `return person;`
`}`

`const p1 = createPerson("Aditya", 25);`
`const p2 = createPerson("John", 30);`

`p1.greet(); // Hi, I’m Aditya and I’m 25 years old.`

 🔥 Now all `person` instances share the same method — memory efficient like classes.


### ✅ Example: Basic `createCar` Factory Function

`function createCar(brand, model, year) {`
  `return {`
    `brand,`
    `model,`
    `year,`
    `start() {`
      `console.log(${this.brand} ${this.model} started.);`
    `},`
    `getAge(currentYear) {`
      `return currentYear - this.year;`
    `}`
  `};`
`}`

`const car1 = createCar("Toyota", "Camry", 2015);`
`const car2 = createCar("Tesla", "Model 3", 2021);`

`car1.start(); // Toyota Camry started.`
`console.log(car1.getAge(2025)); // 10`

`car2.start(); // Tesla Model 3 started.`
`console.log(car2.getAge(2025)); // 4`


## ✅ Optimized `createCar` Factory Function (with Shared Methods)

### 📦 Step 1: Shared Method Object

`const carMethods = {`
  `describe() {`
    `console.log(${this.color} ${this.brand} ${this.model} (${this.year}));`
  `},`
  `repaint(newColor) {`
    `this.color = newColor;`
    `console.log(Repainted to ${this.color});`
  `},`
  `getAge(currentYear) {`
    `return currentYear - this.year;`
  `}`
`};`

---

### 🏭 Step 2: Factory Function Using `Object.create()`

`function createCar(brand, model, year, color) {`
  `const car = Object.create(carMethods); // Inherits methods`
  `car.brand = brand;`
  `car.model = model;`
  `car.year = year;`
  `car.color = color;`
  `return car;`
`}`


---

### 🚗 Step 3: Usage Example

`const car1 = createCar("Toyota", "Camry", 2015, "Red");`
`const car2 = createCar("Tesla", "Model 3", 2021, "Blue");`

`car1.describe(); // Red Toyota Camry (2015)`
`car2.describe(); // Blue Tesla Model 3 (2021)`

`car1.repaint("Black"); // Repainted to Black`
`car1.describe();       // Black Toyota Camry (2015)`

`console.log(car2.getAge(2025)); // 4`

---
`let CarMethods={`
    `changecolor:function(newColor){`
        `this.color=newColor`
    `},`
    `showColor:function(){`
        `console.log("the color of car is"+this.color)`
    `},`
    `showCarDetails(){`
        `console.log(this.model,this.age,this.year,this.color)`
    `}`
`}`

`function createCar(model,age,year,color){`
    `const car=Object.create(CarMethods);`
    `car.age=age;`
    `car.model=model;`
    `car.year=year;`
    `car.color=color;`
    `return car`
`}`
`const c1=createCar("f1",21,2015,"red")`
`const c2=createCar("mercedese",15,2010,"grey")`
`c2.showCarDetails()`
`c2.changecolor("blue");`
`c2.showColor()`
`c2.showCarDetails()`
`c1.showCarDetails()`

---

## 🧠 Why This is Better (Optimized)

|Feature|Basic Factory|Optimized Factory|
|---|---|---|
|Method duplication|Yes — each instance copies|No — shared via prototype|
|Memory efficient|❌|✅|
|Easy to extend|❌ Have to redefine logic|✅ Add new methods to prototype|
## `🔍 Key Differences`

|Feature|Factory Function|Constructor Function|
|---|---|---|
|Syntax|Regular function that `returns` an object|Uses `this` and requires `new` keyword|
|`this` keyword|Not required|Must use `this`|
|Method sharing|Manual (unless using prototypes)|Can use prototypes for shared methods|
|Return value|You control what is returned|Returns the object bound to `this`|
|Risk of mistakes|Safer — no risk of forgetting `new`|Forgetting `new` can break your code|
|Inheritance|Needs manual setup|Easier via `prototype` or `class`|

---
# Higher Order Function (HOC)
heigher order functions are fucntions that takes another function as argument and writtens a function.

// Function to log arguments before executing the original function
function withLogging(func) {
  return function (...args) {
    console.log("Function is being called with args:", args);
    return func(...args);
  };
}

// Example function
function add(a, b) {
  return a + b;
}
// Wrapping 'add' function with logging functionality
const loggedAdd = withLogging(add);
console.log(loggedAdd(2, 3)); // Logs: Function is being called with args: [2, 3] → 5
// Function to get user details
function getUserDetails(name, id, age) {
  return `Hello, my name is ${name}, my age is ${age}, and ${id} is my ID number.`;
}

// Higher-order function that adds logging
let mainFunction = function (operatorFunc) {
  return function (...args) {
    console.log("The function is being called with the args:", args);
    return operatorFunc(...args);
  };
};

// Storing the wrapped function
let storage = mainFunction(getUserDetails);

// Calling the function with example data
console.log(storage("John", 12345, 30));

---
## Deep Copy and Shallow Copy

## 📌 What is a Copy?

When you **copy an object or array**, you're trying to create a new version of it. But the **depth of that copy** matters a lot — especially when the object contains **nested objects**.

---

## 🧼 Shallow Copy

A **shallow copy** creates a **new outer object**, but **nested objects are still referenced**.

### 📦 Example:
`const original = {`
  `name: "Aditya",`
  `address: { city: "Pune" }`
`};`

`const shallowCopy = { ...original };`
`shallowCopy.name = "John";`
`shallowCopy.address.city = "Mumbai";`

`console.log(original.name);         // Aditya ✅ (primitive copied)`
`console.log(original.address.city); // Mumbai ❌ (nested object shared)`

### ❗ Problem:

Changing `shallowCopy.address.city` also changes `original.address.city`  
👉 Because both point to the same nested object.

---

## 🌊 Deep Copy

A **deep copy** creates a **completely independent clone**, including **all nested objects**.

### 🛠️ Option 1: `structuredClone()` (Best for most cases)

`const deepCopy = structuredClone(original);`
`deepCopy.address.city = "Delhi";`

`console.log(original.address.city); // Pune ✅ no side effect`

> ✅ Works in modern browsers and Node.js 17+

### 🛠️ Option 2: JSON Method (Limitations)

 `const deepCopy = JSON.parse(JSON.stringify(original));` 

> ⚠️ **Limitations**:

- Doesn’t handle functions, `undefined`, `Date`, `Map`, `Set`, etc.
    

---

### 🧠 Summary Table

|Feature|Shallow Copy|Deep Copy|
|---|---|---|
|Outer object|✅ New|✅ New|
|Nested objects|❌ Shared reference|✅ Independently cloned|
|Memory usage|Low|Higher|
|Safety from changes|❌ No|✅ Yes|
|Use cases|Simple/flat objects/arrays|Nested structures needing isolation|

---

### 🔍 Common Shallow Copy Methods

`const objCopy = { ...original };`
`const arrCopy = originalArray.slice();`
`const arrCopy2 = Array.from(originalArray);`

---
## 🔁 1. **`structuredClone()` (Recommended)**

✅ Safest and modern approach for deep copying


`const deepCopy = structuredClone(original);`

### ✅ Pros:

- Handles most data types (objects, arrays, dates, maps, sets, etc.)
    
- Built into modern browsers and Node.js 17+
    

### ❌ Cons:

- Not available in older environments (e.g. Node <17, old browsers)
    

---

## 📦 2. **`JSON.parse(JSON.stringify(...))`**

`const deepCopy = JSON.parse(JSON.stringify(original));`

### ✅ Pros:

- Simple and supported everywhere
    

### ❌ Cons:
 
- ❌ Loses `undefined`, `functions`, `Date`, `Map`, `Set`, etc.
    
- ❌ Can't handle circular references
    

---

## 🛠 3. **Manual Recursive Function (Custom)**


`function deepClone(obj) {   if (obj === null || typeof obj !== "object") return obj; 
`if (Array.isArray(obj)) return obj.map(deepClone);`  
`const clone = {};` 
`for (const key in obj) {     clone[key] = deepClone(obj[key]);` 
`}   return clone;`
`}`

### ✅ Pros:

- Customizable
    
- Good learning exercise
    

### ❌ Cons:

- Limited to plain objects/arrays unless extended
    
- Doesn’t handle circular references or special types
    

---

## 🧰 4. **Using Lodash (`_.cloneDeep`)**

`npm install lodash`


`import _ from "lodash";  const deepCopy = _.cloneDeep(original);`

### ✅ Pros:

- Handles nested objects, arrays, Dates, Maps, Sets, etc.
    
- Very reliable and widely used in production
    

### ❌ Cons:

- Requires external dependency
    
- Slightly heavier footprint if you're only using this one utility
    

---

## 🧪 5. **Using `MessageChannel` (Browser only)**


`function deepCloneWithMessageChannel(obj) {   return new Promise((resolve) => {     const { port1, port2 } = new MessageChannel();                port2.onmessage = (e) => resolve(e.data);                    port1.postMessage(obj);                                                      });                                                                            }  const clone = await deepCloneWithMessageChannel(original);`

### ✅ Pros:

- Deep copies most types (similar to `structuredClone`)
    
- Useful in browser-based code without `structuredClone`
    

### ❌ Cons:

- Asynchronous
    
- Browser-only
    

---

## 🧠 Summary Table

|Method|Handles Dates/Maps?|Circular Support|Sync/Async|Works in Node.js?|Recommended|
|---|---|---|---|---|---|
|`structuredClone()`|✅ Yes|✅ Yes|✅ Sync|✅ Node 17+|✅ Yes|
|`JSON.parse(JSON.stringify)`|❌ No|❌ No|✅ Sync|✅ Yes|⚠️ Limited|
|Custom Recursive|⚠️ Limited|❌ No|✅ Sync|✅ Yes|⚠️ For learning|
|`_.cloneDeep` (Lodash)|✅ Yes|✅ Yes|✅ Sync|✅ Yes|✅ Yes|
|`MessageChannel`|✅ Yes|✅ Yes|❌ Async|❌ No|⚠️ Browser only|



## 📦 Shallow Copy of Objects

### ✅ 1. **Spread Operator `{...}`**

js

CopyEdit

`const obj1 = { name: "Aditya", age: 25 }; const copy = { ...obj1 };`

---

### ✅ 2. **`Object.assign()`**

js

CopyEdit

`const copy = Object.assign({}, obj1);`

---

### ✅ 3. **`Object.create()` (With prototype link)**

js

CopyEdit

`const copy = Object.create(Object.getPrototypeOf(obj1));         Object.assign(copy, obj1);`

- Not as common for shallow copies
    
- Maintains prototype chain (⚠️ careful)
    

---

## 🧺 Shallow Copy of Arrays

### ✅ 1. **Spread Operator `[...]`**

`const arr = [1, 2, 3]; const copy = [...arr];`

---

### ✅ 2. **`Array.prototype.slice()`**



`const copy = arr.slice();`

---

### ✅ 3. **`Array.from()`**

`const copy = Array.from(arr);`

---

### ✅ 4. **`concat()`**

`const copy = [].concat(arr);`

---

## 🧠 Key Behavior (for all shallow copies)

js

CopyEdit

`const original = {   name: "Aditya",   address: { city: "Pune" } };      const copy = { ...original }; copy.name = "John";               copy.address.city = "Mumbai";                            console.log(original.name);        // "Aditya" ✅ console.log(original.address.city); // "Mumbai" ❌ (nested reference)`

> ⚠️ The `address` object is still **shared** — so changes in `copy.address.city` reflect in `original`.

---

## 🔍 Summary Table

|Method|Object / Array|Shallow|Notes|
|---|---|---|---|
|`{ ...obj }`|Object|✅ Yes|Most modern way for objects|
|`Object.assign()`|Object|✅ Yes|Useful in older environments|
|`Object.create()`|Object|✅ Yes|Keeps prototype (⚠️ advanced use)|
|`[ ...arr ]`|Array|✅ Yes|Most modern way for arrays|
|`slice()`|Array|✅ Yes|Classic way|
|`Array.from()`|Array|✅ Yes|Flexible, accepts mapping|
|`concat()`|Array|✅ Yes|Simple and clean|

---
## ✅ 1. Object Methods

|Method|Description|Example|
|---|---|---|
|`Object.keys(obj)`|Returns array of keys|`Object.keys({a:1}) // ['a']`|
|`Object.values(obj)`|Returns array of values|`Object.values({a:1}) // [1]`|
|`Object.entries(obj)`|Returns array of key-value pairs|`[['a', 1]]`|
|`Object.assign(target, source)`|Copies props (shallow)|`Object.assign({}, obj)`|
|`Object.freeze(obj)`|Makes object immutable|Can't add/remove/change|
|`Object.seal(obj)`|Prevents add/remove; allows edits|`Object.seal(obj)`|
|`Object.hasOwn(obj, key)`|Checks own property (modern)|`Object.hasOwn(user, 'name')`|
|`obj.hasOwnProperty(key)`|Legacy check for own prop|`obj.hasOwnProperty('age')`|
|`Object.create(proto)`|Creates object with prototype|`Object.create(parentObj)`|
|`Object.getPrototypeOf(obj)`|Gets prototype of object|`Object.getPrototypeOf(obj)`|
|`Object.defineProperty(obj, key, desc)`|Adds custom property|Read-only, getter/setter etc.|

---

## ✅ 2. Array Methods

|Method|Description|Example|
|---|---|---|
|`push(item)`|Add to end|`arr.push(4)`|
|`pop()`|Remove from end|`arr.pop()`|
|`unshift(item)`|Add to start|`arr.unshift(0)`|
|`shift()`|Remove from start|`arr.shift()`|
|`slice(start, end)`|Returns part (non-destructive)|`arr.slice(1, 3)`|
|`splice(start, count, ...)`|Remove/add items (mutates)|`arr.splice(1, 2)`|
|`concat(arr2)`|Merges arrays|`arr.concat(arr2)`|
|`map(fn)`|Transforms items|`arr.map(x => x*2)`|
|`filter(fn)`|Filters items|`arr.filter(x => x > 10)`|
|`reduce(fn, init)`|Reduces to one value|`arr.reduce((a,b)=>a+b, 0)`|
|`find(fn)`|Finds first match|`arr.find(x => x > 5)`|
|`findIndex(fn)`|Index of first match|`arr.findIndex(x => x > 5)`|
|`includes(value)`|Checks existence|`arr.includes(3)`|
|`indexOf(value)`|Finds index|`arr.indexOf(2)`|
|`sort([fn])`|Sorts array|`arr.sort((a,b)=>a-b)`|
|`reverse()`|Reverses array|`arr.reverse()`|
|`every(fn)`|All values pass condition?|`arr.every(x => x > 0)`|
|`some(fn)`|Any value passes?|`arr.some(x => x > 0)`|
|`flat(depth)`|Flattens nested arrays|`[1,[2,[3]]].flat(2)`|
|`join(sep)`|Creates string|`arr.join(", ")`|

---

### 🧠 Pro Tip:

For copying:

- **Shallow copy**: `Object.assign({}, obj)`, `{ ...obj }`, `[...arr]`, `arr.slice()`
    
- **Deep copy**: `structuredClone(obj)`, `_.cloneDeep(obj)`


✅ Full Example: Object & Array Methods with Output

`console.log("========== OBJECT METHODS ==========");`

`const person = {`
  `name: "Aditya",`
  `age: 25,`
  `city: "Pune"`
`};`

`// Object.keys()`
`console.log("keys:", Object.keys(person)); // ['name', 'age', 'city']`

`// Object.values()`
`console.log("values:", Object.values(person)); // ['Aditya', 25, 'Pune']`

`// Object.entries()`
`console.log("entries:", Object.entries(person)); // [['name', 'Aditya'], ['age', 25], ['city', 'Pune']]`

`// Object.assign()`
`const shallowCopy = Object.assign({}, person);`
`console.log("shallowCopy:", shallowCopy);`

`// Object.freeze()`
`const frozenPerson = Object.freeze({ ...person });`
`frozenPerson.age = 30;`
`console.log("frozen (unchanged):", frozenPerson); // age still 25`

`// Object.seal()`
`const sealedPerson = Object.seal({ ...person });`
`sealedPerson.age = 30;`
`delete sealedPerson.name;`
`console.log("sealed (age updated, name kept):", sealedPerson);`

`// Object.hasOwn()`
`console.log("hasOwn:", Object.hasOwn(person, "name")); // true`

`// hasOwnProperty()`
`console.log("hasOwnProperty:", person.hasOwnProperty("age")); // true`

`// Object.create()`
`const proto = { gender: "male" };`
`const newObj = Object.create(proto);`
`newObj.name = "John";`
`console.log("Object.create:", newObj.name, newObj.gender); // John male`

`// Object.getPrototypeOf()`
`console.log("Prototype of newObj:", Object.getPrototypeOf(newObj)); // { gender: 'male' }`

`console.log("\n========== ARRAY METHODS ==========");`

`const numbers = [1, 2, 3, 4];`

`// push`
`numbers.push(5);`
`console.log("push:", numbers); // [1,2,3,4,5]`

`// pop`
`numbers.pop();`
`console.log("pop:", numbers); // [1,2,3,4]`

`// unshift`
`numbers.unshift(0);`
`console.log("unshift:", numbers); // [0,1,2,3,4]`

`// shift`
`numbers.shift();`
`console.log("shift:", numbers); // [1,2,3,4]`

`// slice`
`console.log("slice(1, 3):", numbers.slice(1, 3)); // [2,3]`

`// splice`
`const spliced = [...numbers];`
`spliced.splice(1, 2, 99, 100);`
`console.log("splice:", spliced); // [1, 99, 100, 4]`

`// concat`
`const more = [5, 6];`
`console.log("concat:", numbers.concat(more)); // [1,2,3,4,5,6]`

`// map`
`console.log("map x2:", numbers.map(x => x * 2)); // [2,4,6,8]`

`// filter`
`console.log("filter >2:", numbers.filter(x => x > 2)); // [3,4]`

`// reduce`
`console.log("reduce sum:", numbers.reduce((a, b) => a + b, 0)); // 10`

`// find`
`console.log("find > 2:", numbers.find(x => x > 2)); // 3`

`// findIndex`
`console.log("findIndex of 3:", numbers.findIndex(x => x === 3)); // 2`

`// includes`
`console.log("includes 3:", numbers.includes(3)); // true`

`// indexOf`
`console.log("indexOf 2:", numbers.indexOf(2)); // 1`

`// sort`
`const unsorted = [4, 1, 3, 2];`
`console.log("sorted:", unsorted.sort((a, b) => a - b)); // [1,2,3,4]`

`// reverse`
`console.log("reversed:", [...numbers].reverse()); // [4,3,2,1]`

`// every`
`console.log("every > 0:", numbers.every(x => x > 0)); // true`

`// some`
`console.log("some > 3:", numbers.some(x => x > 3)); // true`

`// flat`
`const nested = [1, [2, [3, [4]]]];`
`console.log("flat(2):", nested.flat(2)); // [1, 2, 3, [4]]`

`// join`
`console.log("join('-'):", numbers.join("-")); // '1-2-3-4'`


---

# higher order Component(HOC)
A **HOC** is a **function** that **takes a component as an argument** and returns a **new enhanced component**.


const withLogger = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    console.log("Component is rendered!");
    return <WrappedComponent {...props} />;
  };
};

const MyComponent = () => <h1>Hello</h1>;

const EnhancedComponent = withLogger(MyComponent);

---
# closure
