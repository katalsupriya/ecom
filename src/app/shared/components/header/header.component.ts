import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, CartService } from 'src/app/services';
import { Router } from '@angular/router';
import { Cart, User } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isMenuCollapsed: boolean = false;
  public user!: User;
  public time!: string;
  public $cartCount!: Observable<Cart>;
  constructor(
    private offcanvasService: NgbOffcanvas,
    private _authService: AuthService,
    private router: Router,
    private _cartService: CartService
  ) {}

  openTop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' });
  }

  ngOnInit(): void {
    this.$cartCount = this._cartService.getCartItems();

    this._authService.currentUser().subscribe((user) => {
      this.user = user;
      console.log(user.updatedAt);
      let date = user.updatedAt;
      let update: any = new Date(date);
      this.time = update.toLocaleString();
      let endTime: any = new Date();
      let timeDiff = endTime - update; //in ms
      // strip the ms
      timeDiff /= 1000;

      // get seconds
      var seconds = Math.round(timeDiff / 60);
      console.log(timeDiff % 3600);
      if (seconds % 6) {
        console.log(seconds + ' hours');
      } else {
        console.log(seconds + ' time');
      }
    });
  }

 ngDoCheck() {
    this._cartService.isAddedToCart.subscribe((data) => {
      if (data) {
        this.$cartCount = this._cartService.getCartItems();
        this._cartService.isAddedToCart.next(false);
      }
    
    });
  }

  logout() {
    this._authService
      .logout()
      .pipe()
      .subscribe((data: any) => {
        if (data.success) {
          this.router.navigate(['/sign-in']);
        }
      });
  }
}
