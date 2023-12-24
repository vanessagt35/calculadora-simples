    // Selecionar os elementos do HTML
    const expression = document.querySelector(".expression");
    const result = document.querySelector(".result");
    const clear = document.querySelector("#clear");
    const divide = document.querySelector("#divide");
    const multiply = document.querySelector("#multiply");
    const subtract = document.querySelector("#subtract");
    const add = document.querySelector("#add");
    const equal = document.querySelector("#equal");
    const dot = document.querySelector("#dot");
    const numbers = document.querySelectorAll(".button-0, .button-1, .button-2, .button-3, .button-4, .button-5, .button-6, .button-7, .button-8, .button-9");

    // Criar variáveis para armazenar os valores e o operador
    let value1 = "";
    let value2 = "";
    let operator = "";

    // Criar uma função para limpar os valores e o operador
    function clearAll() {
      value1 = "";
      value2 = "";
      operator = "";
      expression.textContent = "";
      result.textContent = "0";
    }

    // Criar uma função para atualizar o display com os valores e o operador
    function updateDisplay() {
      expression.textContent = value1 + operator + value2;
      if (value1 && value2 && operator) {
        result.textContent = calculate();
      }
    }

    // Criar uma função para calcular o resultado da operação
    function calculate() {
      let num1 = parseFloat(value1);
      let num2 = parseFloat(value2);
      let res = 0;
      switch (operator) {
        case "+":
          res = num1 + num2;
          break;
        case "-":
          res = num1 - num2;
          break;
        case "*":
          res = num1 * num2;
          break;
        case "/":
          res = num1 / num2;
          break;
      }
      return res.toFixed(2);
    }

    // Criar uma função para mostrar o resultado e a sobra da divisão, se houver
    function showResult() {
      if (value1 && value2 && operator) {
        let res = calculate();
        let mod = parseFloat(value1) % parseFloat(value2);
        result.textContent = res;
        if (operator === "/" && mod !== 0) {
          result.textContent += " (sobra " + mod.toFixed(2) + ")";
        }
      }
    }

    // Adicionar um evento de clique para o botão de limpar
    clear.addEventListener("click", clearAll);

    // Adicionar um evento de clique para os botões de números
    numbers.forEach((number) => {
      number.addEventListener("click", () => {
        if (!operator) {
          value1 += number.textContent;
        } else {
          value2 += number.textContent;
        }
        updateDisplay();
      });
    });

    // Adicionar um evento de clique para o botão de ponto
    dot.addEventListener("click", () => {
      if (!operator) {
        if (!value1.includes(".")) {
          value1 += dot.textContent;
        }
      } else {
        if (!value2.includes(".")) {
          value2 += dot.textContent;
        }
      }
      updateDisplay();
    });

    // Adicionar um evento de clique para os botões de operadores
    [divide, multiply, subtract, add].forEach((op) => {
      op.addEventListener("click", () => {
        if (value1 && !operator) {
          operator = op.textContent;
          updateDisplay();
        }
      });
    });

    // Adicionar um evento de clique para o botão de igual
    equal.addEventListener("click", showResult);