import InViewAnimation from "@/components/InViewAnimation";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { FaAngellist } from "react-icons/fa";


const Success = () => {
    return (
        <div>
            <Navbar />
            <InViewAnimation>
                <div className="py-32 flex flex-col items-center justify-center gap-10">
                    <FaAngellist size={70} className="text-lightGreen" />
                    <h1 className="text-5xl text-white font-bold lg:px-28 px-0 text-center lg:text-left">Thank you For your shopping!</h1>
                    <Link to='/cart'>
                        <button className="btn-green-rounded text-xl py-3 px-5 rounded-full">Back to Cart</button>
                    </Link>
                </div>
            </InViewAnimation>

        </div>
    );
};

export default Success;