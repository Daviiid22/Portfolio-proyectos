const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");

const filas = 20;
const columnas = 10;
const tamanoCelda = 30; 


let puntuacion = 0; // Variable para almacenar la puntuación del jugador
let intervalo; // Intervalo para controlar el avance del juego
let tiempoInicio = new Date(); // Tiempo de inicio del juego


const tablero = []; // Matriz bidimensional que representa el tablero
for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
        fila.push(0); // Cada celda comienza vacía (valor 0)
    }
    tablero.push(fila);
}

//Creacion de las piezas
const piezas = [
    { nombre: "C", forma: [[1, 1, 1], [1, 0, 1]], probabilidad: 0.2, color: "red" },
    { nombre: "U", forma: [[1, 0, 1], [1, 1, 1]], probabilidad: 0.2, color: "green" },
    { nombre: "O", forma: [[1, 1], [1, 1]], probabilidad: 0.2, color: "blue" },
    { nombre: "T", forma: [[1, 1, 1], [0, 1, 0]], probabilidad: 0.2, color: "yellow" },
    { nombre: "I", forma: [[1, 1, 1, 1]], probabilidad: 0.2, color: "orange" }
];


canvas.width = columnas * tamanoCelda; // Ancho del canvas basado en las columnas
canvas.height = filas * tamanoCelda; // Alto del canvas basado en las filas

// Función para iniciar el juego
function jugar() {
    puntuacion = 0; // Reinicia la puntuación
    actualizarPuntuacion();
    tiempoInicio = new Date(); // Reinicia el tiempo de inicio

    // Reinicia el tablero
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0;
        }
    }

    piezaActual = generarPieza();
    xActual = Math.floor(columnas / 2) * tamanoCelda;
    yActual = 0;

    dibujarTablero();

    // Configura el intervalo dinámico
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(actualizar, calcularIntervalo());
}


// Función para actualizar la puntuación
function actualizarPuntuacion() {
    const marcador = document.getElementById("puntuacion"); // Selecciona el marcador en el DOM
    marcador.textContent = `Puntuación: ${puntuacion}`; // Actualiza el texto con la puntuación actual
}


// Función para dibujar el tablero vacío
function dibujarTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const x = j * tamanoCelda;
            const y = i * tamanoCelda;

            // Establece el color dependiendo de si la celda está ocupada
            lienzo.fillStyle = tablero[i][j] === 1 ? "#ddd" : "#000";
            lienzo.fillRect(x, y, tamanoCelda, tamanoCelda);

            /* Dibuja líneas de la cuadrícula
            lienzo.strokeStyle = "white";
            lienzo.strokeRect(x, y, tamanoCelda, tamanoCelda);*/
        }
    }
}

// Función para dibujar una pieza en el lienzo
function dibujarPieza(pieza, x, y) {
    const forma = pieza.forma; // Obtiene la forma de la pieza
    lienzo.fillStyle = pieza.color; // Establece el color de la pieza

    for (let i = 0; i < forma.length; i++) {
        for (let j = 0; j < forma[i].length; j++) {
            if (forma[i][j] === 1) {
                // Dibuja cada celda que forme parte de la pieza
                const celdaX = x + j * tamanoCelda;
                const celdaY = y + i * tamanoCelda;
                lienzo.fillRect(celdaX, celdaY, tamanoCelda, tamanoCelda);
                /*lienzo.strokeStyle = "white";
                lienzo.strokeRect(celdaX, celdaY, tamanoCelda, tamanoCelda);*/
            }
        }
    }
}

// Función para generar una pieza según su probabilidad
function generarPieza() {
    const numRandom = Math.random(); // Genera un número aleatorio entre 0 y 1
    let probAcumulada = 0;

    for (const pieza of piezas) {
        probAcumulada += pieza.probabilidad; // Suma la probabilidad acumulada
        if (numRandom < probAcumulada) {
            return pieza; // Devuelve la pieza correspondiente
        }
    }
    return piezas[1]; // Devuelve una pieza por defecto si no se selecciona otra
}

// Función para verificar si hay colisiones
function chequearColisiones(pieza, x, y) {
    const forma = pieza.forma;

    for (let i = 0; i < forma.length; i++) {
        for (let j = 0; j < forma[i].length; j++) {
            if (forma[i][j] === 1) {
                const tableroX = (x / tamanoCelda) + j;
                const tableroY = (y / tamanoCelda) + i;

                // Verifica si está fuera de límites o colisiona con celdas ocupadas
                if (tableroX < 0 || tableroX >= columnas || tableroY >= filas || tablero[tableroY][tableroX] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
}


// Función para posicionar una pieza en el tablero
function posicionaPieza(pieza, x, y) {
    const forma = pieza.forma;

    for (let i = 0; i < forma.length; i++) {
        for (let j = 0; j < forma[i].length; j++) {
            if (forma[i][j] === 1) {
                const tableroX = (x / tamanoCelda) + j;
                const tableroY = (y / tamanoCelda) + i;
                tablero[tableroY][tableroX] = 1;
            }
        }
    }
}

// Función para eliminar líneas completas
function eliminarLinea() {
    for (let i = 0; i < filas; i++) {
        if (tablero[i].every(celda => celda === 1)) {
            tablero.splice(i, 1); // Eliminar la fila completa
            tablero.unshift(new Array(columnas).fill(0)); // Añadir una fila vacía al inicio
            puntuacion += 100; // Incrementar puntuación
            actualizarPuntuacion();
        }
    }
}


// Variables para la pieza actual y su posición
let piezaActual = generarPieza();
let xActual = Math.floor(columnas / 2) * tamanoCelda;
let yActual = 0;

// Función de actualización del juego
function actualizar() {
    if (chequearColisiones(piezaActual, xActual, yActual + tamanoCelda)) {
        posicionaPieza(piezaActual, xActual, yActual);
        eliminarLinea();

        piezaActual = proximaPieza;

        // Generar una nueva próxima pieza
        proximaPieza = generarPieza();

        // Dibujar la nueva próxima pieza
        dibujarProximaPieza();
        xActual = Math.floor(columnas / 2) * tamanoCelda;
        yActual = 0;

        if (chequearColisiones(piezaActual, xActual, yActual)) {
            alert("FIN DE LA PARTIDA, este juego ha sido desarrollado por David Carmona\n Puntuación: " + puntuacion);
            clearInterval(intervalo);
            return;
        }
    } else {
        yActual += tamanoCelda;
    }

    dibujarTablero();
    dibujarPieza(piezaActual, xActual, yActual);

    // Actualiza la velocidad del juego según el tiempo
    const nuevoIntervalo = calcularIntervalo();
    if (intervalo) clearInterval(intervalo); // Limpia el intervalo actual
    intervalo = setInterval(actualizar, nuevoIntervalo);
}


// Control de teclado
document.addEventListener("keydown", (evento) => {
    if (evento.key === "a" && !chequearColisiones(piezaActual, xActual - tamanoCelda, yActual)) {
        xActual -= tamanoCelda;
    } else if (evento.key === "d" && !chequearColisiones(piezaActual, xActual + tamanoCelda, yActual)) {
        xActual += tamanoCelda;
    } else if (evento.key === "s" && !chequearColisiones(piezaActual, xActual, yActual + tamanoCelda)) {
        yActual += tamanoCelda;
    } else if (evento.key === "w") {
        rotarPieza(); // Rotar la pieza con la tecla W
    }

    dibujarTablero();
    dibujarPieza(piezaActual, xActual, yActual);
});


// Función para rotar una pieza
function rotarPieza() {
  // Obtenemos la forma actual de la pieza
  const forma = piezaActual.forma;
  const filas = forma.length;
  const columnas = forma[0].length;

  // Creamos una nueva matriz vacía para la forma rotada
  const formaRotada = [];

  // Rote la matriz 90 grados en sentido horario
  for (let i = 0; i < columnas; i++) {
      formaRotada[i] = [];
      for (let j = 0; j < filas; j++) {
          formaRotada[i][j] = forma[filas - 1 - j][i];
      }
  }

  // Comprobamos si la rotación causa colisiones
  if (!chequearColisiones({ ...piezaActual, forma: formaRotada }, xActual, yActual)) {
      // Si no hay colisiones, actualizamos la forma de la pieza
      piezaActual.forma = formaRotada;
   }
}

let proximaPieza = generarPieza();

// Función para dibujar la próxima pieza en el canvas correspondiente
function dibujarProximaPieza() {
    const canvasProxima = document.getElementById("proximaFicha");
    const lienzoProxima = canvasProxima.getContext("2d");

    // Limpiar el canvas de la próxima pieza
    lienzoProxima.clearRect(0, 0, canvasProxima.width, canvasProxima.height);

    // Configurar el tamaño de las celdas para el canvas de próxima ficha
    const tamanoCeldaProxima = canvasProxima.width / 4; // Escalar para que siempre encaje

    // Dibujar la próxima pieza
    const { forma, color } = proximaPieza;
    lienzoProxima.fillStyle = color;
    for (let i = 0; i < forma.length; i++) {
        for (let j = 0; j < forma[i].length; j++) {
            if (forma[i][j]) {
                const x = j * tamanoCeldaProxima;
                const y = i * tamanoCeldaProxima;
                lienzoProxima.fillRect(x, y, tamanoCeldaProxima, tamanoCeldaProxima);
                lienzoProxima.strokeStyle = "white";
                lienzoProxima.strokeRect(x, y, tamanoCeldaProxima, tamanoCeldaProxima);
            }
        }
    }
}

// Calcula el intervalo según el tiempo transcurrido o puntuación
function calcularIntervalo() {
    const tiempoTranscurrido = (new Date() - tiempoInicio) / 1000; // Tiempo en segundos
    const baseIntervalo = 500; // Intervalo base en milisegundos
    const factorVelocidad = 10; // Incrementa este valor para que la aceleración sea más rápida

    // Calcula el nuevo intervalo reduciendo el tiempo base según el tiempo transcurrido
    const nuevoIntervalo = Math.max(baseIntervalo - tiempoTranscurrido * factorVelocidad, 200); 
    return nuevoIntervalo;
}
