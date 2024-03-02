import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../validation/userInfoValidation';
import { validateQuestions } from '../validation/questionValidation';
import Question1 from './questions/question1';
import Question2 from './questions/question2';
import Question3 from './questions/question3';
import Question4 from './questions/question4';
import Question5 from './questions/question5';
import Question6 from './questions/question6';
import Question7 from './questions/question7';
import Question8 from './questions/question8';

const SurveyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    course: '',
    email: '',
    question1: '',
    otherResponse: '',
    question2: '',
    question3: '',
    otherSpecify3: '',
    question4: '',
    communicationApp: '',
    otherSpecify4: '',
    question5: '',
    question6: '',
    otherSpecify6: '',
    question7: '',
    question8: '',
    otherSpecify8: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'question1' && value === 'Other') {
      setFormData({
        ...formData,
        question1: value,
        otherResponse: '',
      });
    } else if (name === 'question3' && value === 'Other') {
      setFormData({
        ...formData,
        question3: value,
        otherSpecify3: '',
      });
    } else if (name === 'question4') {
      if (value === 'Messaging apps selection' || value === 'Video calls selection' || value === 'Email selection') {
        setFormData({
          ...formData,
          question4: value,
          communicationApp: '',
        });
      } else if (value === 'Other') {
        setFormData({
          ...formData,
          question4: value,
          otherSpecify4: '',
        });
      } else {
        setFormData({
          ...formData,
          question4: value,
        });
      }
    } else if (name === 'communicationApp') {
      setFormData({
        ...formData,
        communicationApp: value,
      });
    } else if (name === 'question6' && value === 'Other') {
      setFormData({
        ...formData,
        question6: value,
        otherSpecify6: '',
      });
    } else if (name === 'question8' && value === 'Other') {
      setFormData({
        ...formData,
        question8: value,
        otherSpecify8: '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfoErrors = await validateForm(formData);
    const questionErrors = validateQuestions(formData);
    const errors = {
      ...userInfoErrors,
      ...questionErrors,
    };

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log('Server response:', data);

      if (data.success) {
        console.log('Form submitted successfully!');
        navigate('/success');
      } else {
        console.error('Form submission failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="container mt-4 mb-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.16)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: '20px', maxWidth: '900px' }}>

        <div className="header bg-primary" style={{ backgroundColor: 'gray', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0', marginLeft: '-12px', marginRight: '-12px', marginBottom: '20px' }}>
          <h5 style={{ marginLeft: '15px', marginTop: '10px' }}>Please fill in needed information</h5>
        </div>

        {formErrors.global && <div className="alert alert-danger">{formErrors.global}</div>}
        <div className="container mt-4 mb-4">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label"><h6>Enter your name:</h6></label>
              
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              {formErrors.firstName && <div className="alert alert-danger">{formErrors.firstName}</div>}

              
              <input
                type="text"
                className="form-control mt-2"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              {formErrors.lastName && <div className="alert alert-danger">{formErrors.lastName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label"><h6>Select position:</h6></label>
              {formErrors.position && <div className="alert alert-danger">{formErrors.position}</div>}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="position"
                  value="instructor"
                  checked={formData.position === 'instructor'}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label">Instructor</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="position"
                  value="student"
                  checked={formData.position === 'student'}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label">Student</label>
              </div>

              {formData.position === 'student' && (
                <div className="mt-2">
                  <label className="form-label"><h6>Select course:</h6></label>
                  <select
                    className="form-select"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="BSCS">BSCS (Bachelor of Science in Computer Science)</option>
                    <option value="ABPS">ABPS (Bachelor of Arts in Political Science)</option>
                    <option value="BS_CRIM">BS CRIM (Bachelor of Science in Criminology)</option>
                  </select>
                </div>
              )}
              {formErrors.course && <div className="alert alert-danger">{formErrors.course}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label"><h6>Enter your email:</h6></label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.email && <div className="alert alert-danger">{formErrors.email}</div>}
            </div>

          </form>
        </div>
      </div>

      <div className="container mt-4 mb-4" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', marginTop: '8px', marginBottom: '20px', maxWidth: '900px' }}>

        <div className="header bg-primary" style={{ color: 'white', padding: '20px', borderRadius: '8px 8px 0 0', marginLeft: '-12px', marginRight: '-12px', marginBottom: '20px', textAlign: 'center' }}>
          <h5>Identifying the Most Used Online Platform Digital Services at Western Mindanao State University Pagadian</h5>
        </div>

        <form onSubmit={handleSubmit}>

          {formErrors.question1 && <div className="alert alert-danger">{formErrors.question1}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question1 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question2 && <div className="alert alert-danger">{formErrors.question2}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question2 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question3 && <div className="alert alert-danger">{formErrors.question3}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question3 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.communicationApp && <div className="alert alert-danger">{formErrors.communicationApp}</div>}
          {formErrors.question4 && <div className="alert alert-danger">{formErrors.question4}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question4 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question5 && <div className="alert alert-danger">{formErrors.question5}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question5 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question6 && <div className="alert alert-danger">{formErrors.question6}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question6 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question7 && <div className="alert alert-danger">{formErrors.question7}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question7 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          {formErrors.question8 && <div className="alert alert-danger">{formErrors.question8}</div>}
          <div className="card" style={{ boxShadow: '0 5px 20px rgba(1, 1, 1, 0.2)', borderRadius: '8px', overflow: 'hidden', margin: '20px' }}>
            <div className="card-body">
              <Question8 formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-lg mb-4 mt-1" style={{ margin: '20px' }}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
