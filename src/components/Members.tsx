import { useAnimate } from "framer-motion";
import InViewAnimation from "./InViewAnimation";
import member1 from '@/assets/player-1.png'
import member2 from '@/assets/player-2.png'
import member3 from '@/assets/player-3.png'
import member4 from '@/assets/player-4.png'
import member5 from '@/assets/player-5.png'
import member6 from '@/assets/player-6.png'
import member7 from '@/assets/2.jpeg'
import member8 from '@/assets/6.jpeg'
import member9 from '@/assets/7.jpeg'
import InViewRight from "./InViewRight";

const Members = () => {
    return (
        <div className=" px-4 py-32">
            <InViewAnimation>
                <h1 className="text-6xl text-white font-bold pb-20 lg:px-28 px-0 text-center lg:text-left">Our Members</h1>
            </InViewAnimation>
            {/* mx-auto max-w-7xl */}
            <div className="px-3 lg:px-32">
                <InViewRight>
                    <ClipPathLinks />
                </InViewRight>
            </div>
        </div>
    )
}


const ClipPathLinks = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x divide-neutral-900 bg-paste">
                <LinkBox Icon={member1} href="#" />
                <LinkBox Icon={member2} href="#" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-x divide-neutral-900 bg-paste">
                <LinkBox Icon={member3} href="#" />
                <LinkBox Icon={member4} href="#" />
                <LinkBox Icon={member5} href="#" />
                <LinkBox Icon={member6} href="#" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-x divide-neutral-900 bg-paste">
                <LinkBox Icon={member7} href="#" />
                <LinkBox Icon={member8} href="#" />
                <LinkBox Icon={member9} href="#" />
            </div>
        </div>
    );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href }) => {
    const [scope, animate] = useAnimate();

    const getNearestSide = (e) => {
        const box = e.target.getBoundingClientRect();

        const proximityToLeft = {
            proximity: Math.abs(box.left - e.clientX),
            side: "left",
        };
        const proximityToRight = {
            proximity: Math.abs(box.right - e.clientX),
            side: "right",
        };
        const proximityToTop = {
            proximity: Math.abs(box.top - e.clientY),
            side: "top",
        };
        const proximityToBottom = {
            proximity: Math.abs(box.bottom - e.clientY),
            side: "bottom",
        };

        const sortedProximity = [
            proximityToLeft,
            proximityToRight,
            proximityToTop,
            proximityToBottom,
        ].sort((a, b) => a.proximity - b.proximity);

        return sortedProximity[0].side;
    };

    const handleMouseEnter = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: ENTRANCE_KEYFRAMES[side],
        });
    };

    const handleMouseLeave = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: EXIT_KEYFRAMES[side],
        });
    };

    return (
        <a
            href={href}
            onMouseEnter={(e) => {
                handleMouseEnter(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave(e);
            }}
            className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
        >
            {typeof Icon === "string" ? (
                <img src={Icon} alt="member" className="text-xl sm:text-3xl lg:text-4xl w-20 h-20 md:w-32 md:h-32 object-contain" />
            ) : (
                <Icon className="text-xl sm:text-3xl lg:text-4xl" />
            )}

            <div
                ref={scope}
                style={{
                    clipPath: BOTTOM_RIGHT_CLIP,
                }}
                className="absolute inset-0 grid place-content-center bg-paste text-white"
            >
                {typeof Icon === "string" ? (
                    <img src={Icon} alt="member" className="text-xl sm:text-3xl md:text-4xl" />
                ) : (
                    <Icon className="text-xl sm:text-3xl md:text-4xl" />
                )}
            </div>
        </a>
    );
};

export default Members