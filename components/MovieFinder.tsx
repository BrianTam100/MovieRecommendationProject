import Link from 'next/link'

const MovieFinder = () => {

    return (
        <div className="flex justify-center mt-10">
            <Link href = "/moviefinder/finder">
            <button
            className="
                px-6 py-3 
                bg-blue-600 
                text-white 
                rounded-xl
                shadow-md
                hover:bg-blue-700
                hover:shadow-lg
                transition-all 
                duration-300
                active:scale-95
            "
            >
            Find a Movie
            </button>

           </Link>
        </div>
    )
};


export default MovieFinder;
