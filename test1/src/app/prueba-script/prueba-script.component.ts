import { Component, OnInit } from '@angular/core';

declare const Funcion123: any;
declare const variable1: any;
declare const cambiarColor: any;

declare const add: any;

@Component({
  selector: 'app-prueba-script',
  templateUrl: './prueba-script.component.html',
  styleUrls: ['./prueba-script.component.scss']
})

export class PruebaScriptComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
    Funcion123();
    console.log(variable1);
  }

  onClick() {
    cambiarColor("#333333");
  }

  onClick2() {
    /* _cc6596.add('genp','CodPaq:106,0');
    _cc6596.bcp(); */
  }
}
