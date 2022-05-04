// Archivo de entrada de la app
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Tablero from './components/tablero'
import {
  app, h1, input, button,
} from './styles'
import './styles/example.css'
import WinPoster from './components/WinPoster'
import logo from './img/logo.png'

// Metodo para crear laberintos
const crearLaberinto = async (w, h) => {
  const origin = 'https://maze.juanelcaballo.club/?type=json&w=!&h=$'

  const setWeight = origin.replace('!', w)

  const setHeight = setWeight.replace('$', h)

  const value = await fetch(setHeight) // Hago un request de http del laberito
    .then((response) => // el resultado de la promesa es esta funcion que trae la respuesta
      response.json()) // Este metodo es una promesa
    .then((responseInJson) => responseInJson)

  return value
}

const App = () => {
  // Cambiar el tamaño del laberinto
  const [laberinto, setLaberinto] = React.useState(null)
  const [height, setHeight] = React.useState(4)
  const [weight, setWeight] = React.useState(4)

  // Estado para controlar si gano o no
  const [winner, setWinner] = React.useState(false)
  const win = () => setWinner(true)
  const playing = () => setWinner(false)

  const setW = (val) => {
    // Al cambiar el valor del input se actualizar el valor
    const value = Number(val.target.value)

    value === null ? setWeight(value) : setWeight(4)
  }

  const setH = (val) => {
    // Al cambiar el valor del input se actualizar el valor
    const value = Number(val.target.value)

    value ? setHeight(value) : setHeight(4)
  }

  const changeLab = async () => {
    // Si cambia el laberinto, se actualiza y se recgarga la pagina
    // Esta funcion solicita un cambio ene l laberinto
    const newLaberinto = await crearLaberinto(weight, height)
    setLaberinto(newLaberinto)
    playing()
  }

  // Esta funcion se mandara al tablero para que se pueda actualizar el laberinto
  const updateLabyrinth = async (newLab) => {
    setLaberinto(newLab)
  }

  return (
    <div className="app" css={app}>
      <img src={logo} alt="logo" css={h1} />
      <input
        type="number"
        placeholder="ingresa el alto"
        onChange={setH}
        css={input}
      />
      <input
        type="number"
        placeholder="ingresa el ancho"
        onChange={setW}
        css={input}
      />
      <button onClick={changeLab} css={button} type="button">
        ¡Crear un laberinto!
      </button>
      {winner && <WinPoster />}
      {
        // Un truquitop para no mostrar cosas jejej
        laberinto && (
          <Tablero
            laberinto={laberinto}
            weight={weight}
            height={height}
            updateLabyrinth={updateLabyrinth}
            win={win}
          />
        )
      }
    </div>
  )
}

// Renderiza app y lo pone en el div "root"
ReactDOM.render(<App />, document.getElementById('root'))
