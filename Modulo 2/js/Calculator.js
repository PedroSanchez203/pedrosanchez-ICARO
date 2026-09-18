export class Calculator {
  constructor() {
    this.display = document.getElementById("calcDisplay");
    this.operacionActual = "";
    this.operacionPrevia = "";
    this.operacion = null;

    this.iniciarBotones();
  }

  iniciarBotones() {
    const botones = document.querySelectorAll(".calc-btn");
    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        const tipo = boton.dataset.tipo;
        const valor = boton.dataset.valor;

        if (tipo === "numero") {
          this.agregarNumero(valor);
        } else if (tipo === "operador") {
          this.seleccionarOperacion(valor);
        } else if (tipo === "igual") {
          this.calcular();
        } else if (tipo === "limpiar") {
          this.limpiar();
        } else if (tipo === "borrar") {
          this.borrarUltimo();
        }

        this.actualizarDisplay();
      });
    });
  }

  agregarNumero(numero) {
    if (numero === "." && this.operacionActual.includes(".")) return;
    if (this.operacionActual === "0" && numero !== ".") {
      this.operacionActual = numero;
    } else {
      this.operacionActual += numero;
    }
  }

  seleccionarOperacion(operador) {
    if (this.operacionActual === "" && this.operacionPrevia === "") return;

    if (this.operacionActual === "" && this.operacionPrevia !== "") {
      this.operacion = operador;
      return;
    }

    if (this.operacionPrevia !== "") {
      this.calcular();
    }

    this.operacion = operador;
    this.operacionPrevia = this.operacionActual;
    this.operacionActual = "";
  }

  calcular() {
    const anterior = parseFloat(this.operacionPrevia);
    const actual = parseFloat(this.operacionActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    let resultado = 0;

    switch (this.operacion) {
      case "+":
        resultado = anterior + actual;
        break;
      case "-":
        resultado = anterior - actual;
        break;
      case "*":
        resultado = anterior * actual;
        break;
      case "/":
        if (actual === 0) {
          alert("No es posible dividir por cero");
          this.limpiar();
          return;
        }
        resultado = anterior / actual;
        break;
      default:
        return;
    }

    this.operacionActual = String(Math.round(resultado * 1000000) / 1000000);
    this.operacion = null;
    this.operacionPrevia = "";
  }

  borrarUltimo() {
    this.operacionActual = this.operacionActual.slice(0, -1);
  }

  limpiar() {
    this.operacionActual = "";
    this.operacionPrevia = "";
    this.operacion = null;
  }

  actualizarDisplay() {
    if (this.operacionActual === "") {
      this.display.value = this.operacionPrevia
        ? `${this.operacionPrevia} ${this.operacion}`
        : "0";
    } else {
      this.display.value = this.operacionActual;
    }
  }
}
