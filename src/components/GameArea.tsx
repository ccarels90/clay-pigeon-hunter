import { useEffect, useRef } from 'react'
import '../styles/Disc.css'
import ShootTarget from './ShootTarget'
import Crosshair from './Crosshair'

const GameArea = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
  }, [])

  return (
    <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }}>
      <Crosshair />
      <ShootTarget />
    </div>
  )
}

export default GameArea
