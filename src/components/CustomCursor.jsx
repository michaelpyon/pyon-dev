import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

// Only mount on devices with a fine pointer (mouse/trackpad)
const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = prefersReducedMotion
    ? { damping: 100, stiffness: 1000 }
    : { damping: 28, stiffness: 350 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!canHover) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)

    window.addEventListener('mousemove', move)

    // Use event delegation instead of per-element listeners
    const handleOver = (e) => {
      if (e.target.closest('[data-cursor-card]')) enter()
    }
    const handleOut = (e) => {
      if (e.target.closest('[data-cursor-card]') && !e.relatedTarget?.closest('[data-cursor-card]')) leave()
    }

    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices or when mouse hasn't moved yet
  if (!canHover || !visible) return null

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
        width: hovered ? 64 : 8,
        height: hovered ? 64 : 8,
        opacity: 1,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', damping: 28, stiffness: 350 }
      }
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
