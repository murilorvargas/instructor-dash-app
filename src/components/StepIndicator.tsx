import React from 'react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepNames }) => {
  return (
    <div className="flex items-center justify-center gap-8 mb-12">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={stepNumber} className="flex flex-col items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                isCompleted
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : isActive
                  ? 'bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20'
                  : 'bg-card text-muted-foreground border-2 border-border'
              }`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            <div className={`text-sm font-medium text-center ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {stepNames[index] || stepNumber}
            </div>
          </div>
        )
      })}
    </div>
  )
}