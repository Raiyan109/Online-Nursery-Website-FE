import bg from '@/assets/hero-video.mp4'
import styles from '@/styles/hero.module.css'
const Hero = () => {
  return (
    <section className={styles.box}>
      <div className={styles.overlay}></div>

      <video src={bg} autoPlay muted loop></video>
      <h1>Yoga center</h1>
      <h3>Lorem ipsum, dolor sit amet </h3>
    </section>
  )
}

export default Hero