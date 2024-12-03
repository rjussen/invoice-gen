import { NewInvoiceForm } from "@/app/(new)/component/NewInvoiceForm";
import { Suspense } from "react";
import React from "react";

const Page = () => (
  <div className="min-h-screen overflow-y-auto h-full flex items-center md:flex-row flex-col-reverse">
    <Suspense fallback={<div>Loading...</div>}>
      <NewInvoiceForm />
    </Suspense>
  </div>
);

export default Page;
