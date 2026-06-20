import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const CompleteProfile = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, label: "Verify Email" },
    { id: 2, label: "Education" },
    { id: 3, label: "Preferences" },
  ];

  return (
    <div className="flex justify-center gap-12 items-start bg-gradient-to-t from-green-100 via-green-50 to-white px-10 mt-[120px] min-h-screen">
      
      {/* LEFT CARD */}
      <div className="h-[450px] w-[340px] bg-white shadow-md border border-green-100 rounded-2xl p-6 flex flex-col justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
          alt=""
          className="w-40 mx-auto mb-6"
        />

        <h2 className="text-lg font-semibold mb-4">
          Complete your profile
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-2">
            <FiCheckCircle className="text-green-700 mt-1" />
            Get noticed by recruiters
          </li>

          <li className="flex gap-2">
            <FiCheckCircle className="text-green-700 mt-1" />
            Improve profile visibility
          </li>

          <li className="flex gap-2">
            <FiCheckCircle className="text-green-700 mt-1" />
            Apply to jobs faster
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div>
        {/* STEPPER */}
        <div className="w-[700px]  mb-4">
          <div className="grid grid-cols-3 gap-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-xl border text-center transition-all
                  ${
                    activeStep === step.id
                      ? "bg-green-50 border-green-700 text-green-800"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }
                `}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-[700px] bg-white rounded-2xl shadow-md border border-green-100 ">
          {activeStep === 1 && <Step1 />}

          {activeStep === 2 && <Step2 />}

          {activeStep === 3 && <Step3 />}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;