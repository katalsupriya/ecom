import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements AfterViewInit {
  constructor(private renderer: Renderer2){

  }
  ngAfterViewInit(): void {
    let root = this.renderer.selectRootElement('#initial-loader');
     this.renderer.setStyle(root, 'display', 'none');
  }

  

}
