import * as fs from "fs";
import Handlebars from "handlebars";
import * as pdf from "html-pdf";
import path from "path";
interface Item {
  description: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  netAmount: number;
  taxType: string;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
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
    for (const item of data.itemDetails) {
      item.netAmount = item.unitPrice * item.quantity - item.discount;

      if (data.placeOfSupply === data.placeOfDelivery) {
        item.cgstAmount = (item.netAmount * 9) / 100;
        item.sgstAmount = (item.netAmount * 9) / 100;
        item.taxAmount = item.cgstAmount + item.sgstAmount;
        item.taxType = "CGST + SGST";
      } else {
        item.igstAmount = (item.netAmount * 18) / 100;
        item.taxAmount = item.igstAmount;
        item.taxType = "IGST";
      }
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

    const logoPath = path.resolve("./public/image.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");
    const logoDataUri = `data:image/png;base64,${logoBase64}`;

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
      logoDataUri,
    });

    pdf
      .create(html, {
        format: "A4",
        border: {
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
