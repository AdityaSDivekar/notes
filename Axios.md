### Request method aliases

For convenience aliases have been provided for all supported request methods.

##### axios.request(config)

##### axios.get(url[, config])

##### axios.delete(url[, config])

##### axios.head(url[, config])   -------retrives the head from the url 

##### axios.options(url[, config])

##### axios.post(url[, data[, config]])

##### axios.put(url[, data[, config]])

##### axios.patch(url[, data[, config]])

##### axios.postForm(url[, data[, config]])

##### axios.putForm(url[, data[, config]])

##### axios.patchForm(url[, data[, config]])



### All Possible Modifications to Axios

#### 1. **Global Axios Defaults**

Modify the default configuration for all Axios requests by setting properties on axios.defaults. These defaults apply to every request unless overridden in a specific config object.

- **Modifiable Properties**:
    - Any config option can be set globally (e.g., baseURL, headers, timeout, responseType, etc.).
    - Common examples:
        - axios.defaults.baseURL: Set a default base URL for all requests.
        - axios.defaults.headers.common: Headers applied to all requests.
        - axios.defaults.headers[method]: Method-specific headers (e.g., axios.defaults.headers.post).
        - axios.defaults.timeout: Default timeout for all requests.
        - axios.defaults.withCredentials: Default credential handling for CORS.
        - axios.defaults.responseType: Default response type (e.g., 'json').
- **Example**:
    
    javascript
    
    Copy
    
    `axios.defaults.baseURL = 'https://api.example.com'; axios.defaults.timeout = 5000; axios.defaults.headers.common['Authorization'] = 'Bearer token123'; axios.defaults.headers.post['Content-Type'] = 'application/json'; // All requests now use these defaults axios.get('/users').then(response => console.log(response.data));`
    
- **Use Case**: Centralize configuration for an application (e.g., API endpoint, authentication tokens).

#### 2. **Request and Response Interceptors**

Interceptors allow you to modify requests before they are sent or responses before they are handled. They are ideal for logging, adding headers dynamically, retrying requests, or transforming data.

- **Request Interceptors**:
    - Modify the config object before the request is sent.
    - Syntax: axios.interceptors.request.use(onFulfilled, onRejected).
    - Example:
        
        javascript
        
        Copy
        
        `axios.interceptors.request.use( config => { config.headers['X-Request-ID'] = Math.random().toString(36).slice(2); console.log('Request sent:', config.url); return config; }, error => { console.error('Request error:', error); return Promise.reject(error); } );`
        
- **Response Interceptors**:
    - Modify the response or handle errors before they reach the .then or .catch block.
    - Syntax: axios.interceptors.response.use(onFulfilled, onRejected).
    - Example:
        
        javascript
        
        Copy
        
        `axios.interceptors.response.use( response => { console.log('Response received:', response.status); return response; }, error => { if (error.response?.status === 401) { // Handle unauthorized error (e.g., redirect to login) window.location.href = '/login'; } return Promise.reject(error); } );`
    
*  **remove interceptor 
  `const interceptor = axios.interceptors.request.use(config => config); axios.interceptors.request.eject(interceptor);`

#### 3. **Custom Axios Instances**

Create a custom Axios instance with pre-configured settings using axios.create(config). This is useful for isolating configurations for different APIs or use cases.

- **Syntax**:
    
    javascript
    
    `const instance = axios.create(config);`
    
- **Customizations**:
    - Set any config option (e.g., baseURL, headers, timeout) specific to the instance.
    - Add instance-specific interceptors.
    - Override global defaults without affecting other requests.
- **Example**:
    
    javascript
    
    Copy
    
    `const apiInstance = axios.create({ baseURL: 'https://api.example.com', timeout: 10000, headers: { 'X-API-Key': 'key123' } }); // Add instance-specific interceptor apiInstance.interceptors.request.use(config => { config.params = { ...config.params, version: '1.0' }; return config; }); // Use the instance apiInstance.get('/users').then(response => console.log(response.data));`
    
- **Use Cases**:
    - Separate configurations for different APIs (e.g., public vs. private APIs).
    - Encapsulate authentication or retry logic for a specific service.
    - Reuse configurations across multiple requests.

#### 4. **Custom Adapters**

Override the default HTTP adapter to customize how requests are made. This is an advanced modification for specific environments or testing.

- **Default Adapters**:
    - Browser: Uses XMLHttpRequest or fetch (depending on Axios version).
    - Node.js: Uses the http/https modules.
- **Custom Adapter**:
    - Provide a function that handles the request and returns a response.
    - Example:
        
        javascript
        
        Copy
        
        `const customAdapter = async config => { // Mock response for testing return { data: { message: 'Mock response' }, status: 200, statusText: 'OK', headers: {}, config, request: {} }; }; const instance = axios.create({ adapter: customAdapter }); instance.get('/test').then(response => console.log(response.data));`
        
- **Use Cases**:
    - Mock HTTP requests for testing.
    - Use a custom transport (e.g., WebSocket, custom HTTP client).
    - Simulate network conditions (e.g., delays, errors).

#### 5. **Canceling Requests**

Modify Axios to support request cancellation, either globally or per request.

- **Using AbortController (Recommended)**:
    - Set the signal property in the config object.
    - Example:
        
        javascript
        
        Copy
        
        `const controller = new AbortController(); axios.get('/data', { signal: controller.signal }) .then(response => console.log(response.data)) .catch(error => console.error(error.message)); controller.abort(); // Cancels the request`