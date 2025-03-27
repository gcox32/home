'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWheel, useDrag } from '@use-gesture/react'
import Wheel from './Wheel'
import Tab from './Tab'
import Rings from './Rings'

interface Entry {
  tab: string
  label: string
  tabSlot: number
  destination: string
}

const SCROLL_SENSITIVITY = 3 // Higher is less sensitive

export default function Rolodex({ entries }: { entries: Entry[] }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [flipCount, setFlipCount] = useState(0)

  const paginate = (dir: number) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + entries.length) % entries.length)
    setWheelRotation(prev => prev + (dir > 0 ? 1 : -1))
    setFlipCount((c) => c + 1)
  }

  const bindWheel = useWheel(({ delta: [, dy] }) => {
    if (Math.abs(dy) > SCROLL_SENSITIVITY) {
      paginate(dy < 0 ? 1 : -1)
    }
  })

  const bindDrag = useDrag(({ movement: [, my], direction: [, dy] }) => {
    if (Math.abs(my) > 50) { // Threshold for drag distance
      paginate(dy > 0 ? 1 : -1)
    }
  }, {
    axis: 'y',
    filterTaps: true,
  })

  const handleTabClick = (destination: string) => {
    setTimeout(() => {
      window.location.href = destination;
    }, 500);
  }

  const currentEntry = entries[index]
  const previousEntry = entries[(index - 1 + entries.length) % entries.length]
  const nextEntry = entries[(index + 1) % entries.length]

  return (
    <div
      {...bindWheel()}
      {...bindDrag()}
      className="flex justify-center items-center bg-transparent w-full"
    >
      <div className="relative w-[220px] h-[340px] perspective-[1200px]">

        {/* Top Card (Active) */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={`front-${index}`}
            className="top-[100px] z-10 absolute border-4 border-cyan-400 rounded-md w-full h-[140px] cursor-pointer"
            initial={{ rotateX: direction > 0 ? -180 : 180, opacity: 1, transformOrigin: 'center 105%' }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: 'center 105%' }}
            exit={{ rotateX: direction > 0 ? 180 : -180, opacity: 1, transformOrigin: 'center 105%' }}
            whileTap={{ borderWidth: '8px' }}
            onClick={() => handleTabClick(currentEntry.destination)}
            transition={{ 
              rotateX: { duration: 0.5 },
            }}
            style={{
              transformStyle: 'preserve-3d',
              background: 'black',
              color: '#67e8f9',
              padding: '2rem',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.5rem',
              position: 'absolute',
            }}
          >
            <Tab tab={currentEntry.tab} tabSlot={currentEntry.tabSlot} position="top" />
            <div 
              className="font-weight-400 text-cyan-200 text-4xl" 
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {currentEntry.label}
            </div>
          </motion.div>
        </AnimatePresence>

        <Rings direction={direction} triggerKey={flipCount} />

        <Wheel side="left" rotation={-wheelRotation} sensitivity={SCROLL_SENSITIVITY}/>
        <Wheel side="right" rotation={-wheelRotation} sensitivity={SCROLL_SENSITIVITY}/>

        {/* Back Card (Flipped Down One) */}
        <motion.div
          key={`back-${previousEntry.tab}`}
          className="top-[58px] z-0 absolute bg-black border-4 border-cyan-400 rounded-md w-full h-[140px] text-cyan-600 cursor-default"
          style={{
            padding: '1.5rem',
            transform: 'rotateX(180deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'center 120%',
            position: 'absolute',
          }}
        >
          <Tab tab={nextEntry.tab} tabSlot={nextEntry.tabSlot} position="bottom" />
        </motion.div>

      </div>
    </div>
  )
}