import React from "react";

const Footer: React.FC = () => (
    <footer className="w-full bg-[#1a1a1a] text-white text-sm py-6 m-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left">
                © {new Date().getFullYear()} Klubi Challenge 2025. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
                <a href="#" className="hover:underline">Política de Privacidade</a>
                <a href="#" className="hover:underline">Termos de Uso</a>
                <a href="#" className="hover:underline">Contato</a>
            </div>
        </div>
    </footer>
);

export default Footer;
