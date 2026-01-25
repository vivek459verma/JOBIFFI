import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SponsorCompaines = () => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -300,
            behavior:"smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left : 300,
            behavior : "smooth",
        })
    }

    // const compaines = [
        
    // ]
    return (
        <>
            <div className="w-full bg-gradient-to-r from-blue-50 via-cyan-50 to-green-50 py-16 rounded-[40px]">
                <h1 className="text-center text-2xl font-bold">Sponsored Companies</h1>
                <div className="relative mt-10">
                    <button onClick={scrollLeft} className="hidden md:flex absolute left-15 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow-z-10 hover-bg-gray-100">
                        <AiOutlineLeft size={20} />
                    </button>
                    <div>
                        
                    </div>
                  {/* RIGHT BUTTON */}
                           <button
                             onClick={scrollRight}
                             className="hidden md:flex absolute right-15 top-1/2 -translate-y-1/2 
                             bg-white border rounded-full p-2 shadow z-10 hover:bg-gray-100"
                           >
                             <AiOutlineRight size={20} />
                           </button>
                </div>
            </div>
        </>
    )
}
export default SponsorCompaines;