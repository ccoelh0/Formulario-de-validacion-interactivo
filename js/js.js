//CONSTANTES
const tarjeta = document.querySelector("#tarjeta");
const btnAbrirFormulario = document.querySelector("#btn-abrir-formulario");
const formulario = document.querySelector("#formulario-tarjeta");
const numeroTarjeta = document.querySelector("#tarjeta .numero");
const nombreTarjeta = document.querySelector("#tarjeta .nombre");
const logoMarca = document.querySelector("#logo-marca");
const firma = document.querySelector("#tarjeta .firma p");
const mesExpiracion = document.querySelector("#tarjeta #expiracion .mes");
const yearExpiracion = document.querySelector("#tarjeta #expiracion .year");
const ccv = document.querySelector("#tarjeta .ccv");

//volteamos la tarjeta para mostrar el frente
const mostrarFrente = () => {
  //si tiene la clase active la removemos, entonces vuelve a donde tamos escribiendo
  if (tarjeta.classList.contains("active")) {
    tarjeta.classList.remove("active");
  }
};

//funcion que rota la tarjeta
tarjeta.addEventListener("click", () => {
  //toggle sirve para que si tiene la clase active se la quite, y sino se la ponga
  tarjeta.classList.toggle("active");
});

//funcion que gira el boton y abre el form
btnAbrirFormulario.addEventListener("click", () => {
  btnAbrirFormulario.classList.toggle("active");
  formulario.classList.toggle("active");
});

//funcion para que aparezcan los 12 meses en el option

for (let i = 1; i <= 12; i++) {
  let opcion = document.createElement("option");
  //aca creo las 12 opciones
  opcion.value = i;
  opcion.innerText = i;
  //para colocar los options en el html llamo a la const formulario y digo de esa constante anda a donde alla el ID selectMes (se puede poner el id luego del constante)
  formulario.selectMes.appendChild(opcion);
}

//funcion para que aparezcan los anos
//date: Permite trabajar con fechas y horas
//El método getFullYear() devuelve el año actual.
const yearActual = new Date().getFullYear();

for (let i = yearActual; i <= yearActual + 8; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectYear.appendChild(opcion);
}

//VALIDACION DE LA TARJETA

//input numero de tajeta

//se le agrega un evento al ID de que cuando el usuario suelte la tecla a a cambiar en el valor en la tarjeta
formulario.inputNumero.addEventListener("keyup", (e) => {
  //target = referencia al objeto del cual se lanzo el evento
  let valorInput = e.target.value;

  //ahora se guarda el valor del input en el input pero para que en lo ingresado no haya errores, por eso se usa replace y voy a usar expresiones regulares
  formulario.inputNumero.value = valorInput

    // selecciona espaciados = (/\s/g) -> lo vamos a reemplazar por nada
    .replace(/\s/g, "")

    //selecciona las letras
    .replace(/\D/g, "")

    //ponemos espacio cada 4 numeros -> ahora le estoy diciendo que me agrupe los numeros del 0 al 9 y que cada 4 caracteres me los agrupe -> luego con la coma le digo que cada 4 numeros agregue un espaciado
    .replace(/([0-9]{4})/g, "$1 ")

    //ahora se elimina el ultimo espaciado, si es que lo tiene
    .trim();

  //ahora para cambiar el valor dentro de la tarjeta
  numeroTarjeta.textContent = valorInput;

  if (valorInput === "") {
    numeroTarjeta.textContent = "#### #### #### ####";

    //condicional para que si el usuario pone un cuatro o cinco y luego lo borra no quede el logo
    logoMarca.innerHTML = "";
  }

  //logo mastercard o visa
  //si la posicion [0] es =...
  if (valorInput[0] == 4) {
    //este primer innner es para que no aparezca varias veces la img cuando escribimos = lo que hace es que cada vez que se ejecuta esta funcion elimine el contenido que hay adentro
    logoMarca.innerHTML = "";
    const imagen = document.createElement("img");
    imagen.src = "img/logos/visa.png";
    logoMarca.appendChild(imagen);
  } else if (valorInput[0] == 5) {
    logoMarca.innerHTML = "";
    const imagen = document.createElement("img");
    imagen.src = "img/logos/mastercard.png";
    logoMarca.appendChild(imagen);
  }

  //voltear la tarjeta para que el usuario vea el frente mientras escribe
  mostrarFrente();
});

//input nombre de la tarjeta

formulario.inputNombre.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  //expresion regular para que si hay numeros me los quite
  formulario.inputNombre.value = valorInput.replace(/[0-9]/, "");
  nombreTarjeta.textContent = valorInput;
  firma.textContent = valorInput;

  if (valorInput == "") {
    nombreTarjeta.textContent = "John Doe";
  }

  mostrarFrente();
});

//validacion del mes

formulario.selectMes.addEventListener("change", (e) => {
  mesExpiracion.textContent = e.target.value;
  mostrarFrente();
});

//validacion del year

formulario.selectYear.addEventListener("change", (e) => {
  yearExpiracion.textContent = e.target.value.slice(2); //slice te devuelve una parte del array, entonces a ponerle 2 me esta devolviendo las ultimas dos partes del array
  mostrarFrente();
});

//validacion del CCV

formulario.inputCCV.addEventListener("keyup", (e) => {
  if (!tarjeta.classList.contains("active")) {
    tarjeta.classList.toggle("active");
  }

  formulario.inputCCV.value = formulario.inputCCV.value
    //elimina espacios
    .replace(/\s/g, "")
    //elimina las letras
    .replace(/\D/g, "");

  ccv.textContent = formulario.inputCCV.value;
});
