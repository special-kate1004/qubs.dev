document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default button click behavior

        let errorMessage = '';
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const role = document.getElementById('role').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const typeOfClinic = document.getElementById('type-of-clinic').value;
        const startDate = document.getElementById('start-date').value.trim();
        const companyName = document.getElementById('company-name').value.trim();
        const howDidYouHear = document.getElementById('how-did-you-hear').value.trim();

        // Validate the 'interestedProducts' select element
        const interestedProducts = document.getElementById('interestedProducts');
        const productsSelected = Array.from(interestedProducts.selectedOptions).length > 0;

        if (!firstName) {
            errorMessage += 'First name is required.\n';
        }
        if (!lastName) {
            errorMessage += 'Last name is required.\n';
        }
        if (!role) {
            errorMessage += 'Role is required.\n';
        }
        if (!email) {
            errorMessage += 'Email is required.\n';
        }
        if (!mobile) {
            errorMessage += 'Mobile number is required.\n';
        }
        if (!typeOfClinic) {
            errorMessage += 'Type of clinic is required.\n';
        }
        if (!startDate) {
            errorMessage += 'Expected start date is required.\n';
        }
        if (!productsSelected) {
            errorMessage += 'Please select at least one product.\n';
        }
        if (!companyName) {
            errorMessage += 'Company name is required.\n';
        }
        if (!howDidYouHear) {
            errorMessage += 'Information on how you heard about us is required.\n';
        }

        if (errorMessage) {
            document.getElementById('error-message').innerHTML = errorMessage.replace(/\n/g, '<br>'); // Format the error message
            return; // Stop the form submission
        }


        // Create an object to store the form data
        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            role: document.getElementById('role').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            website: document.getElementById('website').value,
            typeOfClinic: document.getElementById('type-of-clinic').value,
            startDate: document.getElementById('start-date').value,
            interestedProducts: Array.from(document.getElementById('interestedProducts').options).filter(option => option.selected).map(option => option.value),
            companyName: document.getElementById('company-name').value,
            query: document.getElementById('query').value,
            howDidYouHear: document.getElementById('how-did-you-hear').value
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
                window.location.href = 'submission-success.html';
            })
            .catch((error) => {
                console.error('Error:', error);
                // Display an error message to the user
                document.getElementById('error-message').textContent = "Sorry, there was a problem submitting your form. Please try again.";

            });
    });
});
