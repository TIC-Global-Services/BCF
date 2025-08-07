import { useState } from "react";

interface StatsCardProps {
    number: string;
    suffix: string;
    description: string;
    index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ number, suffix, description, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Split the number into individual digits for staggered animation
    const digits = number.split('');

    return (
        <div
            className={`h-44 md:h-full relative overflow-hidden rounded-2xl p-8 py-4 transition-all duration-500 ease-in-out cursor-pointer group ${isHovered ? 'bg-black text-white ' : 'bg-[#F9F8F7] text-gray-800 '
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            {/* Background gradient overlay for hover effect */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-gray-900 to-black transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Content container */}
            <div className="relative z-10 h-full w-full flex flex-col justify-center">
                {/* Number with sliding animation */}
                <div className="relative h-8 md:h-12 overflow-hidden">
                    {/* Default state numbers */}
                    <div
                        className={`absolute inset-0 flex items-center md:justify-start justify-center transition-all duration-500 ease-in-out ${isHovered ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
                            }`}
                    >
                        <span className="text-3xl md:text-4xl font-medium flex">
                            {digits.map((digit, idx) => (
                                <span
                                    key={`default-${idx}`}
                                    className="inline-block transition-all duration-500 ease-in-out"
                                    style={{
                                        transitionDelay: `${idx * 60}ms`
                                    }}
                                >
                                    {digit}
                                </span>
                            ))}
                            <span
                                className="ml-0.5 transition-all duration-500 ease-in-out"
                                style={{
                                    transitionDelay: `${digits.length * 60}ms`
                                }}
                            >
                                {suffix}
                            </span>
                        </span>
                    </div>

                    {/* Hover state numbers sliding from bottom */}
                    <div
                        className={`absolute inset-0 flex items-center md:justify-start justify-center transition-all duration-500 ease-in-out ${isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
                            }`}
                    >
                        <span className="text-3xl md:text-4xl font-medium text-white flex">
                            {digits.map((digit, idx) => (
                                <span
                                    key={`hover-${idx}`}
                                    className="inline-block transition-all duration-500 ease-in-out"
                                    style={{
                                        transitionDelay: `${idx * 60 + 100}ms`
                                    }}
                                >
                                    {digit}
                                </span>
                            ))}
                            <span
                                className="ml-0.5 transition-all duration-500 ease-in-out"
                                style={{
                                    transitionDelay: `${digits.length * 60 + 100}ms`
                                }}
                            >
                                {suffix}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Description with sliding animation */}
                <div className="relative md:h-12 h-8 overflow-hidden text-xs md:text-base">
                    {/* Default description */}
                    <div
                        className={`absolute inset-0 flex items-center md:justify-start justify-center transition-all duration-500 ease-in-out ${isHovered ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
                            }`}
                    >
                        <p className="text-gray-600 font-medium transition-all duration-500 ease-in-out">
                            {description}
                        </p>
                    </div>

                    {/* Hover description sliding from bottom */}
                    <div
                        className={`absolute inset-0 flex items-center md:justify-start justify-center transition-all duration-500 ease-in-out ${isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
                            }`}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <p className="text-white font-medium transition-all duration-500 ease-in-out">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default StatsCard