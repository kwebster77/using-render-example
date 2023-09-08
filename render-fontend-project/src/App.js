import React, { useState } from 'react';
import './App.css';
import Form from './Form';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <Form onSubmit={handleFormSubmit} />
      {formData && (
        <div className="results">
          <h3>Form Results:</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;
