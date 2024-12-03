"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function LanguageToggle() {
  const [isDutch, setIsDutch] = useState(true);

  useEffect(() => {
    const language = localStorage.getItem("pdfLanguage") || "dutch";
    setIsDutch(language === "dutch");
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="language-mode"
        checked={isDutch}
        onCheckedChange={(checked) => {
          setIsDutch(checked);
          localStorage.setItem("pdfLanguage", checked ? "dutch" : "english");
          window.dispatchEvent(new Event("storage"));
        }}
      />
      <Label htmlFor="language-mode">Nederlands</Label>
    </div>
  );
} 