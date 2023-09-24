import { useEffect, useRef } from 'react'

const Crosshair = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = e.pageY + 'px'
        cursorRef.current.style.left = e.pageX + 'px'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={cursorRef} className="cursor">
      <img src="./images/crosshair.svg" alt="crosshair" />
    </div>
  )
}

export default Crosshair
