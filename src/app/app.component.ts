import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { HeaderTitleService } from './core/header/header-title.service';
import { ItemService } from './data/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: HeaderTitleService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService
  ) {}

  async ngOnInit() {
    if(Notification.permission != "granted")
      await Notification.requestPermission();

    this.itemService.listItens().subscribe(itens => {
      let body = '';
      itens.forEach(item => {
        if(item.alertQuantity != null && item.quantity <= item.alertQuantity) {
          body += item.name + ';\r';
        }
      });
      if(body) {
        body = body.substr(0, body.length - 2);
        body += '.';

        new Notification('Itens com baixa quantidade em estoque:', {
          body: body,
          requireInteraction: true
        });
      }


    });


    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map(route => {
        while(route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(switchMap(route => route.data))
      .subscribe(data => this.titleService.setHeaderTitle(data.title));
  }


}
