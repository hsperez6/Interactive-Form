/*** BASIC INFO ***
 * Making the "name" <input> the focus when page is loaded.
 * Hiding the "Other job role?" <input> and only displaying if "Other" <option> 
   is selected from the "Job Role" dropdown menu.
 */
const name = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role')
const jobTitle = document.querySelector('#title');

name.focus();
otherJobRole.style.display = 'none';

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    };
});

/*** T-SHIRT INFO ***
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
    const dataPuns = document.querySelectorAll('[data-theme="js puns"]');
    const dataHeart = document.querySelectorAll('[data-theme="heart js"]');
    if(value === 'js puns') {
        color.value = "cornflowerblue";
        for(let i=0; i<dataHeart.length;i++) {
            dataHeart[i].hidden = true;
            dataPuns[i].hidden = false;
        }
    } else if (value === 'heart js') {
        color.value = "tomato";
        for(let i=0; i<dataPuns.length;i++) {
            dataPuns[i].hidden = true;
            dataHeart[i].hidden = false;
        }
    }
});

/***REGISTER FOR ACTIVITIES***
 * The totalcost displayed is updated according to how many workshop checkboxes the 
   user selects. 
 */
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
 * Disables selecting conflicting Workshops in the "Register for Activities" section
 */
document.querySelector('#activities-box').addEventListener('change', e => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    
    for(let i=0;i<checkboxes.length;i++){
      const checkboxType = checkboxes[i].getAttribute('data-day-and-time');
      if(clickedType === checkboxType && clicked !== checkboxes[i]) {
        if (clicked.checked) {
          checkboxes[i].disabled = true;
          checkboxes[i].parentElement.classList.add('disabled')
  
        } else {
          checkboxes[i].disabled = false;
          checkboxes[i].parentElement.classList.remove('disabled')
  
        };
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

/*** PAYMENT INFO ***
 * Makes the "Credit Card" option the default display option when 
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



/*** FORM VALIDATION ***\}"
 * "
 * Variables used in form validation
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
 * VALIDATING FUNCTIONS for validating each of the required fields
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
 * NAME AND EMAIL "BLUR" VALIDATOR
 * Both the name input and the email input get validated instantly via a "blur" 
   eventListener.
 * In the name input, if the input field is left blank or if no letters are detected, an 
   error message will display.
 */
name.addEventListener('keyup', e => {
    if (name.value.length === 0) {
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        name.parentElement.lastElementChild.style.display = 'block';
    } else {
        name.parentElement.classList.add('valid');
        name.parentElement.classList.remove('not-valid');
        name.parentElement.lastElementChild.style.display = 'none';
        nameValidator();
        if(!nameValidator()) {
            e.preventDefault();
            name.parentElement.classList.add('not-valid');
            name.parentElement.classList.remove('valid');
            name.parentElement.lastElementChild.style.display = 'block';
        } else {
            name.parentElement.classList.add('valid');
            name.parentElement.classList.remove('not-valid');
            name.parentElement.lastElementChild.style.display = 'none';
        };
    };  
});

/**
 * EMAIL VALIDATOR
 * The email field in this form has its own separate validator which listens for a
   "keyup" event, thus validating the input immediately as the user types
 * First, a message is saved to a "emailReminder" variable to display if the email
   input field is left blank. Then, it is inserted as the last child of the parent
   element "label". Lastly, it is hidden by applying ".style.display = 'none';"
 * Once the "keyup" is detected by the eventListener, the validator will test whether 
   the input field is left blank. 
     * If input field is left blank, the callback function will change the display 
       value of the inserted "emailReminder" to "block", the second-to-last child 
       of the label element ("Email address must be formatted correctly" message) 
       to "none", and change the parentElement's classList to "not-valid"
     * If the input field is not blank, the callback function will remove the 
       "not-valid" class from the parentElement (label) and hide the "emailReminder"
       message
 * Next, the eventlistener tests whether the email format is valid using the 
   "emailValidator" function. /
     * If the email validation fails, the parentElement gets the "not-valid" class added
       and the "valid" class removed. Also, the second-to-last child of the parent "label"
       element gets displayed ("Email address must be formatted correctly" message).
     * If the email validation passes, the the parentElement gets the "valid" class added
       and the "not-valid" class removed, and the second-to-last child element gets hidden.
 */
const emailReminder = 'Email address is required';

email.parentElement.insertAdjacentHTML(
    'beforeend',
    `<p>${emailReminder}</p>`  
);

email.parentElement.lastElementChild.style.display = 'none';

email.addEventListener('keyup', e => {
    if (email.value.length === 0) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.lastElementChild.style.display = 'block';
        email.parentElement.lastElementChild.previousElementSibling.style.display = 'none';
    } else {
        email.parentElement.classList.remove('not-valid');
        email.parentElement.lastElementChild.style.display = 'none';
        emailValidator();
        if(!emailValidator()) {
            e.preventDefault();
            email.parentElement.classList.add('not-valid');
            email.parentElement.classList.remove('valid');
            email.parentElement.lastElementChild.previousElementSibling.style.display = 'block';
        } else {
            email.parentElement.classList.add('valid');
            email.parentElement.classList.remove('not-valid');
            email.parentElement.lastElementChild.previousElementSibling.style.display = 'none';
        };
    };  
});

/**
 * FORM SUBMIT VALIDATION
 * The form listens for the submit event and calls each of the remaining validation functions
   and either calls the "validationFail()" function, or the "validationPass()" function with
   each field.
   "activitiesValidator()" gets personalized attention because the changes in styling apply 
   to the "#activities" element itself, and not its parentElement.
 */
form.addEventListener('submit', e => {
    
    nameValidator();
    if(!nameValidator()) {
        e.preventDefault();
        validationFail(name);
    } else {
        validationPass(name);
    };

    if (email.value.length === 0) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.lastElementChild.style.display = 'block';
        email.parentElement.lastElementChild.previousElementSibling.style.display = 'none';
    } else {
        email.parentElement.classList.remove('not-valid');
        email.parentElement.lastElementChild.style.display = 'none';
        emailValidator();
        if(!emailValidator()) {
            e.preventDefault();
            email.parentElement.classList.add('not-valid');
            email.parentElement.classList.remove('valid');
            email.parentElement.lastElementChild.previousElementSibling.style.display = 'block';
        } else {
            email.parentElement.classList.add('valid');
            email.parentElement.classList.remove('not-valid');
            email.parentElement.lastElementChild.previousElementSibling.style.display = 'none';
        };
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

