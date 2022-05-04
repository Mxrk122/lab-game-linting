/** @jsx jsx */
import { css, jsx } from '@emotion/react'
// Documento dedicado a los estilos css
const app = css`

    width: 100%;
    height: 100%;
    background: #222122;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
`

export { app }

const h1 = css`
margin-top: none;
width: 400px;
`
export { h1 }

const input = css`
margin: 15px 0;
font-size: 16px;
padding: 10px;
width: 250px;
height: 20px;
border-width: 4px;
border-style: solid;
border-image: linear-gradient(to right, #DDD31B, #F20F50, #00E1FE) 1;
background: rgba(20, 20, 20, .2);
color: white;
outline: none;


&:disabled {
    pointer-events: none;
  }
  
  &:hover {
    color: white;
    box-shadow: rgba(0, 0, 0, 1) 0 8px 15px;
    transform: translateY(-2px);
  }
`

export { input }

const button = css`
display: flex;
justify-content: center;

appearance: none;
background-color: #DDD31B;
border: 2px solid #1A1A1A;
border-radius: 15px;
box-sizing: border-box;
color: #222122;
cursor: pointer;
font-size: 16px;
font-weight: 600;
line-height: normal;
margin: 5px;
min-height: 60px;
min-width: 0;
padding: 16px 24px;
text-align: center;
transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
width: 150px;
will-change: transform;

&:disabled {
  pointer-events: none;
}

&:hover {
  
  background-color: #00E1FE;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

&:active {
  box-shadow: none; 
  transform: translateY(0);
}
`

export { button }
