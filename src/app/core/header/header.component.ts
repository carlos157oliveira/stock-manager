import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from './header-title.service';

@Component({
  selector: 'sm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /* movimentar e remover produtos serão funcionalidas embutidas na lista */

  isShown = false;

  routes = [
    {
      value: ['/estoque'],
      label: 'Lista Estoque'
    },
    {
      value: ['/estoque', 'cadastrar'],
      label: 'Adicionar Produto'
    },
    {
      value: ['/categorias', 'cadastrar'],
      label: 'Adicionar Categoria'
    },
    {
      value: ['/categorias'],
      label: 'Categorias'
    },
    {
      value: ['/sobre'],
      label: 'Sobre'
    }
  ];

  currentSectionTitle$;// = this.routes[0].label;
  currentRouteLabel = this.routes[0].label;

  constructor(private titleService: HeaderTitleService) { }

  ngOnInit() {
    this.currentSectionTitle$ = this.titleService.getTitleObservable();
  }

  toggleMenu() {
    this.isShown = !this.isShown;
  }

  changeSectionTitle(route) {
    //this.currentSection = route.label;
    this.currentRouteLabel = route.label;
    this.toggleMenu();
  }

}
