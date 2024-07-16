import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services';
import { NgForm } from '@angular/forms';
import { filter, map, tap } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  private fileToUpload!: File | string | Blob;
  private form!: NgForm;
  public image!:any;
  public imageUrl!:string;
  public progress!:number;
  public isUploading:boolean = false;
  constructor(private _uploadService: UploadService) {}

  ngOnInit(): void {
    this._uploadService.getImage().subscribe(data=>this.image =data)

  }

  handleFileInput(e: any) {
    if (e) console.log(e.target.files[0]);
    this.fileToUpload = e.target.files[0];

  }

  onSubmit() {
    console.log('value');
    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    this._uploadService
      .uploadImage(formData).pipe(tap(()=>this.isUploading = true))
      .subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            var eventTotal = event.total ? event.total : 0;
            this.progress = Math.round(event.loaded / eventTotal * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Image Upload Successfully!', event.body);
            this.isUploading = false;
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
            this._uploadService.getImage().subscribe(data=>this.image =data)
        }
      });
  }
}
