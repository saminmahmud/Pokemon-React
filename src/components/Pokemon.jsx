import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import notFound from "../assets/notFound.jpg";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const [pokemonPerPage] = useState(12);

    const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

    const fetchPokemon = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });
            // console.log(detailedPokemonData);

            const detailedResponses = await Promise.all(detailedPokemonData);
            // console.log(detailedResponses);

            setPokemon(detailedResponses);
            setLoading(false);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    const filteredPokemon = pokemon.filter((pokemonItem) => {
        return pokemonItem.name.toLowerCase().includes(search.toLowerCase());
    });

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

    return (
        <section className="text-center my-3">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search here"
                className="input input-bordered w-full max-w-xs  border-2 border-gray-400 p-2 rounded-md "
            />

            {loading ? (
                <div className="flex flex-col items-center justify-center mt-14">
                    <span className="loading loading-spinner text-success w-14 h-14"></span>
                </div>
            ) : filteredPokemon.length > 0 ? (
                <>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6 justify-center items-center place-items-center">
                    {currentPokemon.map((currdata) => (
                        <Card key={currdata.id} pokemon={currdata} />
                    ))}
                </div>
                <div className="w-full mt-6 max-w-xs mx-auto border-t-2 border-gray-400 pt-2">
                    <div className=" flex items-center justify-center space-x-4 ">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn bg-sky-400 text-white hover:bg-sky-500 disabled:bg-sky-200 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            Previous
                        </button>

                        <span className="text-lg font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn bg-sky-400 text-white hover:bg-sky-500 disabled:bg-sky-200 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
                        >
                            Next
                        </button>
                    </div>
                </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center mt-14">
                    <img
                        src={notFound}
                        alt="No Pokémon found"
                        className="rounded-md"
                        width={300}
                    />
                    <p className="text-lg mt-4 text-red-500">
                        No Pokémon found
                    </p>
                </div>
            )}

            
        </section>
    );
};

export default Pokemon;
