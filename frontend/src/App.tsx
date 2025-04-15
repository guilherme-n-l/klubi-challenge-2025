import { useRef } from "react";
import './App.css';
import Header from "@/components/blocks/Header.tsx";
import Banner from "@/components/blocks/Banner.tsx";
import Info from "@/components/blocks/Info.tsx";
import Catalogue from "@/components/blocks/Catalogue.tsx";
import Footer from "@/components/blocks/Footer.tsx";

function App() {
    const catalogueRef = useRef<HTMLDivElement>(null);

    const scrollToCatalogue = () => {
        console.log("Button clicked to scroll to Catalogue");
        if (catalogueRef.current) {
            catalogueRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Header/>
            <Banner onScrollClick={scrollToCatalogue}/>
            <Info/>
            <div ref={catalogueRef}>
                <Catalogue/>
            </div>
            <Footer/>
        </>
    );
}

export default App;
