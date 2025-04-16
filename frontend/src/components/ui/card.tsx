import React from "react";
import {BackgroundGradient} from "@/components/ui/background-gradient.tsx";

interface CardProps {
    imageUrl: string;
    title: string;
    description: string;
    price: number;
}

const Card: React.FC<CardProps> = ({imageUrl, title, description, price}) => (
    <div className="flex justify-center">
        <BackgroundGradient className="rounded-[22px] w-[250px] h-[400px] bg-white">
            <div className="flex flex-col h-full">
                <img
                    src={imageUrl}
                    className="w-full h-[180px] object-cover rounded-t-[22px]"
                    alt={title}
                />

                <div className="flex flex-col justify-between flex-1 p-4">
                    <div>
                        <p className="text-lg font-semibold text-black mb-2">{title}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
                    </div>

                    <div className="flex flex-col items-center gap-2 mt-4">
                        <button
                            className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black text-xs font-bold dark:bg-zinc-800"
                        >
                            <span>Comprar</span>
                            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                R${price.toLocaleString("pt-BR")}
                            </span>
                        </button>
                        <button
                            className="rounded-full px-4 py-1 text-white bg-black text-xs font-bold dark:bg-zinc-800"
                        >
                            Encontrar semelhante
                        </button>
                    </div>
                </div>
            </div>
        </BackgroundGradient>
    </div>
);

export default Card;
