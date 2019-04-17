'use strict';

let money;
let time;

function start() {
    money = +prompt("Ваш буюжет на месяц");
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш буюжет на месяц");
    }
}

start();

let appData = {};
appData.budget = money;
appData.timeData = time;
appData.expenses = {};
appData.optionalExpenses = {};
appData.income = [];
appData.savings = true;

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert("Бюджет на 1 день: " + appData.moneyPerDay);
}

detectDayBudget();

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let answer1 = prompt("Введите обязательную статью расходов в этом месяце");
        let answer2 = prompt("Во сколько обойдется?");
    
        if (typeof(answer1) === 'string' && answer1 != "" && answer2 != "" && 
            answer1.length < 50) {
            appData.expenses[answer1] = answer2;
        } else {
            i--;
        }
    }
}

chooseExpenses();

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Что-то пошло не так");
    }
}

detectLevel();

function checkSavings() {
    if (appData.savings) {
        let save = +prompt("Какова сумма накоплений?");
        let percent = +prompt("Под какой процент?");

        appData.monthIncome = save / 100 / 12 * percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
}

checkSavings();

function chooseOptExpenses() {
    for (let i = 1; i < 4; i++) {
        let answer = prompt("Статья необязательных расходов?");
        appData.optionalExpenses[i] = answer;
    }
}

chooseOptExpenses();