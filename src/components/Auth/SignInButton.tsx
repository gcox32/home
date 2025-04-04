interface SignInButtonProps {
    isAuthenticated: boolean;
    signOut: () => void;
    setIsSignInModalOpen: (open: boolean) => void;
}

export default function SignInButton({ isAuthenticated, signOut, setIsSignInModalOpen }: SignInButtonProps) {

    if (isAuthenticated) {
        return (
            <button
                onClick={signOut}
                className="hover:bg-[var(--color-hover-background)] px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
                Sign Out
            </button>
        )
    } else {
        return (
            <button
                onClick={() => setIsSignInModalOpen(true)}
                className="hover:bg-[var(--color-hover-background)] px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
                Sign In
            </button>
        )
    }
}   