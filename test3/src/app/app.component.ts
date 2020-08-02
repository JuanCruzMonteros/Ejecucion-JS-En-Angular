import { Component } from '@angular/core';

declare var myExtObject: any;
declare var webGlObject: any;


declare var add: any;
declare var bcp: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  /*
  add('genp', 'CodPaq:106,0');
    bcp();
    */
  constructor() {
    webGlObject.init();

    add('genp', 'CodPaq:106,0');
    bcp();
  }

  funcion1() {
    myExtObject.func1();
  }

  funcion2() {
    myExtObject.func2();
  }

}