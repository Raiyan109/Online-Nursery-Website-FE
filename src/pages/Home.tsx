import Category from "@/components/Category"
import Footer from "@/components/Footer"
import Gallery from "@/components/Gallery"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Products from "@/components/Products"

const Home = () => {
  return (
    // overflow-x-auto
    <div className="">
      <Navbar />
      <Hero />
      {/* <Category /> */}
      <Products />
      {/* <Gallery/> */}
      <Footer />
    </div>
  )
}

export default Home