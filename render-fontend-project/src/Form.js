import React, { useState } from 'react';
import './Form.css';

function Form({onSubmit}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://render-example-form.onrender.com/api/submit-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          console.log(response)
    
          if (response.ok) {
            // Reset the form after successful submission
            setFormData({
              name: '',
              email: '',
            });
            alert('Form submitted successfully!');
          } else {
            alert('Error submitting form.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
        onSubmit(formData); // You can replace this with your desired logic to display the results.
      };

  return (
    <div className="form-container">
      <h2>Form Example</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;