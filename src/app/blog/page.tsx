import Rolodex from '@/components/Blog/Rolodex';

export default function Blog() {

  const entries = [
    { tab: 'A', label: '01_File', tabSlot: 0, destination: '/blog/01_File' },
    { tab: 'B', label: 'Bellingham', tabSlot: 1, destination: '/blog/Bellingham' },
    { tab: 'C', label: 'Cicero', tabSlot: 2, destination: '/blog/Cicero' },
    { tab: 'D', label: 'Delacroix', tabSlot: 3, destination: '/blog/Delacroix' },
    { tab: 'E', label: 'Eternity', tabSlot: 4, destination: '/blog/Eternity' },
  ]

  return (
    <div className="flex justify-center items-center bg-transparent w-full h-[90vh]">
      <Rolodex entries={entries} />
    </div>
  );
}
