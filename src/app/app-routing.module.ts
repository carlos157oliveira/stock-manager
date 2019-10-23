import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockListComponent } from './stock-list/stock-list.component';
import { ItemCategoryAddComponent } from './item-category/item-category-add/item-category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ItemAddComponent } from './item/item-add/item-add.component';
import { ItemExchangeComponent } from './item/item-exchange/item-exchange.component';
import { ErrorComponent } from './core/errors/error.component';
import { AboutComponent } from './core/about/about.component';

const routes: Routes = [
  {
    path: 'estoque',
    component: StockListComponent,
    data: {
      title: 'Lista Estoque'
    }
  },
  {
    path: 'categorias/cadastrar',
    component: ItemCategoryAddComponent,
    data: {
      title: 'Adicionar Categoria'
    }
  },
  {
    path: 'categorias',
    component: CategoryListComponent,
    data: {
      title: 'Categorias'
    }
  },
  {
    path: 'estoque/cadastrar',
    component: ItemAddComponent,
    data: {
      title: 'Adicionar Item ao Estoque'
    }
  },
  {
    path: 'estoque/editar/:id',
    component: ItemAddComponent,
    data: {
      title: 'Editar Item do Estoque',
      editMode: true
    }
  },
  {
    path: 'categorias/editar/:id',
    component: ItemCategoryAddComponent,
    data: {
      title: 'Editar Categoria',
      editMode: true
    }
  },
  {
    path: 'estoque/movimentar/:id',
    component: ItemExchangeComponent,
    data: {
      title: 'Movimentar Item do Estoque'
    }
  },
  {
    path: 'sobre',
    component: AboutComponent,
    data: {
      title: 'Sobre'
    }
  },
  {
    path: '',
    redirectTo: 'estoque',
    pathMatch: 'full'
  },
  {
    path: 'erro',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
