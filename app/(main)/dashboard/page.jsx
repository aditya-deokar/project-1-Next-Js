import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async() => {

    // check if user is already onboarded
const { isOnboarded }= await getUserOnboardingStatus();

if(!isOnboarded){
  redirect("/onboarding");
}


  return (
    <div>DashboardPage
    
    </div>
  )
}

export default DashboardPage