import React, { useEffect, useState } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router"; 

const Favorites = () => {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorite')) || [];
        setFavorite(storedFavorites);
    }, []);

    const handleRemoveFav = (name) => {
        const updatedFavorites = favorite.filter((fav) => fav.name !== name);
        setFavorite(updatedFavorites);
        localStorage.setItem('favorite', JSON.stringify(updatedFavorites)); 
    };

    return (
        <div className="container mx-auto p-5">
            <h2 className="text-3xl font-semibold mb-5">Your Favorite Pokémon</h2>
            <div className="grid grid-cols-3 gap-4">
                {favorite.length === 0 ? (
                    <p className="text-lg font-semibold">No favorites yet!</p>
                ) : (
                    favorite.map((fav, index) => (
                        <div key={index} className="card bg-base-100 border border-black shadow-xl p-2 rounded-md">
                            <figure>
                                <img
                                    className="border-b-2"
                                    src={fav.imgSrc}
                                    alt={fav.name}
                                    width={150}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-semibold">{fav.name.toUpperCase()}</h2>
                                <div className="flex justify-end items-center mt-2">
                                    <button  onClick={() => handleRemoveFav(fav.name)} className="bg-amber-300 px-2 py-1 rounded-md shadow-sm">
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;
