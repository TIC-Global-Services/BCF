import { useHeroAnimation } from "@/contexts/HeroAnimationContext";
import { motion } from "framer-motion"

// Hamburger Icon Component
const HamburgerIcon = ({ isOpen, onClick, isWhite }: {
    isOpen: boolean;
    onClick: () => void;
    isWhite: boolean;
}) => {

    const {
        isHeroFullyScrolled
    } = useHeroAnimation()

    return (
        (
            <motion.button
                onClick={onClick}
                className="relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
            >
                <div className="w-6 h-6 relative flex flex-col justify-center">
                    {/* Top line */}
                    <motion.div
                        className={`w-6 h-0.5 ${isHeroFullyScrolled ? 'bg-gray-700' : 'bg-white'} absolute`}
                        animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 0 : -6
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />

                    {/* Middle line */}
                    <motion.div
                        className={`w-6 h-0.5 ${isHeroFullyScrolled ? 'bg-gray-700' : 'bg-white'}  absolute`}
                        animate={{
                            opacity: isOpen ? 0 : 1
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    />

                    {/* Bottom line */}
                    <motion.div
                        className={`w-6 h-0.5 ${isHeroFullyScrolled ? 'bg-gray-700' : 'bg-white'}  absolute`}
                        animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? 0 : 6
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </div>
            </motion.button>
        )
    )
}


export default HamburgerIcon