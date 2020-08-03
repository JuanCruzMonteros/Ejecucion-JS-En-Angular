# Test1

## Pasos:
### 1) Agregar un archivo JavaScript personalizado en su aplicación, copie o cree su propio archivo js en src / assets / js /

´´´
"scripts": [
  .....
  "src/assets/js/custom-js.js"
]
´´´

### 2) Declarar una variable que tenga el mismo nombre que la funcion o variable. En nuestro caso "Funcion123"
´´´
"scripts": [
  .....
  declare const Funcion123: any;
]
´´´


Lo que se encuentre dentro de function se ejecutará y sino, llamando a funciones o metodos del script desde angular se podra ejecutar los mismos.

### Referencias:
https://www.truecodex.com/course/angular-6/how-to-use-external-js-files-and-javascript-code-in-angular