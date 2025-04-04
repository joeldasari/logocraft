"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Download, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ResultPage = () => {
  const { user } = useUser();
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const userInput = JSON.parse(localStorage.getItem("logo"));

    const getLogo = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const prompt = `Create a ${userInput.design} logo with the text "${userInput.title}". The design should visually represent the idea: ${userInput.idea}. Use a ${userInput.palette} color palette.`;

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

        let base64data;
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = async () => {
          base64data = reader.result;
          setImageSrc(base64data);
          setLoading(false);
          toast.success("Logo generated successfully");
          localStorage.removeItem("logo");

          await axios.post("/api/saveLogo", {
            userId: user.id,
            logoUrl: base64data,
          });
        };
      } catch (error) {
        console.error("Logo generation failed", error);
      }
    };

    if (userInput && user) getLogo();
  }, [user]);

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
            <img
              src={imageSrc}
              className="h-80 rounded-2xl border-2"
              alt="logo"
            />
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
