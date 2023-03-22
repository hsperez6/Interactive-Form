const name = document.querySelector('#name');
name.focus();

const otherJobRole = document.querySelector('#other-job-role')
otherJobRole.style.display = 'none';

const jobTitle = document.querySelector('#title');

jobTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    };
});


const design = document.querySelector('#design');
const color = document.querySelector('#color');
color.disabled = true;

const dataPuns = document.querySelectorAll('[data-theme="js puns"]')
const dataHeart = document.querySelectorAll('[data-theme="heart js"]')

design.addEventListener('change', (e) => {
    color.disabled = false;
    const value = e.target.value;
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




