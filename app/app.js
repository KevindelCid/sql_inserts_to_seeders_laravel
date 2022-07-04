// v0.1 terminada funciona la generacion para un solo campo por el momento :D
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

  let table = sqlCode[2];

  parametros = filterParams(parametros);

  document.getElementById("resultado").innerHTML +=
    table +
    '::create(["' +
    document.getElementById("modelo").value +
    '" => ' +
    parametros.toString().replaceAll("'", '"') +
    "]);<br>";
}

function filterParams(item) {
  item = item.toString().replace("null,", "");

  return item;
}
