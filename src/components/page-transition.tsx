import { motion, Variants } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
    children: ReactNode
}

const variants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.4,
            // Добавляем as const, чтобы TS не ругался на массив
            ease: [0.33, 1, 0.68, 1] as const, 
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: "blur(10px)",
        transition: {
            duration: 0.3,
            ease: "easeIn" as const,
        },
    },
}

export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className="w-full"
        >
            {children}
        </motion.div>
    )
}
