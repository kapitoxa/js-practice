let money = prompt("Ваш буюжет на месяц");

let time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {};
appData.money = money;
appData.timeData = time;
appData.expenses = {};
appData.optionalExpenses = {};
appData.income = [];
appData.savings = false;

let answer1 = prompt("Введите обязательную статью расходов в этом месяце");
let answer2 = prompt("Во сколько обойдется?");

appData.expenses[answer1] = answer2;

console.log(appData);

alert("Бюджет на 1 день: " + appData.money / 30);