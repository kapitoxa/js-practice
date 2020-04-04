function timer() {
    'use strict';
    
    let deadline = '2020-04-30';

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
}

module.exports = timer;