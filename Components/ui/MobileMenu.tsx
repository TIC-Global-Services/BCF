import NavLinks from "@/const/NavLink";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";


interface MobileMenuProps {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    pathname: string
}


// Mobile Menu Component
const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, pathname }: MobileMenuProps) => (
    <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        scale: 1.1
                    },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration: 0.4,
                            ease: "easeOut",
                            staggerChildren: 0.08,
                            delayChildren: 0.15
                        }
                    },
                    exit: {
                        opacity: 0,
                        scale: 0.95,
                        transition: {
                            duration: 0.25,
                            ease: "easeIn",
                            staggerChildren: 0.03,
                            staggerDirection: -1
                        }
                    }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-40 backdrop-blur-3xl bg-black/20"
                key="mobile-menu"
            >
                <div className="flex flex-col items-center justify-center h-full p-8">
                    <motion.div
                        className="space-y-3 w-full max-w-sm"
                    >
                        {Object.entries(NavLinks).map(([label, path], index) => (
                            <motion.div
                                key={`${label}-${index}`}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.95
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            duration: 0.35,
                                            ease: "easeOut"
                                        }
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10,
                                        scale: 0.98,
                                        transition: {
                                            duration: 0.2,
                                            ease: "easeIn"
                                        }
                                    }
                                }}
                                className="w-full"
                            >
                                <Link
                                    href={path}
                                    className={`block w-full text-center py-3 px-8 rounded-2xl text-xl font-medium transition-all duration-300 backdrop-blur-xl border ${pathname === path
                                        ? 'bg-white/30 text-white border-white/40 font-bold shadow-lg'
                                        : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <motion.span
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="block"
                                    >
                                        {label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Close button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-12 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { delay: 0.4, duration: 0.3 }
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
)

export default MobileMenu