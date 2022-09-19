import { useEffect } from "react"

export default function Home(){

    useEffect(() => {

    }, [])

    return(
        <div className="container mx-auto text-center">
            <header className="mt-10">
                <div className="home-title text-6xl">
                    Welcome to Zbind'Amazon
                </div>
                <div className="home-subtitle text-md text-slate-500 italic">
                    Find here the best products for you, and your family !
                </div>
            </header>
            <main className="container grid grid-cols-2 mt-10 gap-5">
                <div>
                    <div className="text-3xl ring-2 ring-slate-700 p-2">
                        Top trending products
                    </div>
                    <Carousel>
                </div>
                <div>
                    <div className="text-3xl ring-2 ring-slate-700 p-2">
                        Top trending products
                    </div>
                </div>
            </main>
        </div>
    )
}