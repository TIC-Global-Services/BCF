import { AboutBanner } from "@/Assets/About"


import { Bodoni_Moda } from "next/font/google"
import Hero from "../Reusable/HeroContainer"

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