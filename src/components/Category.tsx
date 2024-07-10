import { useGetCategoriesQuery } from "@/redux/features/productApi"
import InViewAnimation from "./InViewAnimation"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import InViewRight from "./InViewRight";

const Category = () => {


  return (
    <div className="pt-20 px-12">
      <InViewAnimation>
        <h1 className="text-6xl text-white font-bold -mb-28">Most Popular Categories</h1>
      </InViewAnimation>
      <InViewRight>
        <HorizontalScrollCarousel />
      </InViewRight>
      {/* bg-neutral-800 */}
      <div className="">
        {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </div> */}

        {/* <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </div> */}
      </div>
    </div>
  )
}

const HorizontalScrollCarousel = () => {
  const { data, error, isLoading } = useGetCategoriesQuery(undefined)
  console.log(data?.data);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["28%", "-75%"]);

  return (
    // bg-neutral-900
    <section ref={targetRef} className="relative h-[300vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data?.data?.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card._id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.category}
        </p>
      </div>
    </div>
  );
};

export default Category