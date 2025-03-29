import { motion } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';

interface TabProps {
    direction: number;
    tab: string;
    tabSlot: number;
    position: 'top' | 'bottom';
    priority?: number | undefined;
}

function getTabStyles(position: 'top' | 'bottom', priority?: number, leftPercent?: number) {
    return {
        left: `${leftPercent}%`,
        position: 'absolute',
        backgroundColor: position === 'bottom' ? '#000' : '#67e8f9',
        borderRadius: '10px 10px 0 0',
        borderBottom: priority === 1 ? '2px solid #000' : '2px solid #67e8f9',
        borderTop: position === 'bottom' ? '2px solid #67e8f9' : 'none',
        borderLeft: position === 'bottom' ? '2px solid #67e8f9' : 'none',
        borderRight: position === 'bottom' ? '2px solid #67e8f9' : 'none',
        width: '44px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#000',
        top: position === 'bottom' ? 'auto' : '-23px',
        bottom: position === 'bottom' ? '-70px' : 'auto',
        // backfaceVisibility: 'hidden',
        // WebkitBackfaceVisibility: 'hidden',
    } as const
}

function inferInitialState(direction: number, position: 'top' | 'bottom', priority?: number) {
    if (position === 'top') {
        return {
            opacity: 0,
            rotateX: 0
        }
    }
    if (priority === 1) {
        return {
            y: direction < 0 ? -20 : 20,
            zIndex: -1,
            rotateX: position === 'bottom' ? 180 : 0
        }
    }
    return {
        zIndex: -1,
        rotateX: position === 'bottom' ? 180 : 0,
        borderBottom: '2px solid #000'
    }
}

function inferAnimationState(direction: number, position: 'top' | 'bottom', priority?: number) {
    if (position === 'top') {
        return {
            opacity: 1,
            rotateX: 0
        }
    }
    if (priority === 1) {
        return {
            y: 0,
            zIndex: 1,
            rotateX: position === 'bottom' ? 180 : 0
        }
    }
    return {
        zIndex: -1,
        rotateX: position === 'bottom' ? 180 : 0,
        borderBottom: '2px solid #000'
    }
}

function inferExitState(direction: number, position: 'top' | 'bottom', priority?: number) {
    if (position === 'top') {
        return {
            opacity: 0
        }
    }
    if (priority === 1) {
        return {
            y: direction < 0 ? 20 : -20,
            zIndex: -1
        }
    }
    return {
        y: direction < 0 ? -20 : 20,
        zIndex: -1
    }
}



export default function Tab({ direction, tab, tabSlot, position, priority }: TabProps) {
    const leftPercent = tabSlot * (90 / 5) + 2.5 // 6 slots across
    const debouncedDirection = useDebounce(direction, 100);
    const debouncedPosition = useDebounce(position, 100);
    const debouncedPriority = useDebounce(priority, 100);
    return (
        <motion.div
            initial={inferInitialState(debouncedDirection, debouncedPosition, debouncedPriority)}
            animate={inferAnimationState(debouncedDirection, debouncedPosition, debouncedPriority)}
            exit={inferExitState(debouncedDirection, debouncedPosition, debouncedPriority)}
            transition={{
                y: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.2 },
                zIndex: { delay: 0.2 },
                borderBottom: { duration: 0 }
            }}
            style={getTabStyles(position, priority, leftPercent)}
        >
            {position === 'top' ? tab : ''}
        </motion.div>
    )
}
