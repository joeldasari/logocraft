"use client";

import LogoTitle from "./_components/logo-title";
import LogoPalette from "./_components/logo-palette";
import LogoDesign from "./_components/logo-design";
import LogoIdea from "./_components/logo-idea";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateLogo = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    design: "",
    palette: "",
    idea: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.title) {
      toast.error("Please enter a title for your logo");
    } else if (step === 2 && !formData.idea) {
      toast.error("Please enter an idea for your logo");
    } else if (step === 3 && !formData.palette) {
      toast.error("Please select a color palette for your logo");
    } else if (step === 4 && !formData.design) {
      toast.error("Please select a design for your logo");
    } else {
      if (step < 4) {
        setStep(step + 1);
      } else {
        localStorage.setItem("logo", JSON.stringify(formData));
        router.push("/result");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 flex flex-col gap-6 w-[90%] sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] border-2 rounded-2xl">
        {step === 1 && (
          <LogoTitle title={formData.title} handleChange={handleChange} />
        )}
        {step === 2 && (
          <LogoIdea idea={formData.idea} handleChange={handleChange} />
        )}
        {step === 3 && (
          <LogoPalette palette={formData.palette} handleChange={handleChange} />
        )}
        {step === 4 && (
          <LogoDesign design={formData.design} handleChange={handleChange} />
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
              className="cursor-pointer"
            >
              <ArrowLeft /> Back
            </Button>
          )}
          <Button onClick={handleNext} className="cursor-pointer">
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLogo;
