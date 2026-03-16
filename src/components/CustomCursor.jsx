import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 350 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 350 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    window.addEventListener('mousemove', move)

    // Attach hover listeners to all cursor-card elements
    const attachListeners = () => {
      document.querySelectorAll('[data-cursor-card]').forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    attachListeners()

    // Re-attach on DOM changes (for dynamically rendered cards)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
      document.querySelectorAll('[data-cursor-card]').forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [cursorX, cursorY])

  if (!visible) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-[#1A1A1A] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: hovered ? 64 : 20,
        height: hovered ? 64 : 20,
        opacity: 1,
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 350 }}
    >
      {hovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-medium text-[#1A1A1A]"
        >
          View
        </motion.span>
      )}
    </motion.div>
  )
}
