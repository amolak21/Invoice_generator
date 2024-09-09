import { generateInvoice, InvoiceData } from "./invoice_generator";

const sampleData: InvoiceData = {
  sellerDetails: {
    name: "Acme Corp",
    address: "123 Business Rd",
    city: "Metropolis",
    state: "CA",
    pincode: "90210",
    panNo: "ABCDE1234F",
    gstRegistrationNo: "GST123456789",
  },
  placeOfSupply: "CA",
  billingDetails: {
    name: "John Doe",
    address: "456 Customer Ave",
    city: "Metropolis",
    state: "CA",
    pincode: "90211",
    stateUTCode: "CA",
  },
  shippingDetails: {
    name: "Jane Smith",
    address: "789 Delivery St",
    city: "Metropolis",
    state: "CA",
    pincode: "90212",
    stateUTCode: "CA",
  },
  placeOfDelivery: "CA",
  orderDetails: {
    orderNo: "ORD123456",
    orderDate: new Date("2024-09-01"),
  },
  invoiceDetails: {
    invoiceNo: "INV123456",
    invoiceDate: new Date("2024-09-05"),
  },
  reverseCharge: false,
  itemDetails: [
    {
      description: "Widget A",
      unitPrice: 100,
      quantity: 2,
      discount: 10,
      netAmount: 190, // calculated as unitPrice * quantity - discount
      taxType: "CGST", // or 'IGST' depending on place of supply and delivery
      taxAmount: 34.2, // calculated as netAmount * taxRate / 100
      totalAmount: 224.2, // calculated as netAmount + taxAmount
    },
    {
      description: "Widget B",
      unitPrice: 200,
      quantity: 1,
      discount: 20,
      netAmount: 180, // calculated as unitPrice * quantity - discount
      taxType: "CGST", // or 'IGST' depending on place of supply and delivery
      taxAmount: 32.4, // calculated as netAmount * taxRate / 100
      totalAmount: 212.4, // calculated as netAmount + taxAmount
    },
  ],
};

generateInvoice(sampleData)
  .then(() => {
    console.log(`Invoice generated successfully!`);
  })
  .catch((error) => {
    console.error(`Error generating invoice`, error);
  });
