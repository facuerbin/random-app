import React from "react";
import { tablaChi as tabla } from "../RandomApp/modules/tables";
import { serial } from "../RandomApp/pruebas_aleatorias";
import { utils } from "../RandomApp/utils";
import Table from "./Table";

export default function Serial() {
  const title = "Prueba Serial";
  const ref = "/serial";

  const alpha = Object.keys(tabla).map((key, i) => {
    return <option value={key}>{key}</option>;
  });
  const defaultAlpha = Object.keys(tabla)[0];

  const [randomsValue, setRandomsValue] = React.useState("");
  const [alphaValue, setAlphaValue] = React.useState(defaultAlpha);
  const [renderTable, setRenderTable] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [tableChi, setTableChi] = React.useState([]);
  const [data, setData] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const randoms = utils.parseNums(randomsValue);
    if (randoms.length === 0) {
      alert("Por favor ingrese números válidos...");
      return 0;
    }
    if (Math.sqrt(randoms.length) !== parseInt(Math.sqrt(randoms.length), 10)) {
      alert("Por favor ingrese una matriz válida...");
      return 0;
    }

    const alpha = Number(alphaValue);

    const results = serial(randoms, alpha);

    console.log(results);

    const tableData = results.matrix.matrix;
    setTable(tableData);

    const chiTableData = [];
    results.chi.frecObs.forEach( (obs,i) => {
        chiTableData.push([obs, results.chi.frecEsp, results.chi.chi[i]]);
    })
    setTableChi(chiTableData);

    setData([
      ["N", results.matrix.total],
      ["k", results.matrix.k],
      ["Parejas", results.matrix.couples],
      [`Chi²(${results.alpha},${results.matrix.k ** 2 - 1})`, results.tableValue],
      ["Estadístico muestral", results.chi.estadisticoMuestral],
      ["Resultado", results.testResult ? "Aprueba" : "No aprueba"]
    ]);

    setRenderTable(true);
  };

  if (renderTable === true) {
    return (
      <div className="App-body columns is-justify-content-center">
        <div className="column is-10 box mt-6 App-grow">
          <h2 className="has-text-weight-bold is-size-2">{title}</h2>
          <h3>Matriz de Distribución</h3>
          <Table headers={[]} rows={table} />

          <h3>Tabla de Chi²</h3>
          <Table headers={["Frec. Observada", "Frec. Esperada", "Chi²"]} rows={tableChi} />

          <Table headers={["Variable", "Resultado"]} rows={data} />
          <a href={ref} className="button is-primary">
            Volver
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App-body columns is-vcentered is-justify-content-center">
        <form className="column is-10 box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">
              <h2 className="has-text-weight-bold is-size-2">{title}</h2>
            </label>
            <label className="label">Números</label>
            <div className="field">
              <textarea
                className="textarea"
                placeholder="Ingrese las distribuciones separadas por coma... Por ej X11,X12,X21,X22"
                rows="10"
                onChange={(e) => {
                  const inputRandoms = e.target.value;
                  setRandomsValue(inputRandoms);
                }}
              ></textarea>
            </div>
          </div>

          <div className="columns">
            <div className="field column is-12">
              <label className="label">Alpha</label>
              <div className="select">
                <select
                  defaultValue={defaultAlpha}
                  onChange={(e) => {
                    const selectedAlpha = e.target.value;
                    setAlphaValue(selectedAlpha);
                  }}
                >
                  {alpha}
                </select>
              </div>
            </div>
          </div>

          <button className="button is-primary">Probar</button>
        </form>
      </div>
    );
  }
}
