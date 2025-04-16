import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card.tsx";
import Filter from "@/components/ui/filter.tsx";

interface CarData {
    Name: string;
    Model: string;
    Image: string;
    Price: number;
    Location: string;
}

const Catalogue: React.FC = () => {
    const [cars, setCars] = useState<CarData[]>([]);
    const [filteredCars, setFilteredCars] = useState<CarData[]>([]);

    const [brands, setBrands] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((data: CarData[]) => {
                setCars(data);
                setFilteredCars(data); // Show all by default

                const uniqueBrands = Array.from(new Set(data.map(car => car.Name)));
                const uniqueLocations = Array.from(new Set(data.map(car => car.Location)));
                const prices = data.map(car => car.Price);

                setBrands(uniqueBrands);
                setLocations(uniqueLocations);
                setMinPrice(Math.min(...prices));
                setMaxPrice(Math.max(...prices));
            })
            .catch((err) => console.error("Erro ao carregar os dados dos carros:", err));
    }, []);

    const handleFilterChange = (filters: {
        brand: string;
        location: string;
        price: number;
    }) => {
        const { brand, location, price } = filters;
        let result = cars;

        if (brand) result = result.filter(car => car.Name === brand);
        if (location) result = result.filter(car => car.Location === location);
        result = result.filter(car => car.Price <= price);

        setFilteredCars(result);
    };

    return (
        <>
            <div className="relative w-screen min-h-[7vh] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#242424] [border-top-left-radius:50%] [border-top-right-radius:50%]"/>
            <div className="relative w-screen h-full overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#242424]">
                <h1 className="font-bold text-stone-50 m-10 !text-[3rem]">
                    Conheça os nossos produtos!
                </h1>

                <div className="flex flex-col items-center">
                    <Filter
                        brands={brands}
                        locations={locations}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onFilterChange={handleFilterChange}
                    />

                    <div className="max-h-[600px] overflow-y-auto w-[80%] px-4 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCars.map((car, index) => (
                                <Card
                                    key={index}
                                    imageUrl={`/assets/cars/${car.Image}`}
                                    title={`${car.Name} ${car.Model}`}
                                    description={`Local: ${car.Location}`}
                                    price={car.Price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalogue;
