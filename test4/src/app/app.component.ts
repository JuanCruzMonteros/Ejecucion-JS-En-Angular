import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  /* 'https://tags.crwdcntrl.net/c/6596/cc.js?ns=_cc6596' 
      script.add('genp', 'CodPaq:106,0');
      script.bcp();
  */
  constructor(private renderer: Renderer2) {
    this.addJsToElement('https://tags.crwdcntrl.net/c/6596/cc.js?ns=_cc6596').onload = () => {
      console.log('analitica loaded');
    }

    /* this.addJsToElement('https://tags.crwdcntrl.net/c/6596/cc.js?ns=_cc6596').onload; */
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
