window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tabs = document.querySelectorAll('.info-header-tab');
    let infoHeader = document.querySelector('.info-header');
    let tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(fromTab) {
        for (let i = fromTab; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(tabIndex) {
        if (tabContent[tabIndex].classList.contains('hide')) {
            tabContent[tabIndex].classList.remove('hide');
            tabContent[tabIndex].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadline = '2020-04-04';

    function getTimeRemainig(deadline) {
        let endtime = Date.parse(deadline);
        let diff = endtime - new Date().getTime();
        let seconds;
        let minutes;
        let hours;

        if (diff <= 0) {
            seconds = 0;
            minutes = 0;
            hours = 0;
        } else {
            seconds = Math.floor((diff / 1000) % 60);
            minutes = Math.floor((diff / 1000 / 60) % 60);
            hours = Math.floor((diff / (1000 * 60 * 60)));
        }

        return {
            'total' : diff,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(elementId, deadline) {
        let timer = document.getElementById(elementId);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let time = getTimeRemainig(deadline);

            function addLeadingZero(value) {
                if (value >= 10) {
                    return value;
                }
                
                return '0' + value;
            }

            hours.textContent = addLeadingZero(time.hours);
            minutes.textContent = addLeadingZero(time.minutes);
            seconds.textContent = addLeadingZero(time.seconds);        

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    let moreBtn = document.querySelector('.more');
    let overlay = document.querySelector('.overlay');
    let closeBtn = document.querySelector('.popup-close');

    function showOverlay() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    moreBtn.addEventListener('click', function() {
        let show = showOverlay.bind(this);
        show();
    });

    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        moreBtn.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let info = document.querySelector(".info");

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('description-btn')) {
            let show = showOverlay.bind(target);
            show();
        }
    });

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
});