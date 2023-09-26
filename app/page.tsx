import Image from 'next/image'
import Makelogo from './components/Makelogo'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg1.jpeg')] bg-no-repeat bg-fixed bg-cover ">
       <Makelogo />
      
    </main>
  )
}
