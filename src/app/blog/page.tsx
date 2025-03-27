import Rolodex from '@/components/Blog/Rolodex';

export default function Blog() {

  const entries = [
    { tab: 'A', label: 'Tumwater', tabSlot: 0, destination: '/blog/01_File' },
    { tab: 'B', label: 'Culpepper', tabSlot: 1, destination: '/blog/Bellingham' },
    { tab: 'C', label: 'Cairns', tabSlot: 2, destination: '/blog/Cicero' },
    { tab: 'D', label: 'Siena', tabSlot: 3, destination: '/blog/Delacroix' },
    { tab: 'E', label: 'Cold Harbor', tabSlot: 4, destination: '/blog/Eternity' },
  ]

  return (
    <div className="flex justify-center items-center bg-transparent w-full h-[85vh]">
      <Rolodex entries={entries} />
    </div>
  );
}
