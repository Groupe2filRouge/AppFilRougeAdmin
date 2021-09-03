import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListResolver } from './resolvers/list.resolver';
import { CreateComponent } from './components/create/create.component';
import { LinkService } from './services/link.service';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    resolve: {
      list: ListResolver  // on associe un resolver à la route
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
