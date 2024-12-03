"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserInputForm } from "../../component/form/userInputForm";
import { FormSteps } from "../../component/form/step/fromSteps";
import { UserDataPreview } from "./userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { myPreset } from "@/lib/presets";

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number"))
          localStorage.setItem("step", "1");
      } catch (e) {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="max-w-lg min-h-screen w-full h-full p-4 md:p-12 border-r border-dashed flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/android-chrome-512x512.png"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    alt="logo"
                  />
                  <div>
                    <p className="font-semibold">Invoice Generator</p>
                    <p className="text-orange-500 text-sm">By Automatey</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    Object.entries(myPreset).forEach(([key, value]) => {
                      try {
                        localStorage.setItem(key, value);
                      } catch (e) {
                        console.error(`Error setting ${key}:`, e);
                      }
                    });
                    window.location.reload();
                  }}
                  className="text-sm"
                >
                  Load My Details
                </Button>
              </div>
              <UserInputForm />
            </div>
            <FormSteps />
          </div>
          <div className="relative min-h-screen h-full w-full flex justify-center items-center p-4 md:p-0">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <UserDataPreview />
          </div>
        </FormProvider>
      ) : (
        <div />
      )}
    </>
  );
};
