import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{path:'',component:UserComponent},{path:'view/:id',component:ViewComponent,title:'View'},{path:'edit/:id',component:EditComponent,title:'Edit'},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
