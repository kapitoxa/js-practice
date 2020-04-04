function modal() {
    'use strict';

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
}

module.exports = modal;