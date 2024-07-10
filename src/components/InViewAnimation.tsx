import { useRef } from "react";
import { useInView } from "framer-motion";


const InViewAnimation = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref}>
            <span
                style={{
                    transform: isInView ? "none" : "translateX(-200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
                className="block -translate-x-[100px] opacity-0"
            >
                {children}
            </span>
        </div>
    )
}

export default InViewAnimation