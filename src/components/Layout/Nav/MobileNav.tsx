import Link from "next/link";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navLinks: Array<{ label: string; href: string; }>;
}

export default function MobileNav({ isMenuOpen, setIsMenuOpen, navLinks }: MobileNavProps) {
  return (
    <div
      className={`md:hidden absolute left-0 right-0 bg-[var(--color-background)] border-b border-[var(--border-color)] transition-all duration-300 ${
        isMenuOpen ? 'top-full opacity-100' : '-top-96 opacity-0'
      }`}
    >
      <div className="flex flex-col gap-4 p-4">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hover:bg-[var(--color-hover-background)] px-2 py-1.5 hover:text-[var(--color-hover-foreground)] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}