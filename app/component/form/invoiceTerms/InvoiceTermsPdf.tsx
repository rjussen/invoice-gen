import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { nl } from 'date-fns/locale';
import { pdfTypography, pdfContainers, pdfUtils } from "@/lib/pdfStyles";
import { getLabels } from "@/lib/translations";
import { getPdfLanguage } from "@/lib/utils";

export const InvoiceTermsPdf: React.FC<InvoiceTerms> = ({
  invoiceNumber,
  issueDate,
  dueDate,
}) => {
  const labels = getLabels();
  const locale = getPdfLanguage() === 'dutch' ? nl : undefined;
  const dateFormat = getPdfLanguage() === 'dutch' ? 'dd-MM-yyyy' : 'do MMM yyyy';

  return (
    <View style={pdfContainers.invoiceTerms}>
      <View style={{ flex: 1 }}>
        <Text style={pdfTypography.title}>{labels.invoiceNo}</Text>
        <Text style={pdfTypography.subTitle}>{invoiceNumber}</Text>
      </View>
      <View
        style={{
          ...pdfUtils.flexRowBetween,
          paddingRight: 20,
          paddingLeft: 100,
          flex: 1,
        }}
      >
        <View>
          <Text style={pdfTypography.title}>{labels.issued}</Text>
          <Text style={pdfTypography.subTitle}>
            {issueDate ? format(new Date(issueDate), dateFormat, { locale }) : ""}
          </Text>
        </View>
        <View>
          <Text style={pdfTypography.title}>{labels.dueDate}</Text>
          <Text style={pdfTypography.subTitle}>
            {dueDate ? format(new Date(dueDate), dateFormat, { locale }) : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};
