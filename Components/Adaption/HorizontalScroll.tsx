import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CastingGradesScroll = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let horizontalSections = gsap.utils.toArray(".container") as HTMLElement[];

        horizontalSections.forEach((container: HTMLElement) => {
            let sections = container.querySelector("div") as HTMLElement;
            if (sections) {
                const totalWidth = sections.scrollWidth;
                const viewportWidth = container.offsetWidth;

                gsap.to(sections, {
                    x: -(totalWidth - viewportWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        pin: true,
                        scrub: 1,
                        end: "+=4000", // Increased end value for 5 cards
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const castingGrades = [
        {
            title: "Gray Cast Iron (CI)",
            image: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Ductile Iron (SG Iron / Nodular Cast Iron)",
            image: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Alloyed Cast Iron",
            image: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Alloy Steel Castings",
            image: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            title: "Special Alloy Castings",
            image: "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <div className=" text-black min-h-screen pt-20">
            {/* Header Section */}
            <div className="text-center px-4">
                <h1 className="text-2xl md:text-5xl font-light tracking-wide md:mb-4">
                    In-Depth Casting Grades for
                </h1>
                <h2 className="text-2xl md:text-5xl font-light tracking-wide text-gray-800">
                    Bhuma Cast Factory
                </h2>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="container overflow-hidden hidden md:block" ref={containerRef}>
                <div className="flex pt-20 pb-7 gap-7 pl-7 md:pl-20" style={{ width: `${castingGrades.length * 320 + (castingGrades.length - 1) * 24 + 500}px` }}>
                    {castingGrades.map((grade, index) => (
                        <div key={index} className="panel flex-shrink-0 w-80">
                            {/* Card */}
                            <div className="bg-white rounded-2xl  overflow-hidden h-96">
                                <img
                                    src={grade.image}
                                    alt={grade.title}
                                    className="w-full h-full rounded-2xl object-cover"
                                />
                            </div>
                            <h3 className="text-base mt-2 pl-2 font-[400] text-[#3F4348] leading-tight text-start w-full">
                                {grade.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className=" overflow-hidden block md:hidden" ref={containerRef}>
                <div className="grid grid-cols-2 gap-2 px-7 md:pl-20" >
                    {castingGrades.map((grade, index) => (
                        <div key={index} className="panel flex-shrink-0 mt-6">
                            {/* Card */}
                            <div className="bg-white rounded-2xl  overflow-hidden">
                                <img
                                    src={grade.image}
                                    alt={grade.title}
                                    className="w-full h-full rounded-2xl object-cover"
                                />
                            </div>
                            <h3 className="text-xs md:text-base mt-2 pl-2 font-[400] text-[#3F4348] leading-tight text-start w-full">
                                {grade.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>


            

        </div>
    );
};

export default CastingGradesScroll;