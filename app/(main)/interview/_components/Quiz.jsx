"use client";

import { generateQuize, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuizResult from "./QuizResult";

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuize);

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData: setResultData,
    } = useFetch(saveQuizResult);

    console.log(resultData);

    useEffect(() => {
      if(quizData){
        setAnswer(new Array(quizData.length).fill(null));
      }

    }, [quizData])

    const handleAnswer =(answer)=>{
        const newAnswer = [...answer];
        newAnswer[currentQuestion]= answer;
        setAnswer(newAnswer);
    };

    const handleNext=()=>{
        if(currentQuestion < quizData.length-1){
            setCurrentQuestion(currentQuestion +1);
            setShowExplanation(false);
        }else{
            finishQuiz();
        }
    }

    const calculateScore = () => {
        let correct = 0;
        answer.forEach((answer, index) => {
          if (answer === quizData[index]?.correctAnswer) {
            correct++;
          }
        });
        return (correct / quizData.length) * 100;
      };
    
    const finishQuiz = async()=>{
        const score= calculateScore();

        try {
            await saveQuizResultFn(quizData, answer, score)
            toast.success("Quiz completed!");
        } catch (error) {
            toast.error(error.message || "failed to save quiz results")
        }
    }


    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswer([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
      }; 


    if(generatingQuiz){
        return <BarLoader className="mt-4" width={"100%"} color="gray"/>
    }

    
  // Show results if quiz is completed
    if (resultData) {
        return (
        <div className="mx-2">
            <QuizResult result={resultData} onStartNew={startNewQuiz} />
        </div>
        );
    }


    if(!quizData){
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to text your knowledge?</CardTitle>
                    
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and skills. take your time and choose the best answer for each questions.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn} className="w-full">Start Quiz</Button>
                </CardFooter>
            </Card>
        )
    }


    const question = quizData[currentQuestion];

  return (
   <Card className="mx-2">
                <CardHeader>
                    <CardTitle>{currentQuestion + 1} of {quizData.length}</CardTitle>
                    
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg font-medium">
                        {question.question}
                    </p>

                    <RadioGroup
                    onValueChange={handleAnswer}
                    value={answer[currentQuestion]}
                    className="space-y-2">
                       {
                        question.options.map((option, index)=>{
                            return (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
                            )
                        })
                       }
                     
                    </RadioGroup>

                    {
                        showExplanation && (
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="font-medium">Explanation</p>
                                <p className="text-muted-foreground">{question.explanation}</p>
                            </div>
                        )
                    }

                </CardContent>
                <CardFooter>
                    {
                        !showExplanation && (
                            <Button 
                                onClick={()=> setShowExplanation(true)}
                                variant="outline"
                                disabled={!answer[currentQuestion]}
                            >
                                Show Explanation
                            </Button>
                        )
                    }

                            <Button 
                                onClick={handleNext}
                                className="ml-auto"
                                disabled={!answer[currentQuestion] || savingResult}
                            >
                                {
                                    savingResult && ( <Loader2 className="mr-2 h-4 w-4 animate-spin"/>)
                                }
                                {
                                    currentQuestion < quizData.length -1 ? "Next Question" : "Finish Quiz"
                                }
                            </Button>
                </CardFooter>
    </Card>
  )
}

export default Quiz