import Hero from "../Reusable/HeroContainer"
import { AboutBanner } from '@/assets/About/index'
import { Bodoni_Moda } from "next/font/google"

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const heroContent = {
  title: ['ABOUT'],
  buttonText: 'Contact Us',
  backgroundImage: AboutBanner.src,
  fontClassName: bodoni.className
}


const HomePage = () => {
  return (
      <Hero content={heroContent} />
  )
}

export default HomePage;