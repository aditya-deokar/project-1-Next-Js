
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {


   

  return (
    <section className='w-full pt-36 md:pt-48 pb-10 '>
        <div className='space-y-6 text-center'>
            <div className='space-y-6 mx-auto'>
                <h1 className='gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl'>
                    Your AI Career Coach for
                    <br />
                    Professional Success
                </h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>Advance Your career with Personalized guidance, interview prep, and AI-powered tools for job success.</p>

            </div>

            <div className='flex justify-center space-x-4'>
                <Link href='/dashboard'>
                    <Button size="lg" className="px-8">Get Started</Button>
                </Link>
                <Link href='/dashboard'>
                    <Button size="lg" variant="outline" className="px-8">Get Started</Button>
                </Link>
            </div>

            <div className='hero-image-wrapper mt-5 md:mt-0'>
                <div className='hero-image hidden' >
                    <Image src={"/img/demo.jpg"} width={1280} height={720} alt='Dashboard Preview'
                    className='rounded-lg shadow-2xl border mx-auto'
                    priority
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection