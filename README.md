# Invoice Generation Project

## Overview
This project is a Node.js-based invoice generator that takes input data (seller, buyer, item details, etc.) and produces a formatted PDF invoice. It uses Handlebars for templating and `html-pdf` to generate a PDF document from the rendered HTML.

## Features
- Accepts detailed invoice data including seller, buyer, item descriptions, and taxes.
- Generates a well-formatted PDF invoice.
- Supports calculations for CGST, SGST, and IGST taxes based on the place of supply.
- Customizable invoice template using Handlebars.

## Prerequisites
- Node.js (v14+)
- npm (v6+)

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Define your invoice data in `sampleData` format:

    ```ts
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
          netAmount: 190,
          taxType: "CGST + SGST",
          cgstAmount: 17.1,
          sgstAmount: 17.1,
          igstAmount: 0,
          taxAmount: 34.2,
          totalAmount: 224.2,
        },
        {
          description: "Widget B",
          unitPrice: 200,
          quantity: 1,
          discount: 20,
          netAmount: 180,
          taxType: "CGST + SGST",
          cgstAmount: 16.2,
          sgstAmount: 16.2,
          igstAmount: 0,
          taxAmount: 32.4,
          totalAmount: 212.4,
        },
      ],
    };
    ```

2. Generate the invoice:
    ```ts
    generateInvoice(sampleData)
      .then(() => {
        console.log(`Invoice generated successfully!`);
      })
      .catch((error) => {
        console.error(`Error generating invoice`, error);
      });
    ```

3. The generated PDF will be saved as `invoice.pdf` in the project root.

## Project Structure

```plaintext
.
├── src/
│   ├── templates/
│   │   └── invoice_template.hbs     # Handlebars template for the invoice
│   ├── invoice_generator.ts         # Main logic for invoice generation
│   └── index.ts                     # Entry point for generating invoices
├── public/
│   └── image.png                    # Company logo used in the invoice
├── README.md                        # Documentation
├── package.json                     # Project configuration and dependencies
└── invoice.pdf                      # Generated PDF (output)
