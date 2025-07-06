//In Express.js, create a dedicated error-handling middleware function (one with four arguments: (err, req, res, next)). This catches all errors that are explicitly next(err)-ed or thrown in your route handlers.

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  // In production, avoid exposing sensitive error details to the client
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    res.status(statusCode).json({
      status: 'error',
      message: 'Something went wrong on our end. Please try again later.'
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      message: message,
      // Optionally include more details in development for debugging
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});


// Custom Error Classes:
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Usage:
app.get('/notfound', (req, res, next) => {
  next(new AppError('Resource not found', 404));
});


// Create custom error classes (e.g., AppError, NotFoundError, ValidationError) that extend the built-in Error class. This allows you to attach specific status codes and messages to different types of errors, making error handling more organized and predictable.

// try-catch Blocks:

// Use try-catch blocks for synchronous code where errors might be thrown.

// For asynchronous operations (like database calls or external API requests), use async/await with try-catch to handle promises gracefully.

// Promise Rejection Handling:

// In Node.js, unhandled promise rejections can crash your application. Implement global unhandled promise rejection handlers to log these errors and potentially shut down the application gracefully if needed.

// process.on('unhandledRejection', (reason, promise) => { console.error('Unhandled Rejection at:', promise, 'reason:', reason); // Log and consider graceful shutdown });

// Graceful Shutdown: Implement logic to shut down your server gracefully, allowing ongoing requests to complete before closing connections, especially important for database connections.
