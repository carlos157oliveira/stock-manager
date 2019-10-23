import { Injectable } from '@angular/core';
import { DbManagerService } from './db-manager.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbOperatorService {

  private db: IDBDatabase;

  constructor(dbManager: DbManagerService) {
    //dbManager.getDatabase().subscribe(db => this.db = db);
    this.db = dbManager.getDatabase();
  }

  addToStore(storeName: string, object: any) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName, 'readwrite')
        .objectStore(storeName)
        .add(object)
        .onsuccess = event => {
          observer.next(null);
          observer.complete();
        };
    });
  }

  listFromStore(storeName: string) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName)
        .objectStore(storeName)
        .getAll()
        .onsuccess = (event: any) => {
          observer.next(event.target.result);
          observer.complete();
        };
    });
  }

/*
  listFromStore(storeName: string) {
    let resultArray = [];
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName)
        .objectStore(storeName)
        .openCursor()
        .onsuccess = (event: any) => {
          let cursor = event.target.result;
          if(cursor){
            cursor.value.id = cursor.key;
            resultArray.push(cursor.value);
            cursor.continue();
          }
          else {
            observer.next(resultArray);
            observer.complete();
          }
        };
    });
  }*/

  getFromStoreUsingIndex(storeName: string, indexName: string, indexKey: any) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName)
      .objectStore(storeName)
      .index(indexName)
      .get(indexKey)
      .onsuccess = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };
    });
  }

  getFromStore(storeName: string, key) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName)
      .objectStore(storeName)
      .get(key)
      .onsuccess = (event: any) => {
        observer.next(event.target.result);
        observer.complete();
      };
    });
  }

  updateObjectInStore(storeName: string, newValue) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName, "readwrite")
      .objectStore(storeName)
      .put(newValue)
      .onsuccess = (event: any) => {
        observer.next(null);
        observer.complete();
      };
    });
  }

  deleteFromStore(storeName: string, key) {
    return new Observable((observer: Observer<any>) => {
      this.db.transaction(storeName, "readwrite")
      .objectStore(storeName)
      .delete(key)
      .onsuccess = (event: any) => {
        observer.next(null);
        observer.complete();
      };
    });
  }


}
