/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { getLabels } from "@/lib/translations";
import { parseEuroNumber, formatEuroNumber } from "@/lib/utils";

export const InvoiceDetailsPreview: React.FC<
  InvoiceItemDetails & { onClick?: (step: string) => void }
> = ({ note, discount, taxRate, items, currency = "INR", onClick }) => {
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const subtotal = calculateTotalAmount(items);
  const discountAmount = subtotal - (discount ? +discount : 0);
  const taxAmount = discountAmount * ((taxRate ? +taxRate : 0) / 100);
  const totalAmount = discountAmount + taxAmount;
  const labels = getLabels();

  return (
    <div
      className="group cursor-pointer relative"
      onClick={() => onClick && onClick("3")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      <div className="grid grid-cols-2 items-center">
        <div className="py-4 px-10">
          <p className="text-[11px] text-neutral-400 font-medium uppercase">
            {labels.description}
          </p>
        </div>
        <div className="py-4 px-10 grid grid-cols-3 items-center">
          <div>
            <p className="text-[11px] text-neutral-400 font-medium uppercase">
              {labels.qty}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400 font-medium uppercase">
              {labels.price}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-neutral-400 font-medium uppercase text-right">
              {labels.amount}
            </p>
          </div>
        </div>
      </div>
      {items.map(({ itemDescription, amount, qty }, index) => (
        <div
          className={`grid grid-cols-2 items-center border-b ${
            index === 0 ? "border-t" : ""
          } border-dashed mx-10 py-3`}
          key={index}
        >
          <p className="flex truncate text-xs font-medium text-gray-600">
            {itemDescription}
          </p>
          <div className="pl-10 grid grid-cols-3 items-center">
            <p className="flex truncate text-xs font-medium text-gray-600">
              {qty || "-"}
            </p>
            <p className="flex truncate text-xs font-medium text-gray-600">
              {amount || ""}
            </p>
            <p className="flex items-end w-full text-xs font-medium text-gray-600 text-right justify-end">
              {currencyDetails?.currencySymbol}
              {amount ? formatEuroNumber(parseEuroNumber(amount) * (qty ? qty : 1)) : ""}
            </p>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2">
        {note ? (
          <div className="pt-6 pb-4">
            <p className="flex truncate text-xs font-medium text-neutral-400 pb-1 px-10">
              {labels.note}
            </p>
            <p className="text-xs font-medium text-neutral-400 px-10 break-words">
              {note}
            </p>
          </div>
        ) : (
          <div />
        )}
        <div>
          <div className="flex justify-between items-center mx-10 border-b border-dashed py-3">
            <p className="flex truncate text-xs font-medium text-gray-600">
              {labels.subtotal}
            </p>
            <p className="flex truncate text-xs font-medium text-gray-600">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </p>
          </div>
          {discount && (
            <div className="flex justify-between items-center mx-10 border-b border-dashed py-3">
              <p className="flex truncate text-xs font-medium text-gray-600">
                {labels.discount}
              </p>
              <p className="flex truncate text-xs font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {discount ? addCommasToNumber(+discount) : ""}
              </p>
            </div>
          )}
          {taxRate && (
            <div className="flex justify-between items-center mx-10 border-b border-dashed py-3">
              <p className="flex truncate text-xs font-medium text-gray-600">
                {labels.tax} ({taxRate}%)
              </p>
              <p className="flex truncate text-xs font-medium text-gray-600">
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(+taxAmount.toFixed(2))}
              </p>
            </div>
          )}
          <div className="flex justify-between items-center px-10 py-3">
            <div>
              <p className="flex truncate text-xs font-medium text-gray-600">
                {labels.amount}
              </p>
            </div>
            <p className="flex truncate text-md font-medium">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateTotalAmount = (items: Item[]): number =>
  items.reduce((total, item) => {
    const quantity = item.qty ? +item.qty : 1;
    const amount = parseEuroNumber(item.amount || "0");
    return total + quantity * amount;
  }, 0);

const addCommasToNumber = (number: number): string => {
  return formatEuroNumber(number);
};
