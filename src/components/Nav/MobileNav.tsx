import Link from "next/link";
import { navLinks } from "./config";
export default function MobileNav({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (open: boolean) => void }) {
    return (
        <div
          className={`md:hidden absolute left-0 right-0 bg-background dark:bg-[#0a0a0a] border-b border-black/[.08] dark:border-white/[.145] transition-all duration-300 ${
            isMenuOpen ? 'top-full opacity-100' : '-top-96 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                className="px-2 py-1.5 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
    )
}