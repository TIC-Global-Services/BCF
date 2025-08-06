
import { HeroBanner } from '@/assets/Home'
import { Bodoni_Moda } from "next/font/google"
import Hero from '../Reusable/HeroContainer'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const heroContent = {
  title: ['BHUMA', 'CAST', 'FACTORY'],
  subtitle: ['Metals', 'Engineered for', 'Your Need'],
  buttonText: 'Contact Us',
  backgroundImage: HeroBanner.src,
  fontClassName: bodoni.className
}


const HomePage = () => {
  return (
    <div>
      <Hero isRight={true} content={heroContent} />
    </div>
  )
}

export default HomePage;