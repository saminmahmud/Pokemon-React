import React, { useEffect, useState } from "react";
import { Link } from "react-router";  
import { MdOutlineFavorite } from "react-icons/md";

const Card = (props) => {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorite')) || [];
        setFavorite(storedFavorites);
    }, []);

    const handleFav = (imgSrc, name) => {
        const updatedFavorites = [...favorite];
        const favoriteExists = updatedFavorites.some((fav) => fav.name === name);

        if (favoriteExists) {
            const filteredFavorites = updatedFavorites.filter((fav) => fav.name !== name);
            setFavorite(filteredFavorites);
            localStorage.setItem('favorite', JSON.stringify(filteredFavorites));
        } else {
            const newFavorite = { name, imgSrc };
            updatedFavorites.push(newFavorite);
            setFavorite(updatedFavorites);
            localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
        }
    };

    const isFavorite = favorite.some(fav => fav.name === props.pokemon.name);

    return (
        <div className="card bg-base-100 w-64 border border-black shadow-xl p-2 rounded-md">
            <figure>
                <img
                  className="border-b-2"
                    src={props.pokemon.sprites.other.dream_world.front_default}
                    alt={props.pokemon.name.toUpperCase()}
                    width={150}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-semibold">
                    {props.pokemon.name.toUpperCase()}
                </h2>

                <div className="mt-1 flex justify-around items-center">
                    <Link to={`/pokemon/${props.pokemon.name}`} className="bg-amber-300 px-2 py-1 rounded-md shadow-sm">View Details</Link>
                    <MdOutlineFavorite 
                        onClick={() => handleFav(props.pokemon.sprites.other.dream_world.front_default, props.pokemon.name)} 
                        className={`text-2xl cursor-pointer ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;
