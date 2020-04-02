'use strict';
let startBtn = document.getElementById("start");
let budgetValue = document.getElementsByClassName("budget-value")[0];
let daybudgetValue = document.getElementsByClassName("daybudget-value")[0];
let levelValue = document.getElementsByClassName("level-value")[0];
let expensesValue = document.getElementsByClassName("expenses-value")[0];
let optionalexpensesValue = document.getElementsByClassName("optionalexpenses-value")[0];
let incomeValue = document.getElementsByClassName("income-value")[0];
let monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0];
let yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0];
let inputs = document.getElementsByClassName("expenses-item");
let expensesItemBtn = document.getElementsByTagName("button")[0];
let optionalexpensesBtn = document.getElementsByTagName("button")[1];
let countBudgetBtn = document.getElementsByTagName("button")[2];
let optionalexpensesItems = document.querySelectorAll(".optionalexpenses-item");
let chooseIncome = document.querySelector(".choose-income");
let savings = document.querySelector("#savings");
let chooseSum = document.querySelector(".choose-sum");
let choosePercent = document.querySelector(".choose-percent");
let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value");

let money;
let time;

function start() {
    money = +prompt("Ваш буюжет на месяц", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш буюжет на месяц", "");
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Бюджет на 1 день: " + appData.moneyPerDay);
    },
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let answer1 = prompt("Введите обязательную статью расходов в этом месяце", "");
            let answer2 = prompt("Во сколько обойдется?", "");
        
            if (typeof(answer1) === 'string' && answer1 != "" && answer2 != "" && 
                answer1.length < 50) {
                appData.expenses[answer1] = answer2;
            } else {
                i--;
            }
        }
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Что-то пошло не так");
        }
    },
    checkSavings: function() {
        if (appData.savings) {
            let save = +prompt("Какова сумма накоплений?", "");
            let percent = +prompt("Под какой процент?", "");
    
            appData.monthIncome = save / 100 / 12 * percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let answer = prompt("Статья необязательных расходов?", "");
            appData.optionalExpenses[i] = answer;
        }
    },
    chooseIncome: function() {
       
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if (typeof items === "string" && items != null && items.length > 0) {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?", ""));
            appData.income.sort();
            
            appData.income.forEach(function(value, index) {
                console.log("Способы доп. заработка: " + (index + 1) + " - " + value);
            });
        }    
    }
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " = " + appData[key]);
}