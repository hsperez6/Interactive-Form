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
    }
});