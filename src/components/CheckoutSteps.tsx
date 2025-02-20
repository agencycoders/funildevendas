import React from 'react';
import { useCheckoutStore } from '../store/checkoutStore';
import { CheckIcon } from 'lucide-react';

const steps = ['Customer Information', 'Shipping', 'Payment'];

export function CheckoutSteps() {
  const currentStep = useCheckoutStore((state) => state.currentStep);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < currentStep ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`ml-2 ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-16 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}