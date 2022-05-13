import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep} from "./Steps/FeedbackContentStep";

import bugImage from "../../assets/bug.svg";
import ideaImage from "../../assets/idea.svg";
import thoughtImage from "../../assets/thought.svg";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImage,
      alt: "Imagem de um inseto"
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImage,
      alt: "Imagem de um lâmpada"
    },
  },
  ORHER: {
    title: "Outro",
    image: {
      source: thoughtImage,
      alt: "Imagem de uma nuvem"
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

/* 
  Object.entries(feedbackTypes) -> [
  ["bug", {...}],
  ["idea", {...}],
  ["thought", {...}]
]
 */
export function WidgetForm(){
  const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedBackType(null)
  }

  return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
      <FeedbackSucessStep onFeedbackRestartedRequeted={handleRestartFeedback}/> 
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep  onFeedbackTypeChanged={setFeedBackType} />
          ) : (
            <FeedbackContentStep 
            feedbackType={feedbackType}
            onFeedbackRestartedRequested={handleRestartFeedback}
            onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}


      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a> 
      </footer>
    </div>
  )
}