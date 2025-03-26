import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import MeetHarper from '@/components/Portfolio/cards/meetharper';
import FiberHomes from '@/components/Portfolio/cards/fiberhomes';
import IronTribe from '@/components/Portfolio/cards/irontribe';

export default function Portfolio() {
  return (
    <PageLayout
      title="Portfolio"
      description={`Here you'll find a collection of my professional work and experiences. These projects are out in the wild and are available for you to view, so feel free to check them out.`}
    >
      <div className="space-y-8 w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-semibold text-2xl">Professional Experience</h2>
          <Link
            href="/resume.pdf"
            className="hover:bg-black/[.05] dark:hover:bg-white/[.06] px-3 py-1.5 rounded-lg hover:text-primary transition-colors"
            target="_blank"
          >
            View Resume
          </Link>
        </div>
        <div className="space-y-6">
          <FiberHomes />
          <MeetHarper />
          <IronTribe />
        </div>
      </div>
    </PageLayout>
  );
}
