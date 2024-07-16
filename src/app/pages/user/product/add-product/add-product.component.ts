import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProductService } from 'src/app/services';
import { Router } from '@angular/router';
import { AddedProduct } from 'src/app/shared/models';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  public form!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      thumbnail: ['', Validators.required],
      brand: ['', Validators.required],
      ideal: ['', Validators.required],
      washType: ['', Validators.required],
      color: ['', Validators.required],
      wearType: ['', Validators.required],
      sleevesLength: ['', Validators.required],
      images: this.fb.array([this.fb.control('', Validators.required)]),
    });
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
    return this.form.get('thumbnail');
  }

  addAlias() {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeAlias(i: number) {
    this.images.removeAt(i);
  }

  getValidity(i: any) {
    return (
      (<FormArray>this.form.get('images')).controls[i].invalid &&
      (<FormArray>this.form.get('images')).controls[i].touched
    );
  }

  onSubmit() {
    this._productService
      .addProducts(this.form.value)
      .subscribe((data: AddedProduct) => {
        this.router.navigate(['products/view', data.item._id])
      });
  }

}
