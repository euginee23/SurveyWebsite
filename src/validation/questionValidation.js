export const validateQuestions = (formData) => {
    const errors = {};

    if (
        !formData.question1 ||
        !formData.question2 ||
        !formData.question3 ||
        !formData.question4 ||
        !formData.question5 ||
        !formData.question6 ||
        !formData.question7 ||
        !formData.question8
    ) {
        errors.global = 'Please answer all questions.';
    }
    
    // QUESTION 1
    if (formData.question1 === 'Other') {
        if (!formData.otherResponse.trim()) {
            errors.question1 = 'Please specify your response for "Other".';
        }
    } else if (!formData.question1.trim()) {
        errors.question1 = 'Please provide a response for Question 1.';
    }

    // QUESTION 2
    if (!formData.question2.trim()) {
        errors.question2 = 'Please provide a response for Question 2.';
    }

    // QUESTION 3
    if (formData.question3 === 'Other') {
        if (!formData.otherSpecify3.trim()) {
            errors.question3 = 'Please specify your response for "Other".';
        }
    } else if (!formData.question3.trim()) {
        errors.question3 = 'Please provide a response for Question 3.';
    }

    // QUESTION 4
    if (formData.question4) {
        if (
            (formData.question4 === 'Messaging apps selection' ||
                formData.question4 === 'Video calls selection' ||
                formData.question4 === 'Email selection') &&
            !formData.communicationApp.trim()
        ) {
            errors.communicationApp = 'Please select an specific app.';
        } else if (formData.question4 === 'Other') {
            if (!formData.otherSpecify4.trim()) {
                errors.question4 = 'Please specify your response for "Other".';
            }
        } 
    }
    if (!formData.question4.trim()) {
        errors.question4 = 'Please provide a response for Question 4.';
    }

    // QUESTION 5
    if (!formData.question5.trim()) {
        errors.question5 = 'Please provide a response for Question 5.';
    }

    // QUESTION 6
    if (formData.question6 === 'Other') {
        if (!formData.otherSpecify6.trim()) {
            errors.question6 = 'Please specify your response for "Other".';
        }
    } else if (!formData.question6.trim()) {
        errors.question6 = 'Please provide a response for Question 6.';
    }

    // QUESTION 7
    if (!formData.question7.trim()) {
        errors.question7 = 'Please provide a response for Question 7.';
    }

    // QUESTION 8
    if (formData.question8 === 'Other') {
        if (!formData.otherSpecify8.trim()) {
            errors.question8 = 'Please specify your response for "Other".';
        }
    } else if (!formData.question8.trim()) {
        errors.question8 = 'Please provide a response for Question 8.';
    }

    return errors;
};
