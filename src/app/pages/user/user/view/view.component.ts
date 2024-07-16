import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
 public user!:User
  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  let id = this.route.snapshot.paramMap.get('id')
    this._authService.getById(id).subscribe(user=>this.user=user,(error)=> this.router.navigate(['/not-found']))
  }

}
