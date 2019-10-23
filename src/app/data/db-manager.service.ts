import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbManagerService {

  private dbSubject = new ReplaySubject<IDBDatabase>(1);

  database: IDBDatabase;

  constructor() { }

  initDb() {
    let request = indexedDB.open('stock');

    request.onerror = err => console.log('Failed to open stock database!', err);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result as IDBDatabase;
      db.createObjectStore('itens', { autoIncrement: true, keyPath: 'id' })
        .createIndex('name', 'name', { unique: true });

      db.createObjectStore('categories', { autoIncrement: true, keyPath: 'id' })
        .createIndex('name', 'name', { unique: true });

      console.log('Upgrade called');
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result as IDBDatabase;
      this.database = db;
      this.dbSubject.next(db);
      this.dbSubject.complete();
    };
    // aparentemente precisamos devolver uma promise
    return this.dbSubject.toPromise();

  }

  getDatabase() {
    return this.database;
  }

}

export function dbFactory(provider: DbManagerService) {
  return () => provider.initDb();
}
