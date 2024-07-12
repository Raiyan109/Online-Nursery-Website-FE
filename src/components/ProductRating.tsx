import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useState } from 'react';

const ProductRating = ({ item }) => {
    const [rating, setRating] = useState(item?.rating || 0);
    const [rateColor, setRateColor] = useState(0);

    const getStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <div className='flex items-start justify-start'>
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={index} color="#70e000" />
                ))}
                {halfStar && <FaStarHalfAlt color="#70e000" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaStar key={index} color="gray" />
                ))}
            </div>
        );
    };

    return (
        <p
            style={{
                transform: "translateZ(35px)",
            }}
            className="mx-auto text-xl absolute bottom-3 left-5 text-lightGreen font-bold"
        >
            {getStars(rating)}
        </p>
    );
};

export default ProductRating;
