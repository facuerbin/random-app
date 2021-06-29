import React from "react";
import { tablaChi as tabla } from "../RandomApp/modules/tables";
import { chiCuadrada } from "../RandomApp/pruebas_aleatorias";
import { utils } from "../RandomApp/utils";
import Table from "./Table";

export default function Chi() {
  const alpha = Object.keys(tabla).map((key, i) => {
    return <option value={key}>{key}</option>;
  });
  const intervals = [];
  for (let i = 2; i < tabla[0.5].length; i++) {
    intervals.push(<option value={i}>{i}</option>);
  }
  const defaultAlpha = Object.keys(tabla)[0];
  const defaultInterval = 2;

  const [randomsValue, setRandomsValue] = React.useState("");
  const [alphaValue, setAlphaValue] = React.useState(defaultAlpha);
  const [intervalValue, setIntervalValue] = React.useState(defaultInterval);
  const [renderTable, setRenderTable] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [data, setData] = React.useState("");

  const tableData = [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const randoms = utils.filterRandoms(utils.parseNums(randomsValue));
    if (randoms.length === 0) {
        alert("Por favor ingrese números válidos...");
        return 0;        
    }
    const intervals = Number(intervalValue);
    const alpha = Number(alphaValue);

    const results = chiCuadrada(randoms, intervals, alpha);

    const tableIntervals = [];
    for (let i = 1; i <= intervals; i++) {
      tableIntervals.push(`[ ${(i - 1) / intervals} , ${i / intervals} )`);
    }
    const frecObs = results.distribution.map((element) => {
      return element.length;
    });

    tableIntervals.forEach((interval, i) => {
      tableData.push([interval, frecObs[i], results.frecEsp]);
    });

    setData([
      ["Alpha", results.alpha],
      ["Intervalos", results.intervals],
      ["Gados de libertad", results.gradosLib],
      ["Estadístico muestral", results.estadisticoMuestral],
      [`Chi(${results.alpha},${results.gradosLib})`, results.tableValue],
      ["Resultado", results.testResult ? "Aprueba" : "No aprueba"],
    ]);
    setTable(tableData);
    setRenderTable(true);
  };

  if (renderTable === true) {
    return (
      <div className="App-body columns is-justify-content-center">
        <div className="column is-10 box mt-6 App-grow">
          <h2 className="has-text-weight-bold is-size-2">
            Prueba de la Chi Cuadrada
          </h2>
          <h3>Tabla de Chi²</h3>
          <Table
            headers={["Intervalos", "Frec. Observada", "Frec. Esperada"]}
            rows={table}
          />

          <Table headers={["Variable", "Resultado"]} rows={data} />
          <a href="/chi" className="button is-primary">
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
              <h2 className="has-text-weight-bold is-size-2">
                Prueba de la Chi Cuadrada
              </h2>
            </label>
            <label className="label">Números</label>
            <div className="field">
              <textarea
                className="textarea"
                placeholder="Ingrese lo números aleatorios separados por coma..."
                rows="10"
                onChange={(e) => {
                  const inputRandoms = e.target.value;
                  setRandomsValue(inputRandoms);
                }}
              ></textarea>
            </div>
          </div>

          <div className="columns">
            <div className="field column is-6">
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

            <div className="field column is-6">
              <label className="label">Intervalos</label>
              <div className="select">
                <select
                  defaultValue={defaultInterval}
                  onChange={(e) => {
                    const selectedInterval = e.target.value;
                    setIntervalValue(selectedInterval);
                  }}
                >
                  {intervals}
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
