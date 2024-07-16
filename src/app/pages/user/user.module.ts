import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { faCircle,faEllipsisV,faPencil,faTrash,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule, NgbToastModule ,NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { SettingComponent } from './setting/setting.component';
@NgModule({
  declarations: [ DashboardComponent,
    BlogComponent,
    SettingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgChartsModule ,
    FontAwesomeModule,
    NgbDropdownModule,
    SharedModule,
    NgbTypeaheadModule,
    ModalModule ,
    NgbToastModule,
  ]
})
export class UserModule{
  constructor(library: FaIconLibrary) {
    library.addIcons(faCircle,faEllipsisV,faPencil,faTrash,faCheckCircle);
  }

 }
