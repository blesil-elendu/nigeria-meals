// const mnf = require("../../../../../shared/sdk/monnify.js");
import { Product } from "../../../../../shared/models/product";
import { UserDetail, User } from "../../../../../shared/models/user";
import { BillingService } from "../../../../../shared/services/billing.service";
import { AuthService } from "../../../../../shared/services/auth.service";
import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
declare var $: any;
@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  products: Product[];
  userDetails: User;
  date: number;
  totalPrice = 0;
  tax = 6.4;

  constructor(
    authService: AuthService,
    private productService: ProductService,
    private billing: BillingService) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "block";

    this.products = productService.getLocalCartProducts();
    console.log(billing.getBillings());
    this.billing.getBillings()
    // .subscribe((bill) => {
    //   this.billingDetails = bill;
    // });;
    authService.user$.subscribe((user) => {
      this.userDetails = user;
    });

    this.products.forEach((product) => {
      this.totalPrice += product.productPrice;
    });

    this.date = Date.now();
  }

  ngOnInit() {}

  downloadReceipt() {
    const data = document.getElementById("receipt");
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("NigeriaMealReceipt.pdf"); // Generated PDF
    });
  }

  payWithMonnify() {
    // @ts-ignore
    MonnifySDK.initialize({
        amount: this.totalPrice,
        currency: "NGN",
        reference: '' + Math.floor((Math.random() * 1000000000) + 1),
        customerName: this.userDetails.userName,
        customerEmail: this.userDetails.emailId,
        customerMobileNumber: "08121281921",
        apiKey: "MK_TEST_RSFRUXMU9L",
        contractCode: "7531237868",
        paymentDescription: "Nigeria Meal Order Payment",
        isTestMode: true,
        paymentMethods: ["CARD"],
        onComplete: function(response){
            //Implement what happens when transaction is completed.
            console.log(response);
        },
        onClose: function(data){
            //Implement what should happen when the modal is closed here
            console.log(data);
        }
    });
}
}
