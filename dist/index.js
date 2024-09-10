"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_generator_1 = require("./invoice_generator");
const sampleData = {
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
            taxType: "CGST + SGST",
            cgstAmount: 17.1, // calculated as netAmount * 9 / 100
            sgstAmount: 17.1, // calculated as netAmount * 9 / 100
            igstAmount: 0,
            taxAmount: 34.2, // total taxAmount = cgstAmount + sgstAmount
            totalAmount: 224.2,
        },
        {
            description: "Widget B",
            unitPrice: 200,
            quantity: 1,
            discount: 20,
            netAmount: 180, // calculated as unitPrice * quantity - discount
            taxType: "CGST + SGST",
            cgstAmount: 16.2, // calculated as netAmount * 9 / 100
            sgstAmount: 16.2, // calculated as netAmount * 9 / 100
            igstAmount: 0,
            taxAmount: 32.4, // total taxAmount = cgstAmount + sgstAmount
            totalAmount: 212.4,
        },
    ],
};
(0, invoice_generator_1.generateInvoice)(sampleData)
    .then(() => {
    console.log(`Invoice generated successfully!`);
})
    .catch((error) => {
    console.error(`Error generating invoice`, error);
});
