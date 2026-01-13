import React from "react";

interface HorizontalStepperProps {
  currentStep: number; // 0-based index
  totalSteps?: number; // defaults to 3
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  currentStep,
  totalSteps = 2,
}) => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-300 w-35 lg:w-1/2 max:w-55 rounded-full ${
            currentStep === index ? "h-1 bg-[#00A057]" : "h-1 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default HorizontalStepper;
