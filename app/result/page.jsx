"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowRight, Download, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ResultPage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const userInput = JSON.parse(localStorage.getItem("logo"));
    const prompt = `Create a ${userInput.design} for ${userInput.title}. The logo should incorporate ${userInput.idea}, and the color palette should include ${userInput.palette} tones.  The logo should also include the text '${userInput.title}' in a bold and readable font. The design should be professional and visually appealing, capturing the essence of the brand.`;
    const getLogo = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3-medium-diffusers",
          { inputs: prompt },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            },
            responseType: "blob",
          }
        );
        const data = await response.data;
        const blobUrl = URL.createObjectURL(data);
        console.log(blobUrl);
        setImageSrc(blobUrl);
        toast.success("Logo generated successfully");
      } catch (error) {
        toast.error("Failed to generate Logo");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getLogo();
  }, []);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "logo.png";
    a.click();
    toast.success("Logo downloaded successfully");
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {loading && (
        <p>The logo will be generated anywhere between 10 to 30 seconds</p>
      )}
      <div className="flex flex-col gap-4">
        {imageSrc ? (
          <div className="flex flex-col gap-4">
            <img src={imageSrc} className="h-80 rounded-2xl" alt="logo" />
            <div className="flex justify-between">
              <Button onClick={handleDownload} className="cursor-pointer">
                Download <Download />
              </Button>
              <Link href="/create">
                <Button className="cursor-pointer">
                  Create new <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          loading && (
            <div className="size-80 bg-gray-500 animate-pulse rounded-2xl"></div>
          )
        )}
        {loading && (
          <div className="flex items-center gap-2">
            <LoaderCircle className="animate-spin size-6" />
            {seconds}s
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
