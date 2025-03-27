'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function Rings({ triggerKey, direction }: { triggerKey: number; direction: number }) {
  const maskHeight = 40 // in percent

  return (
    <div className="bottom-[68px] left-1/2 z-10 absolute flex justify-around w-full -translate-x-1/2 pointer-events-none">
      {/* Left Ring */}
      <div className="relative overflow-hidden">
        <div className="bg-cyan-400 rounded-full w-3 h-12" />
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${triggerKey}`}
            className="absolute bg-black rounded-full w-6"
            style={{ height: `${maskHeight}%`, left: '-5px', opacity: 0.5 }}
            initial={{ y: direction < 0 ? `-3rem` : '3rem' }}
            animate={{ y: '3rem' }}
            exit={{ y: direction < 0 ? '3rem' : `-3rem` }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>

      {/* Right Ring */}
      <div className="relative">
        <div className="bg-cyan-400 rounded-full w-3 h-12" />
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${triggerKey}`}
            className="absolute bg-black rounded-full w-6"
            style={{ height: `${maskHeight}%`, left: '-5px', opacity: 0.5 }}
            initial={{ y: direction < 0 ? `-3rem` : '3rem' }}
            animate={{ y: '3rem' }}
            exit={{ y: direction < 0 ? '3rem' : `-3rem` }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

