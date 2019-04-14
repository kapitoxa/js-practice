let money = +prompt("Ваш буюжет на месяц");
let time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {};
appData.budget = money;
appData.timeData = time;
appData.expenses = {};
appData.optionalExpenses = {};
appData.income = [];
appData.savings = false;
appData.moneyPerDay = appData.budget / 30;

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

// let i = 0;

// while (i < 2) {
//     let answer1 = prompt("Введите обязательную статью расходов в этом месяце");
//     let answer2 = prompt("Во сколько обойдется?");

//     if (typeof(answer1) === 'string' && answer1 != "" && answer2 != "" && 
//         answer1.length < 50) {
//         appData.expenses[answer1] = answer2;
//         i++;
//     }
// }

// let i = 0;

// do {
//     let answer1 = prompt("Введите обязательную статью расходов в этом месяце");
//     let answer2 = prompt("Во сколько обойдется?");

//     if (typeof(answer1) === 'string' && answer1 != "" && answer2 != "" && 
//         answer1.length < 50) {
//         appData.expenses[answer1] = answer2;
//         i++;
//     }
// } while (i < 2);

alert("Бюджет на 1 день: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log("Средний уровень достатка");
} else if (appData.moneyPerDay > 2000) {
    console.log("Высокий уровень достатка");
} else {
    console.log("Что-то пошло не так");
}