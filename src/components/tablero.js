/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import Wall from './wall'

function Tablero({
  laberinto, weight, height, updateLabyrinth, win,
}) {
  const h = parseFloat(height) + parseFloat(height + 1)

  const w = (Number(weight * 2) + Number(weight + 1))

  const style = css`
    color: blue;
    background: #A0A0A0;
    display: ${laberinto ? 'grid' : 'none'};
    grid-template-columns: repeat(${w}, 50px);
    grid-template-rows: repeat(${h}, 50px);
    `

  // Mover al personaje
  // ver en que posicion se encuentra el personaje o lo que sea
  const verifySpace = (letter) => {
    let x; let
      y

    laberinto.map((fila, indicef) => {
      if (fila.indexOf(letter) > 0) {
        x = fila.indexOf(letter)
        y = indicef
      }

      return null
    })

    // indexOf devuelve -1 swi no lo encuentra

    return [x, y]
  }
  // Moverse
  // Esta funcion reciobe como parametros la posicion original de la p
  // y las unidades que se desea moverla
  const move = (x, y, plusx, plusy) => {
    // Tomar una copia del laberinto para hacerle cambios
    const newLabyrinth = JSON.parse(JSON.stringify(laberinto))

    // Tomo la fila con la p y la reemplazo por una sin la p
    const oldLine = laberinto[y]
    // La p se mueve a la nueva fila, donde reemplazare el espacio
    // vacio por la p, la direcciona la que se mueve el jugador
    const newLine = laberinto[y + plusy]

    // Ahora lo mismo pero horizontalmente
    // Al tratarse de movimiento horizontal solo necesito
    // oldLine para saber en que fila está y mvoerlo desde ahí
    const oldPosition = x

    // Posicion con el desplazamiento
    const newPosition = x + plusx

    // Si detecta una pared, no hará nada
    if (laberinto[y + plusy][x + plusx] === '-' || laberinto[y + plusy][x + plusx] === '+' || laberinto[y + plusy][x + plusx] === '|') {
      console.log('wall')
    } else {
      // si el movimiento es vertical, realizar esto
      if (plusx === 0) {
        // Realizar los cambios en la fila vieja
        oldLine.map((elemento, indice) => (elemento === 'p' ? (oldLine[indice] = ' ') : null))
        // Si se encuentra la p, reemplazarla por u espacio en blanco

        // Poner la p en su lugar en al fila a la que se movio
        newLine[x] = 'p'

        // Aplicar cambios al nuevo alberinto y actualizar
        newLabyrinth[y] = oldLine
        newLabyrinth[y + plusy] = newLine

        // Actualizar el laberinto, siempre se actualiza
        updateLabyrinth(newLabyrinth)
      } else {
        // si es horizontal hara esto
        // Reemplazar la posicion y moer a la p
        oldLine[oldPosition] = ' '
        oldLine[newPosition] = 'p'

        // Realizar cmabios y actualizar
        // Actualizar el laberinto, siempre se actualiza
        newLabyrinth[y] = oldLine
        updateLabyrinth(newLabyrinth)
      }
    }
  }

  // Funcion para revisar si el jugador ha ganado
  const verifyWin = () => {
    try {
      // la meta siempre se encuentra en la penultima posicion de cada laberinto
      // extraer el index de la letra g
      const goalPos = verifySpace('g')

      // Si las posiciones estan indefinidas, quiere decir que ha ganado porque la g ya no esta
      if (goalPos[0] === undefined) {
        console.log('ganaste!')
        win()
        // declarar laberinto como null para no mostrar nada
        updateLabyrinth(null)
      }
    } catch {
      console.log('no hay laberinto')
    }
  }

  // ejecutar movimiento al pulsar teclas
  const pressKey = () => {
    // Extraer posicion del jugador
    const x = verifySpace('p')[0]
    const y = verifySpace('p')[1]

    // Moverse hacia abajo
    if (event.key === 's' || event.key === 'ArrowDown') {
      // y -> va primero, ya que es la fila. || Luego va x
      // ya que es la posicion de la fila donde está
      move(x, y, 0, 1)
    } else if (event.key === 'w' || event.key === 'ArrowUp') {
      move(x, y, 0, -1)
    } else if (event.key === 'a' || event.key === 'ArrowLeft') {
      move(x, y, -1, 0)
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
      move(x, y, 1, 0)
    }

    // al terminar cada turnjo se debe revisar si el jugador ha ganado
    verifyWin()
  }

  window.onkeydown = pressKey

  const key = 0

  return (
    <div className="tablero" id="grid" css={style}>

      {
            laberinto.map((linea) => linea.map((element, index) => {
              if (element === '-' || element === '|' || element === '+') {
                return <Wall prop={element} />
              }
              return <p key={key + 1}>{element}</p>
            }))
        }

    </div>
  )
}

export default Tablero
