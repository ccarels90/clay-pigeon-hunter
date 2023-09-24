import { useEffect, useRef, useState } from 'react'

const ShootTarget = ({ userData, setUserData }) => {
  const targetRef = useRef(null)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateScreenSize)

    updateScreenSize()

    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])

  setInterval(() => {
    const randTop = screenSize.height - 300
    const randLeft = Math.random() * (screenSize.width - 300)

    if (targetRef.current) {
      targetRef.current.querySelector('.disc').style.border = '3px solid red'
      targetRef.current.style.position = 'absolute'
      targetRef.current.style.bottom = randTop + 'px'
      targetRef.current.style.left = randLeft + 'px'
    }
  }, 5000)

  const handleHit = (event) => {
    event.preventDefault()
    if (event.target.className === 'disc') {
      event.target.style.border = '3px solid green'
      const newScore = userData.score + 1
      setUserData(newScore)
    }
  }

  return (
    <div ref={targetRef} className="container" onClick={handleHit}>
      <div className="disc">
        <div className="label"></div>
      </div>
    </div>
  )
}

export default ShootTarget
