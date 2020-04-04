function form() {
    'use strict';
    
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let mainForm = document.querySelector('.main-form');
    let statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendFormHandler() {
        let inputs = this.getElementsByTagName('input');
        this.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(this);
        let data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        let jsonData = JSON.stringify(data);
        request.send(jsonData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;

                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    }

    mainForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let send = sendFormHandler.bind(this);
        send();
    });

    let contactForm = document.getElementById('form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let send = sendFormHandler.bind(this);
        send();
    });
}

module.exports = form;