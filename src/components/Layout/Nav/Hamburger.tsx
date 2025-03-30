export default function Hamburger({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (open: boolean) => void }) {
    return (
        <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden hover:bg-[var(--color-hover-background)] p-2 rounded-full cursor-pointer"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col justify-center gap-1.5 w-5 h-5">
          <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-[var(--color-foreground)] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>
    )
}