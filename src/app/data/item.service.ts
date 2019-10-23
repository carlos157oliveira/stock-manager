import { Injectable } from '@angular/core';
import { DbOperatorService } from './db-operator.service';
import { Item } from './item';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemService {


  private storeName = 'itens';

  constructor(private dbOperator: DbOperatorService) {}

  saveItem(item: Item) {
    return this.dbOperator.addToStore(this.storeName, item);
  }

  listItens() {
    return this.dbOperator.listFromStore(this.storeName);
  }

  checkItemNameNotAvailable(itemName: string): Observable<boolean> {
    return this.dbOperator.getFromStoreUsingIndex(this.storeName, 'name', itemName)
      .pipe(map(item => !!item));
  }

  getItem(key) {
    return this.dbOperator.getFromStore(this.storeName, key);
  }

  updateItem(item: Item) {
      return this.dbOperator.updateObjectInStore(this.storeName, item);
  }

  deleteItem(id) {
    return this.dbOperator.deleteFromStore(this.storeName, id);
  }


}
