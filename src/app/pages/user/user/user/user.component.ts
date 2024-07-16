import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ElementRef,
  DoCheck,
  AfterViewInit,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  tap,
  pluck,
  filter,
} from 'rxjs';
import { DeleteComponent } from 'src/app/modal/delete/delete.component';
import { AuthService, CommonService } from 'src/app/services';
import {
  SortableDirective,
  SortEvent,
  compare,
} from 'src/app/shared/directives/sortable.directive';
import { RegisterForm, Users, User } from 'src/app/shared/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit, DoCheck {
  public users!: any;
  public page: number = 1;
  public count!: number;
  public activeTab!: number;
  public isSuccess: boolean = false;
  public select: string = '';
  @ViewChild('input') input!: ElementRef;

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;
  constructor(
    private _authService: AuthService,
    private modalService: NgbModal,
    private _commonService: CommonService
  ) {}

  // when get update
  ngDoCheck(): void {
    // if user deleted
    if (this._authService.isDeleted) {
      this.isSuccess = this._authService.isDeleted;
      this._authService.isDeleted = false;
      this._commonService.search.offset =
        (this.activeTab ?? this.page) * 10 - 10;
      this._authService
        .getUsers(this._commonService.search)
        .subscribe((user) => {
          let lastSlide = Math.ceil(user.count / 10);

          if (this.page >= lastSlide) {
            this.page = lastSlide;
            this.onSkip(this.page);
          } else {
            this.users = user?.data;
            this.count = user.count;
          }
        });
    }
  }

  // on load
  ngOnInit() {
    this._authService.getUsers(this._commonService.search).subscribe((user) => {
      this.users = user?.data;
      this.count = user.count;
    });
  }

  // after view
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(distinctUntilChanged(), debounceTime(500), pluck('target', 'value'))
      .subscribe((el) => {
        this.page = 1;
        this._commonService.search.keyword = el;
        this._authService
          .getUsers(this._commonService.search)
          .subscribe((user) => {
            this.users = user?.data;
            this.count = user.count;
          });
      });
  }

  // on open modal
  open(user: RegisterForm) {
    this.isSuccess = false;
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.user = user;
  }

  // on paginate
  onSkip(event:any) {
    let payload = { ...this._commonService.search };
    this.activeTab = event;
    payload.offset = (event * 10) - 10;
    this._authService.getUsers(payload).subscribe((user) => {
      this.users = user?.data;
      this.count = user.count;
    });
  }

  // on sort
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      return this.users;
    } else {
      this.users = [...this.users].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // on change column
  onChange(value: string) {
    this._commonService.search.filterBy = value;
    this.page = 1;
    this._commonService.search.offset = this.page * 10 - 10;
    this._authService.getUsers(this._commonService.search).subscribe((user) => {
      this.users = user?.data;
      this.count = user.count;
    });
  }

  // clear filters
  clearFilters() {
    this.page = 1;
    let payload = { ...this._commonService.search };
    payload.keyword = '';
    payload.filterBy = '';
    payload.max = 10;
    payload.offset = 0;
    this._authService.getUsers(payload).subscribe((user) => {
      this.users = user?.data;
      this.count = user.count;
      this.input.nativeElement.value= '';
    });
  }
}
