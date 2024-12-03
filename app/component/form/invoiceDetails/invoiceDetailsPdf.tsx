import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import { getLabels } from "@/lib/translations";
import { parseEuroNumber, formatEuroNumber } from "@/lib/utils";

export const InvoiceDetailsPdf: React.FC<InvoiceItemDetails> = ({
  note,
  discount,
  taxRate,
  items,
  currency = "INR",
}) => {
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const calculateTotalAmount = (items: Item[]): number =>
    items.reduce((total, item) => {
      const quantity = item.qty ? +item.qty : 1;
      const amount = parseEuroNumber(item.amount || "0");
      return +(total + quantity * amount).toFixed(2);
    }, 0);

  const subtotal = calculateTotalAmount(items);
  const discountAmount = +(subtotal - (discount ? parseEuroNumber(discount) : 0)).toFixed(2);
  const taxAmount = +(discountAmount * ((taxRate ? +taxRate : 0) / 100)).toFixed(2);
  const totalAmount = +(discountAmount + taxAmount).toFixed(2);
  const labels = getLabels();


  return (
    <View>
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 16 }}>
          <Text style={pdfTypography.title}>{labels.description}</Text>
        </View>
        <View
          style={{
            flex: 1,
            ...pdfUtils.flexRowItemCenter,
            paddingHorizontal: 40,
            paddingVertical: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={pdfTypography.title}>{labels.qty}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={pdfTypography.title}>{labels.price}</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <Text style={pdfTypography.title}>{labels.amount}</Text>
          </View>
        </View>
      </View>
      {items.map(({ itemDescription, amount, qty }, index) => {
        const containerStyle = {
          marginHorizontal: 40,
          paddingVertical: 14,
          ...pdfUtils.borderBottom,
          ...pdfUtils.flexRowItemCenter,
        };
        const borderStyle = index === 0 ? pdfUtils.borderTop : {};

        return (
          <View
            key={index}
            style={{
              ...containerStyle,
              ...borderStyle,
            }}
          >
            <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
              {itemDescription}
            </Text>
            <View
              style={{
                flex: 1,
                ...pdfUtils.flexRowItemCenter,
                paddingLeft: 80,
              }}
            >
              <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
                {qty ? qty : "-"}
              </Text>
              <Text style={{ flex: 1, ...pdfTypography.itemDescription }}>
                {amount || ""}
              </Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {amount ? formatEuroNumber(parseEuroNumber(amount) * (qty ? qty : 1)) : ""}
              </Text>
            </View>
          </View>
        );
      })}
      <View style={pdfUtils.flexRowItemCenter}>
        <View style={{ flex: 1, paddingTop: 24 }}>
          {note && (
            <View style={{ paddingHorizontal: 40 }}>
              <Text style={pdfTypography.title}>{labels.note}</Text>
              <Text style={pdfTypography.itemDescription}>{note}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: 14,
              ...pdfUtils.flexRowItemCenter,
              ...pdfUtils.borderBottom,
            }}
          >
            <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
              {labels.subtotal}
            </Text>
            <Text
              style={{
                ...pdfTypography.itemDescription,
                flex: 1,
                textAlign: "right",
              }}
            >
              {currencyDetails?.currencySymbol}
              {formatEuroNumber(subtotal)}
            </Text>
          </View>
          {discount && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: 14,
                ...pdfUtils.flexRowItemCenter,
                ...pdfUtils.borderBottom,
              }}
            >
              <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
                {labels.discount}
              </Text>
              <Text
                style={{
                  ...pdfTypography.itemDescription,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {discount ? formatEuroNumber(parseEuroNumber(discount)) : ""}
              </Text>
            </View>
          )}
          {taxRate && (
            <View
              style={{
                marginHorizontal: 40,
                paddingVertical: 14,
                ...pdfUtils.flexRowItemCenter,
                ...pdfUtils.borderBottom,
              }}
            >
              <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
                {labels.tax} ({taxRate}%)
              </Text>
              <Text
                style={{
                  ...pdfTypography.itemDescription,
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {currencyDetails?.currencySymbol}
                {formatEuroNumber(taxAmount)}
              </Text>
            </View>
          )}
          <View
            style={{
              marginHorizontal: 40,
              paddingVertical: 14,
              ...pdfUtils.flexRowItemCenter,
            }}
          >
            <Text style={{ ...pdfTypography.itemDescription, flex: 1 }}>
              {labels.amount}
            </Text>
            <Text
              style={{ ...pdfTypography.amount, textAlign: "right", flex: 1 }}
            >
              {currencyDetails?.currencySymbol}
              {formatEuroNumber(totalAmount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
