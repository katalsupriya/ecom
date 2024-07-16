import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import {
  faSearch,
  faUserCircle,
  faBell,
  faIdCard,
  faGear,
  faSignOut,
  faBagShopping
} from '@fortawesome/free-solid-svg-icons';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SortableDirective } from './directives/sortable.directive';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TruncatePipe } from './pipes/truncate.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    UserSidebarComponent,
    UserLayoutComponent,
    SortableDirective,
    SearchPipe,
    PaginationComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FontAwesomeModule,
    NgbCollapseModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
  exports: [
    SortableDirective,
    SearchPipe,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    TruncatePipe
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBell, faUserCircle, faSearch,faIdCard,faGear,faSignOut, faBagShopping);
  }
}
