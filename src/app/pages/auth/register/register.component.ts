import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RegisterForm } from 'src/app/shared/models';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit,AfterViewInit {
  public form!: FormGroup;
  public isSubmit: boolean = false;
  constructor(public fb: FormBuilder, private _authService: AuthService,private router: Router,private render:Renderer2) {}

  ngAfterViewInit(): void {
      let root = this.render.selectRootElement('.initial-loader');
        this.render.setStyle(root,'display', 'none');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['male'],
    });

    this._authService.getAuthToken();
    if(this._authService.user){
     this.router.navigate(['/home']);
    }
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get phone() {
    return this.form.get('phone');
  }

  get city() {
    return this.form.get('city');
  }

  get email() {
    return this.form.get('email');
  }

  get gender() {
    return this.form.get('gender');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

 onSubmit() {
    this.isSubmit = true;
    this._authService.register(this.form.value).subscribe(data=>this.router.navigate(['/home']),(error)=>this.isSubmit=false,()=>this.isSubmit=false);
  }
}
