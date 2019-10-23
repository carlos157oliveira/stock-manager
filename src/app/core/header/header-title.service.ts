import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderTitleService {

  private titleSubject = new Subject<string>();

  getTitleObservable() {
    return this.titleSubject.asObservable();
  }

  setHeaderTitle(title: string) {
    this.titleSubject.next(title);
  }
}
