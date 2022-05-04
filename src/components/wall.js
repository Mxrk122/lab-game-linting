/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import wall1 from '../img/wall1.png'
import wall2 from '../img/wall2.png'
import wall3 from '../img/wall3.png'
import wall4 from '../img/wall4.png'

import wallupper from '../img/wall-upper.png'
import tower from '../img/plus.png'

function Wall({ prop }) {
  let imgSrc

  const style = css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    `

  const imgStyle = css`
      width: 100%;
      height: 100%;
    `

  // DEfinir la imagen
  if (prop === '-') {
    const paredRandom = Math.floor(Math.random() * (5))

    if (paredRandom === 1) imgSrc = wall1
    else if (paredRandom === 2) imgSrc = wall2
    else if (paredRandom === 3) imgSrc = wall3
    else if (paredRandom === 4) imgSrc = wall4
    else imgSrc = wall1
  }

  if (prop === '|') {
    imgSrc = wallupper
  }

  if (prop === '+') {
    imgSrc = tower
  }

  return (
    <div className="wall" css={style}>
      <img src={imgSrc} css={imgStyle} alt="elemento" />
    </div>
  )
}

export default Wall
