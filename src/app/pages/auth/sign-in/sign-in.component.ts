import { Component, OnInit, Renderer2, AfterViewInit, inject } from '@angular/core';
import {
  FormGroup,
  FormControlName,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit,AfterViewInit {
  public isError = false;
	public autohide = true;
  protected isRegister: boolean = true;
  public form!: FormGroup;
  public isSubmit: boolean = false;
  public errorMessage!:string;
  private fb = inject(FormBuilder)
  private _authService = inject(AuthService);
  private router = inject(Router);
  private render = inject(Renderer2);


  ngAfterViewInit(): void {
   let root = this.render.selectRootElement('.initial-loader');
   root && this.render.setStyle(root,'display', 'none');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
    });

  this._authService.getAuthToken();
   if(this._authService.user){
    this.router.navigate(['/home']);
   }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.isSubmit = true;
    this.isError = false;
    this._authService.login(this.form.value).subscribe(
      (data) =>{this.router.navigate(['/home'])},
      (error) => {this.isSubmit = false; this.errorMessage = error.message; this.isError=true;},
      () => {this.isSubmit = false;}
    );
  }

  toggleForm(): void {
    this.isRegister = !this.isRegister;
  }
}
