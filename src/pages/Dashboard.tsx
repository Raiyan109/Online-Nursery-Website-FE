import { FaLeaf } from "react-icons/fa6";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";



const Dashboard = () => {

  return (
    <div className="bg-darkBrown text-slate-100 flex">
      <SideNav />
      <div className="w-full">
        <div className="h-[35px] m-4 rounded border-2 border-dashed border-paste bg-darkBrown"></div>
        {/* border-2 border-dashed border-paste */}
        <div className=" m-4 rounded  bg-darkBrown">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const SideNav = () => {
  const [selected, setSelected] = useState(0);

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    // h-[500px]
    <nav className="h-screen w-fit bg-paste p-4 flex flex-col items-center gap-2">
      <Link to='/'>
        <IoMdArrowRoundBack size={40} className="text-darkBrown mb-5 cursor-pointer hover:text-lightGreen transition-all duration-75" />

      </Link>
      <NavItem selected={selected === 0} id={0} setSelected={setSelected} to='/dashboard'>
        <FaLeaf />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected} to='/dashboard/addProduct'>
        <AiFillFileAdd />
      </NavItem>

    </nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, to }) => {
  return (
    <Link to={to}>
      <motion.button
        className="p-3 text-xl bg-darkBrown hover:bg-darkBrown/90 rounded-md transition-colors relative"
        onClick={() => setSelected(id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="block relative z-10">{children}</span>
        <AnimatePresence>
          {selected && (
            <motion.span
              className="absolute inset-0 rounded-md bg-lightGreen z-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            ></motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </Link>
  );
};

export default Dashboard