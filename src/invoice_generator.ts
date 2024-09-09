import * as fs from "fs";
import Handlebars from "handlebars";
import * as pdf from "html-pdf";
interface Item {
  description: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  netAmount: number;
  taxType: string;
  taxAmount: number;
  totalAmount: number;
}

export interface InvoiceData {
  sellerDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    panNo: string;
    gstRegistrationNo: string;
  };
  placeOfSupply: string;
  billingDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    stateUTCode: string;
  };
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    stateUTCode: string;
  };
  placeOfDelivery: string;
  orderDetails: {
    orderNo: string;
    orderDate: Date;
  };
  invoiceDetails: {
    invoiceNo: string;
    invoiceDate: Date;
  };
  reverseCharge: boolean;
  itemDetails: Item[];
}

export function generateInvoice(data: InvoiceData): Promise<void> {
  return new Promise((resolve, reject) => {
    const taxType =
      data.placeOfSupply === data.placeOfDelivery ? "CGST" : "IGST";
    const taxRate = taxType == "CGST" ? 9 : 18;

    for (const item of data.itemDetails) {
      item.netAmount = item.unitPrice * item.quantity - item.discount;
      item.taxType = taxType;
      item.taxAmount = (item.netAmount * taxRate) / 100;
      item.totalAmount = item.netAmount + item.taxAmount;
    }
    const totalNetAmount = data.itemDetails.reduce(
      (acc, item) => acc + item.netAmount,
      0
    );
    const totalTaxAmount = data.itemDetails.reduce(
      (acc, item) => acc + item.taxAmount,
      0
    );
    const totalAmount = totalNetAmount + totalTaxAmount;

    const templateSource = fs.readFileSync(
      "src/templates/invoice_template.hbs",
      "utf8"
    );
    const template = Handlebars.compile(templateSource);
    const html = template({
      data,
      totalNetAmount,
      totalTaxAmount,
      totalAmount,
    });

    pdf
      .create(html, {
        format: "A4",
        border: {
          top: "20mm",
          bottom: "20mm",
          left: "20mm",
          right: "20mm",
        },
      })
      .toFile("invoice.pdf", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
}
