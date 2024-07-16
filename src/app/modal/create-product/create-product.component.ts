import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig, } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  public form!: FormGroup;
  @Input() height = 750;
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private _productService: ProductService,
    private config:NgbModalConfig,
    private _modalService:NgbModal
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      title: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      thumbnail: ['', Validators.required],
      images: this.fb.array([
        this.fb.control('',Validators.required)
      ])
    });

    console.log(this.height)
  }

  get title() {
    return this.form.get('title');
  }

  get brand() {
    return this.form.get('brand');
  }

  get description() {
    return this.form.get('description');
  }

  get path() {
    return this.form.get('path');
  }

  get defaultSelect() {
    return this.form.get('defaultSelect');
  }

  get price() {
    return this.form.get('price');
  }

  get stock() {
    return this.form.get('stock');
  }

  get images() {
    return this.form.get('images') as FormArray;
  }

  get thumbnail() {
    return this.form.get('thumbnail')
  }

  addAlias() {
    this.images.push(this.fb.control('',Validators.required));
  }

  getValidity(i:any) {
    return (<FormArray>this.form.get('images')).controls[i].invalid &&(<FormArray>this.form.get('images')).controls[i].touched;
  }

  onSubmit() {
    console.log(this.form);

    this._productService.addProducts(this.form.value).subscribe(data => {
      console.log(data);
    })
  }

  test(){
   
    this.activeModal.dismiss('Cross click')
  }
}
