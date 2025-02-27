import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/StatsCards';
import PerformanceChart from './_components/PerformanceChart';
import QuizList from './_components/QuizList';

const InterviewPage = async() => {

  const assessment = await getAssessments();
  return (
    <div>
      <h1 className='text-6xl font-bold gradient-title mb-5'>
        Interview Preparation
      </h1>

      <div className='space-y-6'>
        <StatsCards assessment={assessment}/>
        <PerformanceChart assessment={assessment}/>
        <QuizList assessment={assessment}/>
      </div>
    </div>
  )
}

export default InterviewPage