import { useEffect, useState } from "react";
import Link from 'next/link'

const MovieFinder = () => {

    return (
        <div className = "ml-[20%]">
            <Link href = "/moviefinder/finder">
           <button className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"> Find a Movie</button>
           </Link>
        </div>
    )
};


export default MovieFinder;
