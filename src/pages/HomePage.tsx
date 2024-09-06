import { Benefits, ExploreChallenges, HeroSection, Stats } from "../components/Homepage";


export default function HomePage() {
  return (
    <main className=' w-full min-h-screen flex flex-col items-center justify-start  bg-white '>
      <HeroSection/>
      <Stats/>
      <Benefits/>
      <ExploreChallenges/>
    </main>
  )
}
