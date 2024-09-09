"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = generateInvoice;
const fs = __importStar(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const pdf = __importStar(require("html-pdf"));
function generateInvoice(data) {
    return new Promise((resolve, reject) => {
        const taxType = data.placeOfSupply === data.placeOfDelivery ? "CGST" : "IGST";
        const taxRate = taxType == "CGST" ? 9 : 18;
        for (const item of data.itemDetails) {
            item.netAmount = item.unitPrice * item.quantity - item.discount;
            item.taxType = taxType;
            item.taxAmount = (item.netAmount * taxRate) / 100;
            item.totalAmount = item.netAmount + item.taxAmount;
        }
        const totalNetAmount = data.itemDetails.reduce((acc, item) => acc + item.netAmount, 0);
        const totalTaxAmount = data.itemDetails.reduce((acc, item) => acc + item.taxAmount, 0);
        const totalAmount = totalNetAmount + totalTaxAmount;
        const templateSource = fs.readFileSync("src/templates/invoice_template.hbs", "utf8");
        const template = handlebars_1.default.compile(templateSource);
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
            }
            else {
                resolve();
            }
        });
    });
}
