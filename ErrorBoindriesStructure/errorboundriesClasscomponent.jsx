import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    // This static method is called when an error is thrown.
    // It should return an object to update state.
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    // This method is called after an error has been thrown.
    // It's ideal for logging error information.
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service here
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ padding: '20px', border: '1px solid red', borderRadius: '8px', backgroundColor: '#ffe6e6', color: '#cc0000' }}>
                    <h3>Oops! Something went wrong.</h3>
                    <p>We're sorry for the inconvenience. Please try refreshing the page or come back later.</p>
                    {/* Optionally, show error details in development */}
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;



// Wrap parts of your application (or the whole app) with the ErrorBoundary component. Place it where you want to catch errors and display a fallback

// main app.jsx

import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// A component that might throw an error (for testing)
const ProblematicComponent = () => {
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount(prev => prev + 1);
        // Simulate an error after a certain count
        if (count === 2) {
            throw new Error('I crashed due to a critical state update!');
        }
    };

    return (
        <div style={{ padding: '15px', border: '1px dashed blue', margin: '20px 0' }}>
            <h4>Problematic Component</h4>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment and potentially crash</button>
        </div>
    );
};

// Another component that might throw an error in its render
const RenderErrorComponent = () => {
    // This will cause an error during rendering if `data` is undefined
    // For demonstration, let's make it always crash
    throw new Error("This component crashed during render!");
    // return <div>I render fine!</div>;
};


function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1>MERN App with Error Boundaries</h1>

            {/* Error Boundary around a specific component */}
            <h3>Component-Specific Error Boundary</h3>
            <ErrorBoundary>
                <ProblematicComponent />
            </ErrorBoundary>

            <hr style={{ margin: '30px 0' }}/>

            {/* Error Boundary around another component */}
            <h3>Another Component-Specific Error Boundary (Render Error)</h3>
            <ErrorBoundary>
                <RenderErrorComponent />
            </ErrorBoundary>

            <hr style={{ margin: '30px 0' }}/>

            {/* Global Error Boundary for the rest of the app */}
            <h3>Global Error Boundary (covering remaining parts)</h3>
            <ErrorBoundary>
                <p>This content is outside the specific boundaries above.</p>
                {/* You can nest components here */}
            </ErrorBoundary>

            {/*
                Consider wrapping your entire App with an ErrorBoundary in your root file (index.js)
                for the broadest coverage.
            */}
        </div>
    );
}

export default App;