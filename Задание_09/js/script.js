window.addEventListener("DOMContentLoaded", function() {
    'use strict';

    let tabs = document.querySelectorAll(".info-header-tab");
    let infoHeader = document.querySelector(".info-header");
    let tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(fromTab) {
        for (let i = fromTab; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(tabIndex) {
        if (tabContent[tabIndex].classList.contains("hide")) {
            tabContent[tabIndex].classList.remove("hide");
            tabContent[tabIndex].classList.add("show");
        }
    }

    infoHeader.addEventListener("click", function(event) {
        let target = event.target;

        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
});
