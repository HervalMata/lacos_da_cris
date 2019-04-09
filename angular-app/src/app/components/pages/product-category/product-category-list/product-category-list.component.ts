import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {Category, Product, ProductCategory} from "../../../../model";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;
  product: Product = null;
  productCategory: ProductCategory = null;
  categories: Category[] = [];
  categoriesId: number[] = [];

  constructor(
      private route: ActivatedRoute,
      private productHttp: ProductHttpService,
      private productCategoryHttp: ProductCategoryHttpService,
      private categoryHttp: CategoryHttpService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getProductCategory();
    });
  }

    getProduct() {
      this.productHttp.get(this.productId)
          .subscribe( product => this.product = product)
    }

    getProductCategory() {
      this.productCategoryHttp
          .list(this.productId)
          .subscribe(productCategory => this.productCategory = productCategory);
    }

    getCategories() {
        this.categoryHttp.list(1)
            .subscribe(response => {
                this.categories = response.data;
            })
    }
}
