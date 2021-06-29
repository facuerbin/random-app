import React from "react";
import { tablaKolmogorov as tabla } from "../RandomApp/modules/tables";
import { kolmogorov } from "../RandomApp/pruebas_aleatorias";
import { utils } from "../RandomApp/utils";
import Table from "./Table";

export default function Kolmogorov() {
  const title = "Prueba de Kolmogorov-Smirnov";
  const ref = "/kolmogorov";

  const alpha = Object.keys(tabla).map((key, i) => {
    return <option value={key}>{key}</option>;
  });
  const defaultAlpha = Object.keys(tabla)[0];

  const [randomsValue, setRandomsValue] = React.useState("");
  const [alphaValue, setAlphaValue] = React.useState(defaultAlpha);
  const [renderTable, setRenderTable] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [data, setData] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const randoms = utils.filterRandoms(utils.parseNums(randomsValue));
    if (randoms.length === 0) {
      alert("Por favor ingrese números válidos...");
      return 0;
    }

    const alpha = Number(alphaValue);

    const results = kolmogorov(randoms, alpha);

    const tableData = [];
    for (let i = 0; i < randoms.length; i++) {
      tableData.push([
        (i + 1) / results.n,
        results.randoms[i],
        results.results[i],
      ]);
    }
    setTable(tableData);
    setData([
        ["N", results.n],
        ["Alpha", results.alpha],
        ["max(abs(i/N - Num Aleat))", results.max],
        [`Kolmogorov(${results.alpha},${results.n})`, results.tableValue],
        ["Resultado", results.testResult ? "Aprueba" : "No aprueba"]
    ]);

    setRenderTable(true);
  };

  if (renderTable === true) {
    return (
      <div className="App-body columns is-justify-content-center">
        <div className="column is-10 box mt-6 App-grow">
          <h2 className="has-text-weight-bold is-size-2">{title}</h2>
          <Table
            headers={["i / N", "Random", "abs(i/N - Random)"]}
            rows={table}
          />

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
