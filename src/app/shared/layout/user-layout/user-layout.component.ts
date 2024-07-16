import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements AfterViewInit {
  constructor(private render:Renderer2) {
  }

  ngAfterViewInit(): void {
   let loader = this.render.selectRootElement('#initial-loader');
     this.render.setStyle(loader,'display','none');

  }
}
