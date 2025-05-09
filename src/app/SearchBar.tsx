import React, { useState } from "react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for: ", searchQuery);
    }

    return(
        <div className = "flex justify-center mt-10">
            <form onSubmit = {handleSearch} className = "flex items-center">
            <input
            type = "text"
            value = {searchQuery}
            onChange = {handleInput}
            placeholder= "Search..."
            className = "p-2 border border-black text-black"
            />
            <button
            type = "submit"
            className = "p-2 bg-blue-500 text-black"
            >
            Search
            </button>
            </form>
        </div>
    );
};

export default SearchBar;