import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbToastModule ,NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EditComponent,ViewComponent,UserComponent ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgbToastModule,
    NgbTypeaheadModule,
  ]
})
export class UserModule { }
