// v0.1 terminada funciona la generacion para un solo campo por el momento :D
let contador = 1;
function addInput() {
  document.getElementById("campos").innerHTML +=
    '<div class="element-campos"><label for="modelo">Field ' +
    ++contador +
    '</label><input type="text" class="form-control input-field" name="campo' +
    contador +
    '" id="campo' +
    contador +
    '" aria-describedby="helpId" placeholder="Write here..."></div>';
}

function convertir() {
  let sql = document.getElementById("sql").value;

  let linea = sql.split(";");
  linea = linea.map((element) => {
    return element.trim();
  });

  linea.map((item) => analizar(item));
}

function analizar(item) {
  let parametros = item
    .toString()
    .replaceAll("(", "[")
    .replaceAll(")", "]")
    .match(/\[(.*)\]/)
    .pop();

  // leyendo codigo sql correcto

  let ok = true;
  let sqlCode = item.split(" ");

  ok =
    sqlCode[0].toLowerCase() === "insert" &&
    sqlCode[1].toLowerCase() === "into";

  ok === false
    ? console.log("no se reconoce un codigo sql de insercion de datos correcto")
    : console.log("todo ok");

  let table = sqlCode[2].replaceAll("`", "");

  parametros = filterParams(parametros);

  parametros = parametros.split(",");
  let campo = "";
  let laravelCode = "";
  //
  

  let string = table[0].toUpperCase() + table.substring(1) + '::create(["';

  for (let i = 0; i < parametros.length; i++) {
    campo = "campo" + (i + 1);

    if (i + 1 != parametros.length) {
      laravelCode +=
        document.getElementById(campo).value +
        '" => ' +
        parametros[i].toString().replaceAll("'", '"') +
        ',"';
    } else {
      laravelCode +=
        document.getElementById(campo).value +
        '" => ' +
        parametros[i].toString().replaceAll("'", '"');
    }
  }

  document.getElementById("resultado").innerHTML +=
    string + laravelCode + "]);\n" }

function filterParams(item) {
  item = item.replace("null,", "");

  return item;
}
