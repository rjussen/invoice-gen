import { format } from "date-fns";
import { nl } from 'date-fns/locale';
import { ChevronDown } from "lucide-react";
import { getLabels } from "@/lib/translations";
import { getPdfLanguage } from "@/lib/utils";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void }
> = ({ invoiceNumber, issueDate, dueDate, onClick }) => {
  const labels = getLabels();
  const locale = getPdfLanguage() === 'dutch' ? nl : undefined;
  const dateFormat = getPdfLanguage() === 'dutch' ? 'dd-MM-yyyy' : 'do MMM yyyy';

  return (
    <div
      className="border-b py-4 px-10 grid grid-cols-2 justify-between border-dashed group cursor-pointer relative"
      onClick={() => onClick && onClick("5")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      <div>
        <p className="text-[11px] text-neutral-400 font-semibold uppercase">
          {labels.invoiceNo}
        </p>
        <p className="font-medium text-xs">{invoiceNumber}</p>
      </div>
      <div className="flex items-center justify-between pl-10">
        <div>
          <p className="text-[11px] text-neutral-400 font-semibold uppercase">
            {labels.issued}
          </p>
          <p className="font-medium text-xs">
            {issueDate ? format(new Date(issueDate), dateFormat, { locale }) : ""}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-neutral-400 font-semibold uppercase text-right">
            {labels.dueDate}
          </p>
          <p className="font-medium text-xs">
            {dueDate ? format(new Date(dueDate), dateFormat, { locale }) : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
