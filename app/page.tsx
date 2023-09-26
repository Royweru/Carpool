import Image from 'next/image'
import Makelogo from './components/Makelogo'
import Slider from './components/Slider'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start  bg-white ">
      <Slider />
       <Makelogo />
       
    </main>
  )
}
