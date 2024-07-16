import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Menu } from 'src/app/shared/models';
@Injectable({
  providedIn: 'root',
})
export class NavService {
  userMenuItems: Menu[] = [
    {
      id: 1,
      link: 'dashboard',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_analytics.svg',
      path: 'home',
    },
    {
      id: 2,
      link: 'user',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_user.svg',
      path: 'user',
    },
    {
      id: 3,
      link: 'product',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_cart.svg',
      path: 'products',
    },
    {
      id: 4,
      link: 'blog',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_blog.svg',
      path: 'blog',
    },
    {
      id: 5,
      link: 'login',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_lock.svg',
      path: 'sign-up',
    },
    {
      id: 6,
      link: 'not found',
      image:
        'https://minimal-kit-react.vercel.app/assets/icons/navbar/ic_disabled.svg',
      path: 'not-found',
    },
  ];
  userItems = new BehaviorSubject<Menu[]>(this.userMenuItems);

}
