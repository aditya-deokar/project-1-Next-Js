"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizResult from "./QuizResult";



const QuizList = ({assessment}) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);


    const router= useRouter();
    
  return (
    <>
          <Card >
              <CardHeader className="flex flex-row items-center justify-between"> 
                  <div >
                    <CardTitle className="gradient-title text-3xl md:text-4xl">Recent Quizzes</CardTitle>
                    <CardDescription>Review your past quiz performance</CardDescription>
                  </div>
                  <Button onClick={()=>router.push("/interview/mock")}>Start New Quiz</Button>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                    {
                        assessment.map((asses,i)=>{

                            return (
                                <Card
                                key={i}
                                onClick={()=> setSelectedQuiz(asses)}
                                className="cursor-pointer hover:bg-muted/50 transition-colors">
                                    <CardHeader>
                                        <CardTitle>Quiz {i+1}</CardTitle>
                                        <CardDescription className="flex justify-between w-full">
                                            <div>Score: {asses.quizScore.toFixed(1)}%</div>
                                            <div>
                                                {
                                                    format(
                                                        new Date(asses.createdAt),
                                                        "MMMM dd, yyyy HH:mm"
                                                    )
                                                }
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {
                                                asses.improvementTip
                                            }
                                        </p>
                                    </CardContent>
                                
                                </Card>
                            )

                        })
                    }
                  </div>
              </CardContent>
              
          </Card>

          {/* dialogue */}

          <Dialog open={!!selectedQuiz} onOpenChange={()=> setSelectedQuiz(null)}>
              
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                      <DialogTitle></DialogTitle>
                     
                  </DialogHeader>

                  <QuizResult
                    result={selectedQuiz}
                    onStartNew={()=>router.push("/interview/mock")}
                    hideStartNew
                  />
              </DialogContent>
          </Dialog>

    </>
  )
}

export default QuizList