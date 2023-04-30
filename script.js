
const CELLS = document.querySelectorAll(".cells");
let currentPlayer = `✖️`;
let gameEnd = false;
let x = 0;
let o = 0;
let ep = 0;

// Son las condiciones ganadoras
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Inicializamos el juego
iniciarJuego();
// Actulaizamos los valores del juego
actulizarJuegos(x,o,ep);


// funcion del inico del juego
function iniciarJuego(){
  // borramos cualquier mensaje que puesa existir previemaente
  document.querySelector('#mensaje').innerHTML = ''
  CELLS.forEach(cell=> {
    gameEnd = false;
    cell.innerHTML = '';
    cell.addEventListener("click", () => {
      if (gameEnd) {
        return;
      }
      if (cell.textContent === "") {
        cell.textContent = currentPlayer;
        if (checkWin()) {
          gameEnd = true;
          currentPlayer === `✖️` ? x++: o++;
          document.querySelector('#mensaje').innerHTML = `El jugador ( ${currentPlayer} ) ha ganado`;
          currentPlayer = '✖️';
          setTimeout(()=>{
            iniciarJuego()
          },3000);
          actulizarJuegos(x,o,ep);
        } else if (checkTie()) {
          currentPlayer = '✖️';
          gameEnd = true;
          ep += 1;
          document.querySelector('#mensaje').innerHTML = `Es un empate 🤨!!`
          setTimeout(()=>{
            iniciarJuego()
          },3000);
          actulizarJuegos(x,o,ep);
        } else {
          currentPlayer = currentPlayer === `✖️` ? `⭕`: `✖️`;
        }
      }
    });
  });
};
  
  function checkWin() {
  //en base a nuestra constante winConditions verificamos si la posición del tablero muestra alguna victoria.
    return winConditions.some(condition => {
      return condition.every(index => {
        return CELLS[index].textContent === currentPlayer;
      });
    });
  }
  
  function checkTie() {
  //en base a nuestras celdas del tablero verificamos que todas las celdas estén ocupadas por alguna ficha.
    return Array.from(CELLS).every(cell => {
      return cell.textContent !== "";
    });
  }

// actualiza los datos del juego/ no utlizo el localstorage por que me parece que no es necesario
  function actulizarJuegos(x,o,ep){
    document.querySelector('#ganadorX').innerHTML = `Ganador_X:  <span style="color:red">${x}</span>`
    document.querySelector('#ganadorO').innerHTML = `Ganador_O:  <span style="color:red">${o}</span>`
    document.querySelector('#empate').innerHTML = `Empates:  <span style="color:red">${ep}</span>`
  }