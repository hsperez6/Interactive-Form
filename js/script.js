/**
 * Making the "name" input the focus when page is loaded.
 */
const name = document.querySelector('#name');
name.focus();

/**
 * Hiding the "Other job role?" input and only displaying if "Other" 
   option is selected from the "Job Role" dropdown menu.
 */
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

/**
 * The totalcost is updated according to how many workshop checkboxes
   the user selects. 
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


/**
 * Program the form element to listen for the submit event. When the form submission is 
   detected, each required form field or section should be validated, or checked to ensure 
   that they have been filled out correctly. If any of the following required fields is not 
   valid, the form’s submission should be prevented.
 * The "Name" field cannot be blank or empty.
 * The "Email Address" field must contain a validly formatted email address. The email address 
   does not need to be a real email address, just formatted like one. For example: 
   dave@teamtreehouse.com. A few characters for the username, followed by "@", followed by 
   a few more characters and a ".com" for the domain name. You don’t have to account for 
   other top-level domains, like .org, .net, etc.
 * The "Register for Activities" section must have at least one activity selected.
 * If and only if credit card is the selected payment method:
     * The "Card number" field must contain a 13 - 16 digit credit card number with no dashes 
       or spaces. The value does not need to be a real credit card number.
     * The "Zip code" field must contain a 5 digit number.
     * The "CVV" field must contain a 3 digit number.
 * Project Warm Up: For some experience with the techniques you’ll use in this section, 
   complete this short exercise - Form Input Validation.
 * Note:
     * Avoid using snippets, libraries or plugins.
     * Only validate the three credit card fields if "credit card" is the selected payment option.
     * Only call `preventDefault` on the `event` object if one or more of the required fields is 
       invalid.
 * Pro Tip:A recommended approach is to create helper functions for each of the required 
    fields to be validated. For example, for the "Name" field, a function could check the 
    "Name" field’s value. If it equals an empty string or only blank spaces, the function 
    could log out a helpful statement and return false. Otherwise it would return true. And 
    then in the `submit` event listener, you could call that helper function and check what 
    it returns: if it returns false, you would prevent the form from submitting. Otherwise, 
    you would avoid preventing form submission, and allow the `submit` handler to either 
    submit or move onto checking the next required field.
 */

const form = document.querySelector('form');
const email = document.querySelector('#email');

form.addEventListener('submit', e => {
    e.preventDefault();

    console.log(nameValidator());
    if(nameValidator() === false) {
        e.preventDefault();
    };

    console.log(emailValidator());
    if(emailValidator() === false) {
        e.preventDefault();
    };

    console.log(activitiesValidator());
    if(activitiesValidator() === false) {
        e.preventDefault();
    };

});

function nameValidator() {
    const nameValue = name.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
};

function emailValidator() {
    const emailValue = email.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
};

function activitiesValidator() {
    const activitiesIsValid = totalCost > 0;
    return activitiesIsValid;
};

/************************************************************************/

/***
 * I'm having trouble validating the credit card information. Specifically, I am trying to test the CC number, ZipCode, and CVV
 * only if the Credit Card option is selected from the Payment Info dropdown menu. I've tried logging out `payment.selectedIndex` to 
 * select the Credit Card option. However, every time I try using `.selectedIndex`, it always selects the Credit Card option 
 * regardless of which options is selected. Even when the paypal or bitcoin options are selected, the `selectedIndex` still logs
 * to Credit Card. 
 * I've also tried adding a `selected` attribute to the selected option using the `payment.addEventListener`. But for some reason,
 * when I log out the `payment.selectedIndex` that way, it works if I log it out within the EventListener. But if I try to log it
 * in the form submit listener, it displays undefined.
 * 
 */






/*
const ccOption = document.querySelector('[value="credit-card"]');
const paypalOption = document.querySelector('[value="paypal"]');
const bitcoinOption = document.querySelector('[value="bitcoin"]');

    paypalOption.setAttribute('selected', false);
    bitcoinOption.setAttribute('selected', false);
    ccOption.setAttribute('selected', 'selected');

    ccOption.selected = true;
    paypalOption.selected = false;
    bitcoinOption.selected = false;

    ccOption.selected = false;
    paypalOption.selected = true;
    bitcoinOption.selected = false;

    ccOption.selected = false;
    paypalOption.selected = false;
    bitcoinOption.selected = true;


const ccNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvvNum = document.querySelector('#cvv');

const selectedPaymentIndex = payment.selectedIndex;
console.log(selectedPaymentIndex);


if (selectedPaymentIndex === 1) {
    console.log(ccNumValidator());
    if(ccNumValidator() === false) {
        e.preventDefault();
    };
};
if (selectedPaymentOption == 'credit-card') {
    console.log(ccZipCodeValidator());
    if(ccZipCodeValidator() === false) {
        e.preventDefault();
    };
};

if (selectedPaymentOption == 'credit-card') {
    console.log(cvvValidator());
    if(cvvValidator() === false) {
        e.preventDefault();
    };
} else {
    return true;
};


function ccNumValidator() {
    const ccNumberValue = ccNum.value
    const cardNumberIsValid = /^\d{13,16}$/.test(ccNumberValue);
    return cardNumberIsValid;

};

function ccZipCodeValidator() {
    const zipValue = zipCode.value
    if (selectedPaymentOption === 'credit-card') {
        const zipIsValid = /^\d{5}$/.test(zipValue);
        return zipIsValid;
    };
};

function cvvValidator() {
    const cvvValue = cvvNum.value
    if (selectedPaymentOption === 'credit-card') {
        const cvvIsValid = /^\d{3}$/.test(cvvValue);
        return cvvIsValid;
    };
};
*/