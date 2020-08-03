# Test3

 ## 1) crear archivo javascript
 ```
var myExtObject = (function() {

    return {
      func1: function() {
        alert('function 1 called');
      },
      func2: function() {
        alert('function 2 called');
      }
    }

})(myExtObject||{})


var webGlObject = (function() { 
    return { 
      init: function() { 
        alert('webGlObject initialized');
      } 
    } 
})(webGlObject||{})
 ```

## 2) Agregar script en index.html
```<head>
...
<script src="./src/assets/js/script-prueba.js"></script>
...
</head>
 ```

## 3) Declarar Objetos ó funciones en .ts
```
declare var myExtObject: any;
declare var webGlObject: any;
```
### 4) Llamar a objetos/funciones/metodos dentro del ts
```
constructor(){
    webGlObject.init();
}

callFunction1() {
    myExtObject.func1();
}

callFunction2() {
    myExtObject.func2();
}
```

### 5) agregarlas al template Html:
```
<div>
    <p>click below buttons for function call</p>
    <button (click)="callFunction1()">Call Function 1</button>
    <button (click)="callFunction2()">Call Function 2</button>
</div>
```

### Referencias:
https://stackoverflow.com/questions/44817349/how-do-i-include-a-javascript-script-file-in-angular-and-call-a-function-from-th