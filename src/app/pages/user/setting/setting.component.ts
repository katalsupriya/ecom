import { Component, ElementRef, Renderer2, ViewChild, ViewChildren, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public user!: User;
  public isSubmit: boolean = false;
  public isSuccess: boolean | undefined = false;
  public message!: string;
  public isEnter:boolean = false;
  private fileToUpload!: File | string | Blob;
  public image!:any;
  public imageUrl!:string;
  public progress!:number;
  public isUploading:boolean = false;
  public src!:any;
  constructor(private _authService: AuthService,private _renderer:Renderer2) {}

  ngOnInit(): void {
    this._authService.currentUser().subscribe((user) => {
     this.user = user;
    });
  }

  handleFileInput(e: any) {
    this.fileToUpload = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		
		reader.onload = (_event) => {
			this.src = reader.result; 
		}
  }

  updateUserDetails(value: any) {
    this.isSubmit = true;
    this._authService.updateUserInfo(this.user._id, value).subscribe((user) => {
      this.isSuccess = user?.success;
      this.isSubmit = false;
      this.message = user?.['message'];
      this._authService.currentUser().subscribe((user) => {
        this.user = user;
       });
    });
  }
}
