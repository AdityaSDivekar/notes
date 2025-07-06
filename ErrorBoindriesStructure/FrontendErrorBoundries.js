// // Error Boundaries:

// // React's Error Boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application.

// // This prevents a single error in a component from bringing down the entire user interface

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can log the error to an error reporting service here
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong. Please try again later.</h1>;
      }
      return this.props.children;
    }
  }
  // Usage:
  // <ErrorBoundary>
  //   <MyProblematicComponent />
  // </ErrorBoundary>


//   Global Error Handlers: Use window.onerror or window.addEventListener('unhandledrejection', ...) for catching global unhandled errors in the browser, though Error Boundaries are generally preferred for component-specific errors.

// API Error Handling:

// When making API calls (e.g., with axios or fetch), always handle potential errors:

try {
  const response = await axios.get('/api/data');
  // Process successful response
} catch (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    // Display user-friendly message based on error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    // Inform user about network issue
  } else {
    // Something else happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  // Display a generic error message to the user
}



// User Feedback: Provide clear, user-friendly error messages that explain what went wrong (without exposing sensitive details) and, if possible, suggest how the user can proceed. Use toast notifications, modals, or inline error messages.