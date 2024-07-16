import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Renderer2, RendererStyleFlags2 } from '@angular/core';



fdescribe('SignInComponent', () => {
  let component: SignInComponent;

 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
   imports:[ReactiveFormsModule,],
      providers: [SignInComponent,ReactiveFormsModule,FormBuilder, Renderer2],
    });
  });

  beforeEach(()=>{   
    component =  TestBed.inject(SignInComponent);
  })

  it('form is valid',()=>{
    expect(component.form.valid).toBeFalse();
  })

  it('email is invalid on load',()=>{
    let email = component.form.controls['email']

    expect(email.valid).toBeFalsy();
  })

  it('password is invalid on load',()=>{
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalse();
  })

  it('email and password have value',()=>{
    let password = component.form.controls['password'];
    password.setValue('123456')
    let email = component.form.controls['email'];
    email.setValue('test@gmail.com');
    email.setValidators([Validators.email])
    password.setValidators([Validators.maxLength(6)])
     expect(email.valid && password.valid).toBeTruthy();

  })

  it('email and password have value',()=>{
    let password = component.form.controls['password'];
    password.setValue('123456')
    let email = component.form.controls['email'];
    email.setValue('test@gmail');
    

    

  })

  // it('form invalid when empty', () => {
  //   expect(component.form.valid).toBeFalsy();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('email field validity', () => {
  //   let email = component.form.controls['email']; 
  //   expect(email.valid).toBeFalsy(); 
  // });


});
