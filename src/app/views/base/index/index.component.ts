import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    
    {
      bannerImg: "./assets/banner_img/img_3.jpg",
      title: "Experience The sweetness of - Bole",
      description:
        " Your local and natural sweetness served with pepper sause",
    },
    {
      bannerImg: "./assets/banner_img/img_1.jpg",
      title: "Our Top Soup Menus",
      description: "Tasty local soups served in styles",
    },
    {
      bannerImg: "./assets/banner_img/img_4.jpg",
      title: "Pepper Soup",
      description: "We offer the best Meals at the best value",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
