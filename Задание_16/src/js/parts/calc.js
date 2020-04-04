function calc() {
    'use strict';
    
    let persons = document.querySelectorAll('.counter-block-input')[0];
    let restDays = document.querySelectorAll('.counter-block-input')[1];
    let place = document.getElementById('select');
    let totalValue = document.getElementById('total');
    let personsSum = 0;
    let daysSum = 0;
    let total = 0;

    totalValue.textContent = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = daysSum * personsSum * 4000;

        if (restDays.value == '') {
            totalValue.textContent = '0';
        } else {
            totalValue.textContent = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = daysSum * personsSum * 4000;

        if (persons.value == '') {
            totalValue.textContent = '0';
        } else {
            totalValue.textContent = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.textContent = '0';
        } else {
            let intermResult = total;
            totalValue.textContent = intermResult * this.options[this.selectedIndex].value;
        }
    });
}

module.exports = calc;