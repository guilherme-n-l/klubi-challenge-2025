import React from "react";

const Info: React.FC = () => {
    const infoData = [
        {
            img: "/assets/awesome.png",
            title: "Encontre <u>O</u> carro",
            content: "Use IA para escolher o carro que mais combina com seu estilo e necessidades, de forma rápida e sem complicação."
        },
        {
            img: "/assets/okay.png",
            title: "Compare e escolha",
            content: "Compare preços e características de veículos facilmente e faça a escolha certa para o seu bolso e preferências."
        },
        {
            img: "/assets/rocker.png",
            title: "Receba!",
            content: "Com o crédito na mão, é só escolher o veículo dos sonhos e dar um passo seguro rumo à sua conquista."
        }
    ];

    return (
        <div className="relative w-screen ml-40 h-[50vh] bg-[#afb1b1] rounded-l-full">
            <div className="ml-20 justify-between flex flex-row items-center h-[300px] max-w-[75%] gap-10">
                {infoData.map((item, index) => (
                    <div key={index} className="text-stone-800 flex flex-col items-start self-center mt-20">
                        <img src={item.img} className="w-[8vw] mb-3 self-center" alt={item.title}/>
                        <h2 dangerouslySetInnerHTML={{ __html: item.title }} className="pl-0 text-[1.5rem] self-center font-extrabold"></h2>
                        <p className="mt-1.5 max-w-[36ch] break-words leading-relaxed">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Info;
