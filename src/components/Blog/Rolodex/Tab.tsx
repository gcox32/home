interface TabProps {
  tab: string;
  tabSlot: number;
  position: 'top' | 'bottom';
}

export default function Tab({ tab, tabSlot, position }: TabProps) {
  const leftPercent = tabSlot * (90 / 5) + 2.5 // 6 slots across
  console.log(tab)
  return (
    <div
      style={{
        left: `${leftPercent}%`,
        transformOrigin: 'center',
        position: 'absolute',
        backgroundColor: position === 'bottom' ? '#000' : '#67e8f9',
        borderRadius: '10px 10px 0 0',
        borderBottom: position === 'top' ? '2px solid #67e8f9' : '2px solid #000',
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
        top: position === 'top' ? '-20px' : 'auto',
        bottom: position === 'bottom' ? '100%' : 'auto',
        backfaceVisibility: 'hidden',
        zIndex: position === 'bottom' ? 2 : 1,
      }}
    >
      {position === 'top' ? tab : ''}
    </div>
  )
}
