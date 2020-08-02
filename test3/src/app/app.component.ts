import { Component } from '@angular/core';

declare var myExtObject: any;
declare var webGlObject: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  constructor() {
    webGlObject.init();
  }

  funcion1() {
    myExtObject.func1();
  }

  funcion2() {
    myExtObject.func2();
  }

}