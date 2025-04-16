import React from "react";
import {ParticleButton} from "@/components/ui/particle-button.tsx";

interface BannerProps {
    onScrollClick: () => void;
}

const Banner: React.FC<BannerProps> = ({onScrollClick}) => {
    return (
        <div className="relative w-screen h-[60vh] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="absolute inset-0 z-0 translate-x-1/4 -translate-y-1/2 object-cover">
                <video
                    className="w-full h-auto"
                    src="/assets/car-video.mp4"
                    loop
                    muted
                    autoPlay
                    playsInline
                ></video>
            </div>

            <div className="absolute z-20 bottom-20 left-[72%]">
                <ParticleButton className="!bg-amber-200 text-black" onClick={onScrollClick}>
                    Vamos lá
                </ParticleButton>
            </div>

            <div className="relative z-10 flex h-full">
                <div className="flex flex-col justify-center text-center p-6 bg-white w-[60%] rounded-r-full shadow-lg">
                    <h1 className="text-xl font-bold mb-2">
                        Quer conseguir um carro que cabe no seu bolso?
                    </h1>
                    <h2 className="text-2xl">Deixa com a gente!</h2>
                </div>
            </div>
        </div>
    );
};

export default Banner;
