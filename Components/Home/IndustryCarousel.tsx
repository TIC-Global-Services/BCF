'use client'

import React, { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
    ResolvedValues,
} from "framer-motion";
import Container from "@/Components/Reusable/Container";

const IMGS: { url: string; title: string; description: string }[] = [
    {
        url: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Precision engineering and manufacturing solutions"
    },
    {
        url: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Advanced production techniques and quality control"
    },
    {
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Cutting-edge technology solutions for modern industry"
    },
    {
        url: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Sustainable energy systems and renewable technology"
    },
    {
        url: "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Building tomorrow's infrastructure with innovation"
    },
    {
        url: "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Advanced aerospace engineering and precision components"
    },
    {
        url: "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Offshore and marine technology solutions"
    },
    {
        url: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Sustainable energy systems and renewable technology"
    },
    {
        url: "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Building tomorrow's infrastructure with innovation"
    },
    {
        url: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Sustainable energy systems and renewable technology"
    },
    {
        url: "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Building tomorrow's infrastructure with innovation"
    },
    {
        url: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Automotive Industry",
        description: "Sustainable energy systems and renewable technology"
    },
];

interface RollingGalleryProps {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images?: { url: string; title: string; description: string }[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
    autoplay = false,
    pauseOnHover = false,
    images = [],
}) => {
    const galleryImages = images.length > 0 ? images : IMGS;

    const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);


    useEffect(() => {
        // Set initial screen size after component mounts (client-side only)
        setIsScreenSizeSm(window.innerWidth <= 640);

        const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Adjusted calculations to show 5 cards with proper spacing
    const cylinderWidth: number = isScreenSizeSm ? 1800 : 2400; // Reduced cylinder width
    const faceCount: number = galleryImages.length;
    const faceWidth: number = (cylinderWidth / faceCount) * 1; // Increased face width ratio
    const radius: number = cylinderWidth / (1.7 * Math.PI); // Changed from 2.5 to 2 for tighter radius

    const dragFactor: number = 0.05;
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    const transform = useTransform(
        rotation,
        (val: number) => `rotate3d(0,1,0,${val}deg)`
    );

    const startInfiniteSpin = (startAngle: number) => {
        controls.start({
            rotateY: [startAngle, startAngle - 360],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            },
        });
    };

    useEffect(() => {
        if (autoplay) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        } else {
            controls.stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay]);

    const handleUpdate = (latest: ResolvedValues) => {
        if (typeof latest.rotateY === "number") {
            rotation.set(latest.rotateY);
        }
    };

    const handleDrag = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        controls.stop();
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        const finalAngle = rotation.get() + info.velocity.x * dragFactor;
        rotation.set(finalAngle);
        if (autoplay) {
            startInfiniteSpin(finalAngle);
        }
    };

    const handleMouseEnter = (): void => {
        if (autoplay && pauseOnHover) {
            controls.stop();
        }
    };

    const handleMouseLeave = (): void => {
        if (autoplay && pauseOnHover) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        }
    };

    return (
        <Container isMobileFullScreen={true}>
            <div className="relative h-[600px] w-full  overflow-hidden">
                <div className="flex h-full items-center  justify-center [perspective:1200px] [transform-style:preserve-3d]">
                    <motion.div
                        drag="x"
                        dragElastic={0}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        animate={controls}
                        onUpdate={handleUpdate}
                        style={{
                            transform: transform,
                            rotateY: rotation,
                            width: cylinderWidth,
                            transformStyle: "preserve-3d",
                        }}
                        className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
                    >
                        {galleryImages.map((item, i) => (
                            <div
                                key={i}
                                className="group absolute flex h-fit items-center justify-center p-[1%] [backface-visibility:hidden]" // Added backface-visibility:hidden
                                style={{
                                    width: `${faceWidth}px`,
                                    transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                                }}
                            >
                                {/* Card container - Optimized for 5 cards visibility */}
                                <div className="relative h-[300px] w-[280px] sm:h-[280px] sm:w-[260px] rounded-[15px] overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105">
                                    {/* Background image */}
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="pointer-events-none h-full w-full object-cover"
                                    />

                                    {/* Content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 pl-4 pt-3.5 pb-3 text-white z-50">
                                        <h3 className="text-2xl font-light leading-6">{item.title}</h3>
                                    </div>

                                    {/* Bottom blur effect */}
                                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[1px]" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </Container>
    );
};

export default RollingGallery;