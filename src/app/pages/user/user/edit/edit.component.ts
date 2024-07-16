import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services';
import {User } from 'src/app/shared/models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  public user!: User;
  public isSubmit: boolean = false;
  public isSuccess: boolean | undefined = false;
  public message!:string;

  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    this._authService.getById(id).subscribe((user) => (this.user = user));
  }

  updateUserDetails(value:any) {
    this.isSubmit = true;
    this._authService.updateUserInfo(this.user._id, value).subscribe((user) => {
      this.isSuccess = user?.success;
      this.isSubmit = false;
      this.message = user?.['message'];
      let id = this.route.snapshot.paramMap.get('id');
      this._authService.getById(id).subscribe((user) => (this.user = user))
    });

  }
}
