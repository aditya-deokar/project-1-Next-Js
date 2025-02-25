import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center'>
        <h1 className='text-6xl font-bold gradient-title mb-4'>
            404
        </h1>

        <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
        <P>Oops! The page you&apos;re looking for doesn't exist or has been moved.</P>

        <Link href="/">
            <Button>Return Home</Button>
        </Link>
    </div>
  )
}

export default NotFound