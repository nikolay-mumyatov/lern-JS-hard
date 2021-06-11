"use strict";

// Получаем элементы
let calcButton = document.getElementById("start"), // Кнопка "рассчитать"
  plusIncome = document.getElementsByTagName("button")[0], // Плюс доходы
  plusExpenses = document.getElementsByTagName("button")[1], // Плюс расходы
  depositCheck = document.querySelector("#deposit-check"), // Чекбокс депозит
  addIncomeItem = document.querySelectorAll(".additional_income-item"), // Возможный доход инпуты ввода
  elemBudgetMonth = document.getElementsByClassName("budget_month-value")[0], // Доходы за месяц
  elemBudgetDay = document.getElementsByClassName("budget_day-value")[0], //  Дневной бюджет
  elemExpensesMonth = document.getElementsByClassName(
    "expenses_month-value"
  )[0], // Расходы за месяц
  elemAddIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0], // Ввод возможных доходов
  elemAddExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0], // ВВод возможных расходов
  elemPeriodValue = document.getElementsByClassName("income_period-value")[0], // Накопления за период
  elemMissionValue = document.getElementsByClassName("target_month-value")[0], // Срок достижения цели в месяцах
  elemMoney = document.querySelector(".salary-amount"), // Месячный доход
  elemIncomeTitle = document.querySelector(".income-title"), // Название доп дохода
  incomeItems = document.querySelectorAll(".income-items"), // Сумма доп дохода
  elemExpensesTitle = document.querySelector("input.expenses-title"), // Обязательные расходы
  expensesItems = document.querySelectorAll(".expenses-items"), // Сумма обяз. расходов
  elemAddExpensesItem = document.querySelector(".additional_expenses-item"), // Возможные расходы, список
  elemMission = document.querySelector(".target-amount"), // Цель накопить
  elemRange = document.querySelector(".period-select"), // Ползунок - период расчета
  periodAmount = document.querySelector(".period-amount"), // Число под ползунком
  cancel = document.querySelector("#cancel"); // Кнопка Сбросить

// Функция проверяет входящие данные на число.
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    // Проверка money на число, если введенные данные не число, то вопрос повторяется.
    if (elemMoney.value === "" || elemMoney.value === null) {
      alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
      return;
    } else if (!isNumber(elemMoney.value)) {
      alert('Ошибка! Поле "Месячный доход" должно быть заполнено числом!');
      return;
    }
    this.budget = +elemMoney.value;

    let inputText = document.querySelectorAll("input[type=text]");
    inputText.forEach(function (item) {
      item.setAttribute("readonly", "readonly");
    });
    calcButton.style.display = "none";
    cancel.style.display = "block";

    this.getExpenses();
    this.getIncome();

    // Функция возвращает сумму всех обязательных расходов за месяц
    this.getExpensesMonth();
    // Функция возвращает сумму всех дополнительных доходов за месяц
    this.getIncomeMonth();
    // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления и возвращает результат
    //     appData.getTargetMonth();
    // Определяем уровень дохода
    //     appData.getStatusIncome();
    // Получаем информацию о депозите
    //     appData.getInfoDeposit();
    // Сколько сможет накопить клиент исходя из доходов за выбраный период
    //     appData.calcSavedMoney();
    this.getAddIncome();
    this.getAddExpenses();
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    this.getBudget();

    this.showResult();
  },
  reset: function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    elemRange.value = 0;
    periodAmount.innerHTML = 1;

    // Сброс полей Дополнительных доход
    const resetBlockIncome = function () {
      if (incomeItems.length === 2) {
        incomeItems[1].remove();
        plusIncome.style.display = "block";
      } else if (incomeItems.length === 3) {
        incomeItems[1].remove();
        incomeItems[2].remove();
        plusIncome.style.display = "block";
      } else {
        return;
      }
    };
    resetBlockIncome();

    // Сброс полей Обязательный расход
    const resetBlockExpenses = function () {
      if (expensesItems.length === 2) {
        expensesItems[1].remove();
        plusExpenses.style.display = "block";
      } else if (expensesItems.length === 3) {
        expensesItems[1].remove();
        expensesItems[2].remove();
        plusExpenses.style.display = "block";
      } else {
        return;
      }
    };
    resetBlockExpenses();
  },
  // Показать результат в поле справа
  showResult: function () {
    elemBudgetMonth.value = this.budgetMonth;
    elemBudgetDay.value = this.budgetDay;
    elemExpensesMonth.value = this.expensesMonth;
    elemAddExpensesValue.value = this.addExpenses.join(", ");
    elemAddIncomeValue.value = this.addIncome.join(", ");
    elemMissionValue.value = this.getTargetMonth();
    elemPeriodValue.value = this.calcSavedMoney();

    elemRange.addEventListener("input", function () {
      elemPeriodValue.value = appData.calcSavedMoney();
    });
  },
  // Добавить пункты в Обязательные расходы
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll(".expenses-items");

    // Обнуляем значение в новых инпутах
    if (expensesItems.length === 2) {
      let itemsInput = expensesItems[1].querySelectorAll("input[type=text]");
      itemsInput.forEach(function (element) {
        element.value = "";
      });
    } else if (expensesItems.length === 3) {
      let itemsInput = expensesItems[2].querySelectorAll("input[type=text]");
      itemsInput.forEach(function (element) {
        element.value = "";
      });
    } else {
      return;
    }

    if (expensesItems.length === 3) {
      plusExpenses.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  // Добавить пункты в Дополнительные доходы
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll(".income-items");

    // Обнуляем значение в новых инпутах
    if (incomeItems.length === 2) {
      let itemsInput = incomeItems[1].querySelectorAll("input[type=text]");
      itemsInput.forEach(function (element) {
        element.value = "";
      });
    } else if (incomeItems.length === 3) {
      let itemsInput = incomeItems[2].querySelectorAll("input[type=text]");
      itemsInput.forEach(function (element) {
        element.value = "";
      });
    } else {
      return;
    }

    if (incomeItems.length === 3) {
      plusIncome.style.display = "none";
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = elemAddExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    addIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  // Функция возвращает сумму всех дополнительных доходов за месяц
  getIncomeMonth: function () {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  // Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  // Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },
  // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления и возвращает результат
  getTargetMonth: function () {
    return Math.ceil(elemMission.value / this.budgetMonth);
  },
  // Определяем уровень дохода
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1199) {
      console.log("У вас средний уровень дохода");
    } else if (appData.budgetDay <= 599 && appData.budgetDay >= 0) {
      console.log("К сожалению у вас уровень дохода ниже среднего");
    } else {
      console.log("Что то пошло не так");
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt(
          "Какой у вас годовой процент у депозита?",
          5
        );
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt("Какая сумма у вас вложена?", "100000");
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * elemRange.value;
  },
};

// События по кнопке Рассчитать
calcButton.addEventListener("click", function () {
  appData.start.bind(appData);
  appData.start();
});

plusExpenses.addEventListener("click", appData.addExpensesBlock);

plusIncome.addEventListener("click", appData.addIncomeBlock);

elemRange.addEventListener("input", function () {
  periodAmount.innerHTML = elemRange.value;
});

// События по кнопке сбросить
cancel.addEventListener("click", function () {
  appData.reset();
  let inputText = document.querySelectorAll("input[type=text]");
  inputText.forEach(function (item) {
    item.value = "";
    item.removeAttribute("readonly", "readonly");
  });

  cancel.style.display = "none";
  calcButton.style.display = "block";
});

// Проверка input на ввод символов
document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches('input[placeholder="Наименование"]')) {
    if (isNumber(target.value)) {
      alert('В наименовании могут быть только буквы!');
      target.value = '';
    }
  }
});

// Проверка input на ввод цыфр
document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches('input[placeholder="Сумма"]')) {
    if (!isNumber(target.value)) {
      alert("В наименовании могут быть только цыфры!");
      target.value = "";
    }
  }
});

// const inputCheckWord = function () {
//   const inputPlaceholderName = document.querySelectorAll(
//     'input[placeholder="Наименование"]'
//   );
//   console.log(inputPlaceholderName);
// };
// inputCheckWord();

// console.log("Наша программа включает в себя данные: ");
// for (let key in appData) {
//   console.log('Ключ: ' + key + ' -  Значение: ' + appData[key]);
// }
