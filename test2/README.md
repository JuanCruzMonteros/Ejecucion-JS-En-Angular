# Test2

## Forma generica de ejecución en index.html

### Se agrega el script a index.html . En caso de tenerlo en local se agrega el script en assets, en caso de ser una url externa , simplemente se agrega entre comillas.
```
  <script>
    var url = "./assets/js/test.js";

    $.getScript(url, function () {
      $(document).ready(function () {
        console.log(str); // Prints: Hi there!
        console.log(num); // Prints: 15
        console.log("4*25 = " + multiplicar(4, 25)); // Prints: 100
      });
    });
  </script>
```