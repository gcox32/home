'use client'

export default function Wheel({ side, rotation, sensitivity }: { side: 'left' | 'right', rotation: number, sensitivity: number }) {
    const ITEMS = 24;
    const RADIUS = 40; // Adjust this value to control the wheel size
    const SCROLL_SENSITIVITY = 10 / sensitivity;
    
    const bars = Array.from({ length: ITEMS }).map((_, i) => {
        const angle = (i * (360 / ITEMS)) + (rotation * SCROLL_SENSITIVITY);
        const radian = (angle * Math.PI) / 180;
        
        // Calculate 3D position
        const z = RADIUS * Math.cos(radian);
        const y = RADIUS * Math.sin(radian);
        
        // Calculate tilt angle - bars will tilt based on their position
        const tiltAngle = -angle; // This makes bars tilt as they move around

        // Scale opacity based on z position (bars in front more visible)
        const opacity = (z + RADIUS) / (2 * RADIUS);
        
        return (
            <div
                key={`${side}-${i}`}
                className="absolute bg-cyan-400 rounded-sm w-6 h-[5px]"
                style={{
                    transform: `translateY(${y}px) translateZ(${z}px) rotateX(${tiltAngle}deg)`,
                    opacity: opacity,
                }}
            />
        )
    });

    return (
        <div className={`
            ${side === 'left' ? 'left-[-33px]' : 'right-[-10px]'}
            bottom-[56px]
            absolute
            preserve-3d
            perspective-[1000px]
        `}>
            <div className="relative h-[40px] transform-style-3d">
                {bars}
            </div>
        </div>
    )
}