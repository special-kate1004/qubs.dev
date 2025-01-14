

function getAllFormData() {
    const formData = {};

    // Company information
    formData.startDate = document.getElementById('startDate').value;
    formData.companyName = document.getElementById('companyName').value;
    formData.abn = document.getElementById('abn').value;
    formData.phone = document.getElementById('phone').value;
    formData.fax = document.getElementById('fax').value;
    formData.website = document.getElementById('website').value;
    formData.replyEmail = document.getElementById('replyEmail').value;
    formData.numEmployees = document.getElementById('numEmployees').value;
    formData.numRadiologists = document.getElementById('numRadiologists').value;

    // Director/Owner Details
    formData.directorFirstName = document.getElementById('directorFirstName').value;
    formData.directorLastName = document.getElementById('directorLastName').value;
    formData.directorPhone = document.getElementById('directorPhone').value;
    formData.directorEmail = document.getElementById('directorEmail').value;

    // RIS PACS Initial Configuration
    formData.billingBulkBill = document.getElementById('billing-bulk-bill').checked;
    formData.billingDVA = document.getElementById('billing-dva').checked;
    formData.billingPrivate = document.getElementById('billing-private').checked;
    formData.billingMVI = document.getElementById('billing-mvi').checked;
    formData.billingWC = document.getElementById('billing-wc').checked;
    formData.billingOther = document.getElementById('billing-other').checked;
    formData.autoUpdateMedicareSchedule = document.getElementById('auto-update-yes').checked;
    formData.reportingDictationTranscription = document.getElementById('reporting-dt').checked;
    formData.reportingQUBSVR = document.getElementById('reporting-qvr').checked;
    formData.reportingOutsourced = document.getElementById('reporting-outsourced').checked;
    formData.reportingOtherVR = document.getElementById('reporting-ovrs').checked;
    formData.reportingOther = document.getElementById('reporting-other').checked;
    formData.requireHealthlink = document.getElementById('healthlink-yes').checked;
    formData.requireIntelerad = document.getElementById('intelerad-yes').checked;
    formData.requireMedReport360 = document.getElementById('medreport360-yes').checked;
    formData.requireAdvaPACS = document.getElementById('advapacs-yes').checked;
    formData.requireZedMed = document.getElementById('zedmed-yes').checked;



    // Primary Radiologist Details
    formData.radiologistFirstName = document.getElementById('radiologistFirstName').value;
    formData.radiologistLastName = document.getElementById('radiologistLastName').value;
    formData.radiologistPhone = document.getElementById('radiologistPhone').value;
    formData.radiologistEmail = document.getElementById('radiologistEmail').value;
    formData.providerNumber = document.getElementById('providerNumber').value;
    formData.credentials = document.getElementById('credentials').value;

    // Site Details
    formData.site1ClinicName = document.getElementById('site1-clinicName').value;
    formData.site1Address = document.getElementById('site1-address').value;
    formData.site1Phone = document.getElementById('site1-phone').value;
    formData.site1Fax = document.getElementById('site1-fax').value;
    formData.site1LSPN = document.getElementById('site1-lspn').value;
    formData.site1XRay = document.getElementById('site1-xray').checked;
    formData.site1US = document.getElementById('site1-us').checked;
    formData.site1CT = document.getElementById('site1-ct').checked;
    formData.site1OPG = document.getElementById('site1-opg').checked;
    formData.site1CBCT = document.getElementById('site1-cbct').checked;
    formData.site1MRI = document.getElementById('site1-mri').checked;
    formData.site1BD = document.getElementById('site1-bd').checked;


    //creditcard
    formData.cardNumber = document.getElementById('cardNumber').value;
    formData.cardCVC = document.getElementById('cardCVC').value;
    formData.cardExpiry = document.getElementById('cardExpiry').value;

  
    //get plan from url
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    formData.plan = plan;

    return formData;
}

// Function to validate a single field with optional custom validation rule
function validateField(inputId, groupId, errorId, errorMessage, customValidator = null) {
    const input = document.getElementById(inputId);
    const group = document.getElementById(groupId);
    const errorText = document.getElementById(errorId);

    if (!errorText) {
        console.log("errorId not found: " + errorId);
        return false;
    }

    let isValid = true;
    let customMessage = null;

    if (customValidator) {
        const validation = customValidator(input.value);
        isValid = validation.isValid;
        customMessage = validation.message;
    }

    if (!input.value.trim() || !isValid) {
        errorText.textContent = customMessage || errorMessage;
        group.classList.add('error');
        return false;
    } else {
        errorText.textContent = '';
        group.classList.remove('error');
        return true;
    }
}

// Function to validate a checkbox field
function validateCheckbox(inputId, groupId, errorId, errorMessage) {
    const checkbox = document.getElementById(inputId);
    const group = document.getElementById(groupId);
    const errorText = document.getElementById(errorId);

    if (!checkbox) {
        console.log("Checkbox not found: " + inputId);
        return false;
    }

    if (!checkbox.checked) {
        errorText.textContent = errorMessage;
        group.classList.add('error');
        return false;
    } else {
        errorText.textContent = '';
        group.classList.remove('error');
        return true;
    }
}


// Custom validator for email
function emailValidator(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: regex.test(value),
        message: 'Please enter a valid email address'
    };
}

// Custom validator for LSPN (a number between 3 and 5 digits)
function lspnValidator(value) {
    const regex = /^\d{4,5}$/;
    return {
        isValid: regex.test(value),
        message: 'LSPN must be between 4 and 5 digits'
    };
}

// Custom validator for phone numbers
function phoneNumberValidator(value) {
    // Check if starts with +61 and is 10 digits long (total 12 characters including +61)
    const isValid = value.startsWith('+61') && value.length === 12;
    return {
        isValid: isValid,
        message: 'Phone number must start with +61 and be 10 digits long'
    };
}

// Custom validator for Australian Business Number (ABN)
function abnValidator(value) {
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19]; // Weighting factors
    value = value.replace(/\s+/g, ''); // Remove any spaces

    if (!/^\d{11}$/.test(value)) { // Check if exactly 11 digits
        return { isValid: false, message: 'ABN must be exactly 11 digits' };
    }

    // Subtract one from the first digit
    value = (parseInt(value[0], 10) - 1).toString() + value.substring(1);

    // Calculate the weighted sum
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += parseInt(value[i], 10) * weights[i];
    }

    // Check if the sum modulo 89 is zero
    if (sum % 89 !== 0) {
        return { isValid: false, message: 'Invalid ABN' };
    }

    return { isValid: true, message: '' }; // Valid ABN
}

// Custom validator for start date
function dateValidator(value) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return {
        isValid: regex.test(value),
        message: 'Please enter a valid date'
    };
}

// Custom validator for credit card number
function cardNumberValidator(value) {
    const sanitizedValue = value.replace(/\D/g, '');

    // Visa, MasterCard, American Express detection by starting digits
    const cardType = sanitizedValue.startsWith('4') ? 'Visa' :
        sanitizedValue.match(/^5[1-5]/) ? 'MasterCard' :
            (sanitizedValue.startsWith('34') || sanitizedValue.startsWith('37')) ? 'American Express' :
                'Credit';

    // Check if the number is in the correct range of digits based on the card type
    if ((cardType === 'Visa' && !/^\d{13,16}$/.test(sanitizedValue)) ||
        (cardType === 'MasterCard' && !/^\d{16}$/.test(sanitizedValue)) ||
        (cardType === 'American Express' && !/^\d{15}$/.test(sanitizedValue))) {
        return {
            isValid: false,
            message: `Card number does not match ${cardType} format`
        };
    }

    // Luhn Algorithm implementation
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitizedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedValue.charAt(i), 10);

        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    if ((sum % 10) !== 0) {
        return {
            isValid: false,
            message: 'Invalid card number'
        };
    }

    return {
        isValid: true,
        message: `${cardType} card number is valid`
    };
}


function cardExpiryValidator(value) {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const match = value.match(regex);
    if (!match) {
        return {
            isValid: false,
            message: 'Expiry must be in MM/YY format'
        };
    }

    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);

    // Check if the year is less than the current year or if it's the current year and the month is past
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return {
            isValid: false,
            message: 'Expiry date must be in the future'
        };
    }

    return {
        isValid: true,
        message: 'Expiry date is valid'
    };
}


// Custom validator for CVV
function cvvValidator(value) {
    // CVV must be 3 or 4 digits
    const regex = /^\d{3,4}$/;
    return {
        isValid: regex.test(value),
        message: 'CVV must be 3 or 4 digits'
    };
}

//function to validate all fields
function validateAllFields() {
    let isValid = true;

    // Validate company information fields
    //isValid &= validateField('startDate', 'startDateGroup', 'startDateErrorTxt', 'This field is required', dateValidator);
    isValid &= validateField('companyName', 'companyNameGroup', 'companyNameErrorTxt', 'This field is required');
    isValid &= validateField('abn', 'abnGroup', 'abnErrorTxt', 'This field is required', abnValidator);
    //isValid &= validateField('phone', 'phoneGroup', 'phoneErrorTxt', 'This field is required', phoneNumberValidator);
    //  isValid &= validateField('fax', 'faxGroup', 'faxErrorTxt', 'This field is required', phoneNumberValidator); 
    //isValid &= validateField('numEmployees', 'numEmployeesGroup', 'numEmployeesErrorTxt', 'This field is required');
   // isValid &= validateField('numRadiologists', 'numRadiologistsGroup', 'numRadiologistsErrorTxt', 'This field is required');

    // Validate director/owner details fields
    isValid &= validateField('directorFirstName', 'directorFirstNameGroup', 'directorFirstNameError', 'First name is required');
    isValid &= validateField('directorLastName', 'directorLastNameGroup', 'directorLastNameError', 'Last name is required');
    //isValid &= validateField('directorPhone', 'directorPhoneGroup', 'directorPhoneError', 'Phone number is required', phoneNumberValidator);
    //isValid &= validateField('directorEmail', 'directorEmailGroup', 'directorEmailError', 'A valid email is required', emailValidator);

    // Validate primary radiologist details fields
    //validateField('radiologistFirstName', 'radiologistFirstNameGroup', 'radiologistFirstNameError', 'First name is required'),
    //validateField('radiologistLastName', 'radiologistLastNameGroup', 'radiologistLastNameError', 'Last name is required'),
    //validateField('radiologistPhone', 'radiologistPhoneGroup', 'radiologistPhoneError', 'Phone number is required', phoneNumberValidator),
    //validateField('radiologistEmail', 'radiologistEmailGroup', 'radiologistEmailError', 'Email is required', emailValidator),
    //validateField('providerNumber', 'providerNumberGroup', 'providerNumberError', 'Provider number is required', providerNumberValidator),
    //validateField('credentials', 'credentialsGroup', 'credentialsError', 'Credentials are required')

    // Validate site details fields
    //isValid &= validateField('site1-clinicName', 'site1-clinicNameGroup', 'site1-clinicNameError', 'Site name is required');
    //isValid &= validateField('site1-address', 'site1-addressGroup', 'site1-addressError', 'Address is required');
    //isValid &= validateField('site1-phone', 'site1-phoneGroup', 'site1-phoneError', 'Phone number is required', phoneNumberValidator);
    // validateField('site1-fax', 'site1-faxGroup', 'site1-faxError', 'Fax number is required'),
    isValid &= validateField('site1-lspn', 'site1-lspnGroup', 'site1-lspnError', 'LSPN is required', lspnValidator);


    // Add validations for credit card details in validateAllFields function
    isValid &= validateField('cardNumber', 'cardNumberGroup', 'cardNumberError', 'This field is required', cardNumberValidator);
    isValid &= validateField('cardExpiry', 'cardExpiryGroup', 'cardExpiryError', 'This field is required', cardExpiryValidator);
    isValid &= validateField('cardCVC', 'cardCVCGroup', 'cardCVCError', 'This field is required', cvvValidator);

    // Validate the checkbox for terms and conditions acceptance
    isValid &= validateCheckbox('terms', 'termsGroup', 'termsError', 'You must accept the Terms & Conditions and Privacy Policy');


    return isValid;



}

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('processPayment');

    // Call the validateAllFields function in the submitButton event listener
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default button click behavior

        if (validateAllFields()) {
            let formData = getAllFormData();
            console.log(formData);

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
                    window.location.href = 'sign-up-completed.html';
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Display an error message to the user
                    document.getElementById('error-message').textContent = "Sorry, there was a problem submitting your form. Please try again.";
                });

        } else {
            const errorElement = document.getElementById('mainErrorTxt');
            errorElement.textContent = 'Please fill out all required fields';
        }
    });
});

window.onload = function () {



    const urlParams = new URLSearchParams(window.location.search);
    let price = urlParams.get('price'); // Remove the dollar sign for calculations
    const interval = urlParams.get('billed'); // 'monthly' or 'annually'
    const plan = urlParams.get('plan');

    // Get the paragraph element by ID
    const pricingDetail = document.getElementById('pricingDetail');

    if (price && interval && plan) {
        price = price.replace(/\$/g, ''); // Remove the dollar sign for calculations
        const priceAsNumber = parseFloat(price); // Convert the string price to a number
        let displayedPrice = priceAsNumber;
        let billingCycleText = 'monthly';
        let intervalText = 'month';

        if (interval === 'annual') {
            displayedPrice = priceAsNumber * 12; // Calculate the annual charge
            billingCycleText = 'yearly';
            intervalText = 'year';
        }

        // Format the displayedPrice as currency, removing decimals if .00
        const formattedPrice = new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 0, // This will remove .00 but keep other decimals like .50
            maximumFractionDigits: 2 // Maximum of 2 decimal places
        }).format(displayedPrice);

        // Update the entire content of the paragraph
        pricingDetail.innerHTML = `<strong>${formattedPrice} / <span>${intervalText}</span></strong>
        Starting today, a ${billingCycleText} charge of ${formattedPrice} will be applied to your account.
        <span>The initial payment will be processed immediately.</span>`;
    } else {
        const mainSection = document.getElementById('main-section');
        mainSection.innerHTML = '<p>Error: Missing parameters in the URL</p>';
    }


};