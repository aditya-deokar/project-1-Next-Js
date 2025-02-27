"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain, Trophy } from "lucide-react";

const StatsCards = ({assessment}) => {

    const getAverageScore =()=>{
        if(!assessment?.length) return 0;
        const total = assessment.reduce(
            (sum , asses)=> sum + asses.quizScore,
            0
        );
        return (total / assessment.length).toFixed(1);
    };

    const getLatestAssessment =() =>{
        if(!assessment?.length) return null;
        return assessment[assessment.length-1];
    };

    const getTotalQuestions=()=>{
        if(!assessment?.length) return 0;
        return assessment.reduce(
            (sum,assessment)=> sum + assessment.questions.length,
            0
        );
    };






  return (
    <div className="grid gap-4 md:grid-cols-3">
        <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                        <Trophy className="text-muted-foreground h-4 w-4" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                getAverageScore()
                            }%
                        </div>
                        <p className="text-xs text-muted-foreground">Across all assessments</p>
                    </CardContent>
        </Card>
        <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
                        <Brain className="text-muted-foreground h-4 w-4" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                getTotalQuestions()
                            }
                        </div>
                        <p className="text-xs text-muted-foreground">Total Questions</p>
                    </CardContent>
        </Card>
        <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
                        <Trophy className="text-muted-foreground h-4 w-4" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold">
                            {
                                getLatestAssessment()?.quizScore.toFixed(1) || 0
                            }%
                        </div>
                        <p className="text-xs text-muted-foreground">Most Recent Quiz</p>
                    </CardContent>
        </Card>

    </div>
  )
}

export default StatsCards