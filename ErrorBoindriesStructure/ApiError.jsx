import React, { useState } from 'react';

function DataFetcher() {
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Replace with your API call
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed to fetch');
      // ...handle data
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
