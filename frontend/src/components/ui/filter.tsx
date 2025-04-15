import React, { useState, useEffect } from "react";

interface FilterProps {
    brands: string[];
    locations: string[];
    minPrice: number;
    maxPrice: number;
    onFilterChange: (filters: {
        brand: string;
        location: string;
        price: number;
    }) => void;
}

const Filter: React.FC<FilterProps> = ({ brands, locations, minPrice, maxPrice, onFilterChange }) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(maxPrice);

    useEffect(() => {
        setSelectedPrice(maxPrice);
    }, [maxPrice]);

    const handleFilter = () => {
        onFilterChange({
            brand: selectedBrand,
            location: selectedLocation,
            price: selectedPrice
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 px-10 pb-10 text-white">
            <div className="flex flex-col">
                <label htmlFor="brand" className="mb-2 font-semibold">Marca</label>
                <select
                    id="brand"
                    className="bg-[#333] text-white p-2 rounded"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">Todas</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="price" className="mb-2 font-semibold">Preço máximo</label>
                <input
                    id="price"
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step="1000"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(Number(e.target.value))}
                    className="accent-[#f59e0b]"
                />
                <span className="mt-1 text-sm text-gray-300">
                    Até R$ {selectedPrice.toLocaleString('pt-BR')}
                </span>
            </div>

            <div className="flex flex-col">
                <label htmlFor="location" className="mb-2 font-semibold">Localização</label>
                <select
                    id="location"
                    className="bg-[#333] text-white p-2 rounded"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="">Todas</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-end">
                <button
                    onClick={handleFilter}
                    className="bg-[#f59e0b] text-white p-3 rounded h-fit mt-6"
                >
                    Filtrar
                </button>
            </div>
        </div>
    );
};

export default Filter;
