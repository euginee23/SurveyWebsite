import * as Yup from 'yup';

export const validateForm = (formData) => {
    const errors = {};

    // First Name
    if (!formData.firstName.trim()) {
        errors.firstName = 'First Name is required';
    }

    // Last Name
    if (!formData.lastName.trim()) {
        errors.lastName = 'Last Name is required';
    }

    // Position
    if (!formData.position.trim()) {
        errors.position = 'Position is required';
    }

    // Course (for students)
    if (formData.position === 'student' && !formData.course.trim()) {
        errors.course = 'Course is required for students';
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!Yup.string().email().isValidSync(formData.email.trim())) {
        errors.email = 'Invalid email address';
    }

    return errors;
};
