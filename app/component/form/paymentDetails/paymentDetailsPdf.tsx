/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import { getLabels } from "@/lib/translations";

interface PaymentDetailsPdfProps extends PaymentDetails {
  countryImageUrl: string;
}

export const PaymentDetailsPdf: React.FC<PaymentDetailsPdfProps> = ({
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  currency = "INR",
  countryImageUrl,
}) => {
  const currencyDetails = currencyList.find(
    (currencyDetail) =>
      currencyDetail.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  const labels = getLabels();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ paddingBottom: 12, ...pdfTypography.title }}>
          {labels.bankDetails}
        </Text>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>{labels.bankName}</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 44.5,
              }}
            >
              {bankName ? bankName : "-"}
            </Text>
          </View>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>{labels.accountNumber}</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 14,
              }}
            >
              {accountNumber ? accountNumber : "-"}
            </Text>
          </View>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>{labels.accountName}</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 26,
              }}
            >
              {accountName ? accountName : "-"}
            </Text>
          </View>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>{labels.swiftCode}</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 45,
              }}
            >
              {swiftCode ? swiftCode : "-"}
            </Text>
          </View>
          {ifscCode ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>{labels.ifscCode}</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 48,
                }}
              >
                {ifscCode}
              </Text>
            </View>
          ) : undefined}
          {routingCode ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>{labels.routingCode}</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 32,
                }}
              >
                {routingCode}
              </Text>
            </View>
          ) : undefined}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ ...pdfTypography.title, paddingBottom: 12 }}>
          {labels.payableIn}
        </Text>
        {currencyDetails && (
          <View style={{ ...pdfUtils.flexRowItemCenter, gap: 8 }}>
            <Image
              src={countryImageUrl}
              style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <View>
              <Text style={{ fontSize: 14, fontWeight: "medium" }}>
                {currencyDetails.currencyName}
              </Text>
              <Text style={pdfTypography.title}>
                {currencyDetails.currencySymbol}{" "}
                {currencyDetails.currencyShortForm}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
