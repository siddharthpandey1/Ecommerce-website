import { Button } from "./button";
import React from "react";
import { X } from "lucide-react";

const FilterSidebar = ({
    search, setSearch, category, setCategory, brand, setBrand,
    setPriceRange, allProducts, priceRange, isOpen, onClose
}) => {
    const Categories = allProducts.map(p => p.category)
    const UniqueCategory = ["All", ...new Set(Categories)]

    const Brands = allProducts.map(p => p.brand)
    const UniqueBrand = ["All", ...new Set(Brands)]

    const handleCategoryClick = (val) => {
        setCategory(val)
    }
    const handleBrandChange = (e) => {
        setBrand(e.target.value)
    }

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        if (value <= priceRange[1]) setPriceRange([value, priceRange[1]])
    }

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        if (value >= priceRange[0]) setPriceRange([priceRange[0], value])
    }

    const resetFilters = () => {
        setSearch("");
        setCategory("All");
        setBrand("All");
        setPriceRange([0, 999999])
    }

    return (
        <>
            {/* mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                bg-gray-100 p-4 rounded-md w-72 md:w-64
                fixed md:static top-0 left-0 h-full md:h-max z-40
                overflow-y-auto md:mt-10
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}>
                {/* mobile header with close btn */}
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="font-semibold text-xl">Filters</h2>
                    <button onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
                />

                {/* category */}
                <h1 className="mt-5 font-semibold text-xl">Category</h1>
                <div className="flex flex-col gap-2 mt-3">
                    {
                        UniqueCategory.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="radio" checked={category === item} onChange={() => handleCategoryClick(item)} />
                                <label htmlFor="">{item}</label>
                            </div>
                        ))
                    }
                </div>

                {/* Brand */}
                <h1 className="mt-5 font-semibold text-xl">Brand</h1>
                <select className="bg-white w-full p-2 border-gray-200 border-2 rounded-md" value={brand} onChange={handleBrandChange} >
                    {
                        UniqueBrand.map((item, index) => {
                            return <option key={index} value={item} >{item.toUpperCase()}</option>
                        })
                    }
                </select>

                {/* Price */}
                <h1 className="mt-5 font-semibold text-xl">Price Range</h1>
                <div className="flex flex-col gap-2">
                    <label>
                        Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <div className="flex gap-2 items-center">
                        <input type="number" min="0" max="999999" value={priceRange[0]} onChange={handleMinChange} className="w-20 p-1 border border-gray-300 rounded" />
                        <span>-</span>
                        <input type="number" min="0" max="999999" value={priceRange[1]} onChange={handleMaxChange} className="w-20 p-1 border border-gray-300 rounded" />
                    </div>
                    <input type="range" min="0" max="5000" step="100" className="w-full" value={priceRange[0]} onChange={handleMinChange} />
                    <input type="range" min="0" max="99999" step="100" className="w-full" value={priceRange[1]} onChange={handleMaxChange} />
                </div>

                {/* Reset button */}
                <Button onClick={resetFilters} className="bg-pink-600 text-white mt-5 cursor-pointer w-full">Reset Filters</Button>
            </div>
        </>
    )
}
export default FilterSidebar