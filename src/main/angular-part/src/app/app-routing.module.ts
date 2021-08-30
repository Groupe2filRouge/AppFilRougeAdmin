import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListResolver } from './resolvers/list.resolver';
import { CreateComponent } from './components/create/create.component';
import { ModifyComponent } from './components/modify/modify.component';
import { LinkResolver } from './resolvers/link.resolver';
import { LinkService } from './services/link.service';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      list: ListResolver  // on associe un resolver à la route
    }
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'modifiy/:id',
    component: ModifyComponent,
    resolve: {
      list: LinkResolver  // on associe un resolver à la route
    }
  }
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [LinkService]
})
export class AppRoutingModule { }
