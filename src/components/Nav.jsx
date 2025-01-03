import React from "react";
import { Link } from "react-router";
import { TiHome } from "react-icons/ti";
import { MdOutlineFavorite } from "react-icons/md";


const Nav = () => {
    return (
        <div className="p-2 sm:p-5 bg-gray-300 shadow-md">
            <div className="flex justify-around items-center ">
                <h1 className="text-lg sm:text-2xl font-bold shadow-md">Pokemon</h1>


                <ul className="flex justify-center items-center gap-3 sm:hidden">
                    <li><Link to="/"><TiHome className="text-2xl"/></Link></li>
                    <li><Link to="/favorites"><MdOutlineFavorite className="text-2xl"/></Link></li>
                </ul>

                <ul className="sm:flex justify-center items-center gao-2 gap-5 hidden ">
                    <li><Link className="text-lg font-semibold gap-5" to="/">Home</Link></li>
                    <li><Link className="text-lg font-semibold gap-5" to="/favorites">Favorites</Link></li>
                </ul>


                {/* <div className="flex justify-center gap-2 pt-2 ">
                    <ul className="flex justify-center items-center gao-2 sm:gap-5">
                        <li><Link to="/"><TiHome className="text-2xl"/></Link></li>
                        <li><Link to="/favorites"><MdOutlineFavorite className="text-2xl"/></Link></li>
                    </ul>

                    <div>
                        <input className="w-36 sm:w-48 py-1 rounded-md px-2 border-none" type="search" name="search" id="search" placeholder="search..."/>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Nav;
