import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../data/category.service';
import { Category } from '../data/category';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$: Observable<Category[]>
  totalCategories = 0;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.listCategories();
    this.categories$.subscribe(categories => this.totalCategories = categories.length);
  }

}
