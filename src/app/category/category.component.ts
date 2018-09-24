import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: any;
  categoryId: any;
  page = 1;  

  constructor(
      private data: DataService,
      private activatedRoute: ActivatedRoute,
      private rest: RestApiService
  ) { }

  ngOnInit() {      
      this.activatedRoute.params.subscribe(res => {
          this.categoryId = res['id'];
          this.getProducts();
      })
  }

  get lower() {
      return  10 * (this.page - 1) + 1;      
  }

  get upper() {
      return Math.min(10 * this.page, this.category.totalProducts);      
  }

  async getProducts(event?: any) {
      if (event) {
          this.category = null;
      }

      try {
          // Bringing back products from a category!
          // Pages on server side pages begin with zero! And in our app it starts with 1!
          const data = await this.rest.get(
              // `http://localhost:3030/api/categories/${this.categoryId}?page=${this.page - 1}`
              `http://localhost:3030/api/categories/${this.categoryId}?page=${this.page}`
          );

          console.log('data', data);
          data['success']
            ? (this.category = data)
            : this.data.error(data['message']);

          console.log('this.category', this.category);
          console.log('this.category.totalProducts', this.category.totalProducts);
          
      } catch (error) {
          this.data.error(error['message']);
      }
  }

}
