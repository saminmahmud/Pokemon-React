import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IoArrowBack } from "react-icons/io5";

const Details = () => {
    const { name } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch Pokémon data using the dynamic name parameter
        const fetchPokemonDetails = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            const data = await response.json();
            setPokemonDetails(data);
        };

        fetchPokemonDetails();
    }, [name]); 

    if (!pokemonDetails) {
        return <div>Loading...</div>;
    }

    console.log(pokemonDetails);

    return (
        <div className="flex justify-center items-center h-[95%]">
            <div className="w-[95%] md:w-[45%] p-5 mt-5 sm:mt-0 rounded-md shadow-xl">
                <div className="flex-col justify-center items-center">
                <IoArrowBack className="text-xl sm:text-2xl cursor-pointer" onClick={()=> navigate("/")}/>
                    <div className="w-[50%] m-auto">
                        <img
                            src={pokemonDetails.sprites.front_default}
                            alt={pokemonDetails.name}
                            width={300}
                        />
                        <div className="flex items-center">
                            <h1 className="text-lg sm:text-xl font-bold">Name: </h1>
                            <p className="text-md sm:text-lg font-semibold">
                                {pokemonDetails.name}
                            </p>
                        </div>

                        <div className="flex">
                            <h1 className="text-lg sm:text-xl font-bold">Abilities:</h1>
                            <div>
                                {pokemonDetails.abilities.map((ability, index) => {
                                    return (
                                        <p
                                            className="text-md sm:text-lg font-semibold"
                                            key={index}
                                        >
                                            {ability.ability.name}
                                            {pokemonDetails.abilities.length ==
                                            index + 1
                                                ? ""
                                                : ","}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <h1 className="text-lg sm:text-xl font-bold">Types:</h1>
                            {pokemonDetails.types.map((type, index) => {
                                return (
                                    <p
                                        className="text-md sm:text-lg font-semibold"
                                        key={index}
                                    >
                                        {type.type.name}
                                        {pokemonDetails.types.length ===
                                        index + 1
                                            ? " "
                                            : ", "}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="flex">
                            <h1 className="text-xl font-bold">Base stats:</h1>
                            <div>
                                {pokemonDetails.stats.map((stat, index) => {
                                    return (
                                        <p
                                            className="text-md sm:text-lg font-semibold"
                                            key={index}
                                        >
                                            {stat.stat.name}: {stat.base_stat}
                                            {pokemonDetails.stats.length ===
                                            index + 1
                                                ? ""
                                                : ", "}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// console.log(pokemonDetails.types)
export default Details;
