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
let expensesItems = document.getElementsByClassName("expenses-item");
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

expensesItemBtn.disabled = true;
optionalexpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

startBtn.addEventListener("click", function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш буджет на месяц", "");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш буджет на месяц", "");
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    
    let date = new Date(Date.parse(time));
    yearValue.value = date.getFullYear();
    monthValue.value = date.getMonth() + 1;
    dayValue.value = date.getDate();

    expensesItemBtn.disabled = false;
    optionalexpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
});

expensesItemBtn.addEventListener("click", function() {
    let sum = 0;

    for (let i = 0; i < expensesItems.length; i++) {
        let answer1 = expensesItems[i].value;
        let answer2 = expensesItems[++i].value;
    
        if (typeof(answer1) === "string" && answer1 != "" && answer2 != "" && 
            answer1.length < 50) {
            appData.expenses[answer1] = answer2;
            sum += +answer2;
        } else {
            i--;
        }
    }

    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener("click", function() {
    for (let i = 0; i < optionalexpensesItems.length; i++) {
        let answer = optionalexpensesItems[i];
        appData.optionalExpenses[i] = answer.value;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

countBudgetBtn.addEventListener("click", function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Что-то пошло не так";
        }
    } else {
        daybudgetValue.textContent = "Что-то пошло не так";
    }
});

chooseIncome.addEventListener("input", function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

savings.addEventListener("click", function() {
    appData.savings = !appData.savings;

    if (appData.savings) {
        calculateSavings();
    } else {
        monthsavingsValue.textContent = "";
        yearsavingsValue.textContent = "";
    }
});

chooseSum.addEventListener("input", calculateSavings);
choosePercent.addEventListener("input", calculateSavings);

function calculateSavings() {
    if (appData.savings) {
        let sum = +chooseSum.value;
        let percent = +choosePercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
}

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};