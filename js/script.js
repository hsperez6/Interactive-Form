// Making the "name" <input> the focus when page is loaded.
 
const name = document.querySelector('#name');
name.focus();

// Hiding the "Other job role?" <input> and only displaying if "Other" 
// <option> is selected from the "Job Role" dropdown menu.
 
const otherJobRole = document.querySelector('#other-job-role')
const jobTitle = document.querySelector('#title');

otherJobRole.style.display = 'none';

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    };
});

/**
 * First, the "Color" dropdown menu is disabled until an option is 
   selected from the "Design" dropdown menu.
 * The available color options are limited depending on which design is 
   selected from the "Design" dropdown menu.
 */
const design = document.querySelector('#design');
const color = document.querySelector('#color');
color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false;
    const value = e.target.value;
    const dataPuns = document.querySelectorAll('[data-theme="js puns"]')
    const dataHeart = document.querySelectorAll('[data-theme="heart js"]')
    if(value === 'js puns') {
        for(let i=0; i<dataHeart.length;i++) {
            dataHeart[i].hidden = true;
            dataPuns[i].hidden = false;
        }
    } else if (value === 'heart js') {
        for(let i=0; i<dataPuns.length;i++) {
            dataPuns[i].hidden = true;
            dataHeart[i].hidden = false;
        }
    }
});

//The totalcost displayed is updated according to how many workshop checkboxes the 
//user selects. 

const activities = document.querySelector('#activities');
const totalDisplay = document.querySelector('#activities-cost')
let totalCost = 0;

activities.addEventListener('change', e => {
    const dataCost = e.target.getAttribute('data-cost');
    const dataCostNum = +dataCost;
    if (e.target.checked) {
        totalCost += dataCostNum;
    } else {
        totalCost -= dataCostNum;
    };
    totalDisplay.innerHTML = `Total: $${totalCost}`
});

/**
 * Make the "Credit Card" option the default display option when 
   loading the page by removing the first option "Select payment method"
 * Since "Credit Card" option is default, "Expiration Date", "Expiration
   year", "Card Number", "Zip Code", and "CVV" are displayed.
 * `payment.addEventListener` listens for changes in the selection from
   the dropdown menu and the appropriate information is displayed. 
 */
const payment = document.querySelector('#payment');
payment.remove(0); 

const creditcard = document.querySelector('#credit-card');
const expirationBox = document.querySelector('.expiration-box');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

bitcoin.style.display = 'none';
paypal.style.display = 'none';

payment.addEventListener('change', e => {
    const value = e.target.value;
    
    if (value === 'credit-card') {
        creditcard.style.display = '';
        expirationBox.style.display = '';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';
    } else if (value === 'paypal') {
        creditcard.style.display = 'none';
        expirationBox.style.display = 'none';
        bitcoin.style.display = 'none';
        paypal.style.display = '';
    } else {
        creditcard.style.display = 'none';
        expirationBox.style.display = 'none';
        bitcoin.style.display = '';
        paypal.style.display = 'none';
    };
});



/** FORM VALIDATION
 * 
 */

const form = document.querySelector('form');
const email = document.querySelector('#email');
const ccNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvvNum = document.querySelector('#cvv');

/**
 * HELPER FUNCTIONS for updating Error Messages and styling
 */

function validationPass (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};

function validationFail (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

/**
 * VALIDATING FUNCTIONS for validating each of the validated fields
 */
function nameValidator() {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    return nameIsValid;
};

function emailValidator() {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    return emailIsValid;
};

function activitiesValidator() {
    const activitiesIsValid = totalCost > 0;
    return activitiesIsValid;
};

function ccNumValidator() {
    const cardNumberIsValid = /^\d{13,16}$/.test(ccNum.value);
    return cardNumberIsValid;
};

function zipCodeValidator() {
    const zipIsValid = /^\d{5}$/.test(zipCode.value);
    return zipIsValid;
};

function cvvValidator() {
    const cvvIsValid = /^\d{3}$/.test(cvvNum.value);
    return cvvIsValid;
};


/**
 * FORM VALIDATION EventListener
 */
form.addEventListener('submit', e => {
    
    nameValidator();
    if(!nameValidator()) {
        e.preventDefault();
        validationFail(name);
    } else {
        validationPass(name);
    };

    emailValidator();
    if(!emailValidator()) {
        e.preventDefault();
        validationFail(email);
    } else {
        validationPass(email);
    };

    activitiesValidator();
    if(!activitiesValidator()) {
        e.preventDefault();
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activities.lastElementChild.style.display = 'block';
    } else {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activities.lastElementChild.style.display = 'none';
    };

    if(payment.value === 'credit-card') {
        ccNumValidator();
        if(!ccNumValidator()) {
            e.preventDefault();
            validationFail(ccNum);
        } else {
            validationPass(ccNum);
        };
    };

    if(payment.value === 'credit-card') {
        zipCodeValidator();
        if(!zipCodeValidator()) {
            e.preventDefault();
            validationFail(zipCode);
        } else {
            validationPass(zipCode);
        };
    };

    if(payment.value === 'credit-card') {
        cvvValidator();
        if(!cvvValidator()) {
            e.preventDefault();
            validationFail(cvvNum);
        } else {
            validationPass(cvvNum);
        };
    };

});

/**
 * Updates styling to better visibility when navigating the activities field
 */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

for(let i=0; i<checkboxes.length; i++) {
    checkboxes[i].addEventListener('focus', (e) => {
        const label = checkboxes[i].parentElement;
        label.classList.add('focus') 
    });
    checkboxes[i].addEventListener('blur', (e) => {
        const label = checkboxes[i].parentElement;
        label.classList.remove('focus')
    });
};