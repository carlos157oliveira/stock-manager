import { Injectable } from '@angular/core';

import { Category } from './category';
import { DbOperatorService } from './db-operator.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private storeName = 'categories';

  constructor(private dbOperator: DbOperatorService) { }

  saveCategory(category: Category) {
    return this.dbOperator.addToStore(this.storeName, category);
  }

  listCategories() {
    return this.dbOperator.listFromStore(this.storeName);
  }

  checkCategoryNotAvailable(categoryName: string) {
    return this.dbOperator
      .getFromStoreUsingIndex(this.storeName, 'name', categoryName)
      .pipe(map(category => !!category));
  }

  getCategory(id): Observable<Category> {
    return this.dbOperator.getFromStore(this.storeName, id);
  }

  updateCategory(category: Category) {
    return this.dbOperator.updateObjectInStore(this.storeName, category);
  }

  deleteCategory(id: number): any {
    return this.dbOperator.deleteFromStore(this.storeName, id);
  }

}
