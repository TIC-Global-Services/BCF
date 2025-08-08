import { StatusCardRight } from '@/Assets/About';
import { LogoImg } from '@/Assets/Common';
import Image from 'next/image';
import React from 'react';
import Container from '../../Reusable/Container';
import StatsCard from './Card';

interface StatData {
    number: string;
    suffix: string;
    description: string;
}

const StatsCardsComponent: React.FC = () => {
    const statsData: StatData[] = [
        {
            number: "15",
            suffix: "+",
            description: "Years of Experience"
        },
        {
            number: "100",
            suffix: "+",
            description: "Project completed"
        },
        {
            number: "97",
            suffix: "%",
            description: "Client satisfaction rate"
        },
        {
            number: "75",
            suffix: "%",
            description: "Conversion rate improvement"
        }
    ];

    return (
        <Container className='py-40'>
            <div className="min-h-screen">
                <div className=" mx-auto">
                    <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-6 items-center bg-white p-4 rounded-4xl">
                        {/* Left Side - Stats Cards */}
                        <div className="hidden md:grid gap-4 h-full ">
                            {statsData.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    number={stat.number}
                                    suffix={stat.suffix}
                                    description={stat.description}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Mobile Card */}
                        <div className="md:hidden grid grid-cols-2 gap-4 h-full ">
                            {statsData.slice(0, 2).map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    number={stat.number}
                                    suffix={stat.suffix}
                                    description={stat.description}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Right Side - Image with Logo */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl ">
                                <Image
                                    src={StatusCardRight}
                                    alt="Industrial facility"
                                    width={400}
                                    height={400}
                                    className="w-full  object-cover z-50"
                                />


                                {/* Logo Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src={LogoImg}
                                        alt="Industrial facility"
                                        width={200}
                                        height={200}
                                        className=" object-cover"
                                    />
                                </div>

                            </div>

                            {/* Decorative background elements */}
                            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl" />
                        </div>


                        {/* Mobile Card */}
                        <div className="md:hidden grid grid-cols-2 gap-4 h-full ">
                            {statsData.slice(2, 5).map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    number={stat.number}
                                    suffix={stat.suffix}
                                    description={stat.description}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default StatsCardsComponent;