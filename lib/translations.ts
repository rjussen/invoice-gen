import { getPdfLanguage } from "./utils";

export const pdfLabels = {
  dutch: {
    to: "Aan",
    from: "Van",
    invoiceNo: "Factuurnummer",
    issued: "Uitgegeven",
    dueDate: "Vervaldatum",
    description: "Omschrijving",
    qty: "Aantal",
    price: "Prijs",
    amount: "Bedrag",
    note: "Notitie",
    subtotal: "Subtotaal",
    discount: "Korting",
    tax: "BTW",
    total: "Totaal",
    bankDetails: "Bankgegevens",
    bankName: "Bank",
    accountNumber: "IBAN",
    accountName: "Rekeninghouder",
    swiftBic: "BIC",
    swiftCode: "BIC",
    routingCode: "Routeringscode",
    ifscCode: "IFSC-code",
    payableIn: "Te betalen in",
    invoiceReady: "Uw factuur is klaar",
    reviewMessage: "Controleer de gegevens zorgvuldig voordat u uw factuur downloadt.",
    downloadInvoice: "Download Factuur",
    downloadingInvoice: "Bezig met downloaden...",
    downloaded: "Gedownload"
  },
  english: {
    to: "To",
    from: "From",
    invoiceNo: "Invoice No",
    issued: "Issued",
    dueDate: "Due Date",
    description: "Description",
    qty: "QTY",
    price: "Price",
    amount: "Amount",
    note: "Note",
    subtotal: "Subtotal",
    discount: "Discount",
    tax: "Tax",
    total: "Total",
    bankDetails: "Bank Details",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountName: "Account Name",
    swiftBic: "SWIFT/BIC",
    swiftCode: "SWIFT/BIC",
    routingCode: "Routing Code",
    ifscCode: "IFSC Code",
    payableIn: "Payable in",
    invoiceReady: "Your invoice is ready",
    reviewMessage: "Please review the details carefully before downloading your invoice.",
    downloadInvoice: "Download Invoice",
    downloadingInvoice: "Downloading...",
    downloaded: "Downloaded"
  }
};

export function getLabels() {
  const language = getPdfLanguage();
  return pdfLabels[language] as typeof pdfLabels.dutch;
} 