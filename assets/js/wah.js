document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default button click behavior

        let errorMessage = '';
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const clinic = document.getElementById('clinic').value.trim();

        const dob = document.getElementById('dob').value.trim();
        const email = document.getElementById('email').value.trim();
        const comments = document.getElementById('comments').value.trim();
        const studyDescription = document.getElementById('study-description').value.trim();
        const yourName = document.getElementById('your-name').value;

        if (!firstName) {
            errorMessage += 'Patient first name is required.\n';
        }
        if (!lastName) {
            errorMessage += 'Patient last name is required.\n';
        }
        if (!clinic) {
            errorMessage += 'Attended clinic name is required.\n';
        }
        if (!email) {
            errorMessage += 'Your email is required.\n';
        }
        if (!dob) {
            errorMessage += 'DOB is required.\n';
        }

        if (!yourName) {
            errorMessage += 'Your name is required.\n';
        }

        if (errorMessage) {
            document.getElementById('error-message').innerHTML = errorMessage.replace(/\n/g, '<br>'); // Format the error message
            return; // Stop the form submission
        }


        // Create an object to store the form data
        const formData = {
            form: 'wah',
            firstName: firstName,
            lastName: lastName,
            clinic: clinic,
            dob: dob,
            email: email,
            comments: comments,
            studyDescription: studyDescription,
            yourName: yourName
        };

        // Convert the formData object to a JSON string
        const jsonData = JSON.stringify(formData);

        // Send a POST request with the JSON data
        fetch('https://63dolu2fafjzwcdea7e4lhv5z40ngqlf.lambda-url.ap-southeast-2.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = 'wah-success.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                // Display an error message to the user
                document.getElementById('error-message').textContent = "Sorry, there was a problem submitting your form. Please try again.";

            });
    });
});
