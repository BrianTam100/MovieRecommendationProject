import { useEffect, useState } from "react";
import { axios } from "axios";
import Link from "next/link";
import '../../components/globals.css'

const AllUpcomingMovies = () => {
    return(
        <div className = "min-h-screen flex flex-col bg-gradient-to-b from-slate-800 via-gray-950 to-slate-800 text-white">
            <h1 className = "text-bold mt-16 ml-[20%]">
                Upcoming Movies
            </h1>
        </div>
    )
}

export default AllUpcomingMovies;