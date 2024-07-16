import { Component, Input } from '@angular/core';
import { NgbActiveModal,NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services';
import { DeleteResponse } from 'src/app/shared/models';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
	@Input() user!:DeleteResponse;

	constructor(public activeModal: NgbActiveModal,public _authService:AuthService,private modalService: NgbModal) {}

  // on delete record
  delete(){
    this._authService.delete(this.user._id).subscribe(data=>{
      if(data!==undefined && data !== null){
      this.modalService.dismissAll();
      this._authService.isDeleted = true;
      }
    })
  }
}



