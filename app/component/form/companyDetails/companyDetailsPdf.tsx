/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography } from "@/lib/pdfStyles";
import { getLabels } from "@/lib/translations";

export const CompanyDetailsPdf: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => {
  const labels = getLabels();
  return (
    <View style={pdfContainers.CompanyDetails}>
      <Text style={{ ...pdfTypography.title, marginBottom: 14 }}>{labels.to}</Text>
      <View style={pdfContainers.imageContainer}>
        {companyLogo && (
          <Image src={companyLogo} style={{ height: 40, borderRadius: 6 }} />
        )}
      </View>
      {companyName && (
        <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap" }}>
          {companyName}
        </Text>
      )}
      {email && (
        <Text style={{ ...pdfTypography.description, marginBottom: 12 }}>
          {email}
        </Text>
      )}
      <View style={pdfTypography.description}>
        {companyAddress && <Text>{companyAddress}</Text>}
        {(companyCity || companyState || companyZip) && (
          <Text style={{ marginBottom: 2 }}>
            {companyCity}, {companyState} {companyZip}
          </Text>
        )}
        {companyCountry && (
          <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>
        )}
        {companyTaxId && <Text>{labels.tax} ID: {companyTaxId}</Text>}
      </View>
    </View>
  );
};
