import React from "react";
import { congruential } from "../RandomApp/generators";
import Table from "./Table";

export default function Congruential() {
  const title = "Generador Congruencial";
  const ref = "/generator/congruential";

  const [seedValue, setSeedValue] = React.useState("");
  const [aValue, setAValue] = React.useState("");
  const [bValue, setBValue] = React.useState("");
  const [mValue, setMValue] = React.useState("");
  const [renderTable, setRenderTable] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [data, setData] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const seed = Number(seedValue);
    const a = Number(aValue);
    const b = Number(bValue);
    const m = Number(mValue);
    if (seed >= m) {
      alert(
        "Por favor ingrese una semilla válida, la semilla no debe ser mayor o igual al módulo m..."
      );
      return 0;
    }
    if (a <= 0) {
      alert("Por favor ingrese un número a válido (a > 0)...");
      return 0;
    }
    if (m <= 1) {
      alert("Por favor ingrese un módulo válido (m > 1)...");
      return 0;
    }

    const results = congruential(seed, a, b, m);

    console.log(results);
    const tableData = results.randoms.map((element, i) => {
      return [i, element, results.normalized[i]];
    });
    setTable(tableData);

    
    setData([
        ["a", results.a],
        ["b", results.b],
        ["m", results.m],
        ["X0", results.seed],
        ["Ecuación", `(${results.a}*Xn + ${results.b}) mod ${results.m}`],
        ["Periodo", results.period],
        ["¿Ciclo Completo?", results.maxPeriod? "SÍ": "NO"],
        ["Tipo de Generador Congruencial", results.b === 0? "Multiplicativo": "Lineal"]
    ]);
    
    setRenderTable(true);
  };

  if (renderTable ===  true) {
    return (
      <div className="App-body columns is-justify-content-center">
        <div className="column is-10 box mt-6 App-grow">
          <h2 className="has-text-weight-bold is-size-2">{title}</h2>
          <h3>Números Generados</h3>
          <Table headers={["n", "Xn", "Xn Normalizado"]} rows={table} />

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
            <label className="label">Semilla</label>
            <div className="field">
              <input
                class="input has-text-centered App-input"
                type="text"
                placeholder="Ingrese el número semilla..."
                onChange={(e) => {
                  const inputSeed = e.target.value;
                  setSeedValue(inputSeed);
                }}
              />
            </div>
          </div>

          <label className="label">a</label>
          <div className="field">
            <input
              class="input has-text-centered App-input"
              type="text"
              placeholder="Ingrese el número a..."
              onChange={(e) => {
                const inputA = e.target.value;
                setAValue(inputA);
              }}
            />
          </div>

          <label className="label">b</label>
          <div className="field">
            <input
              class="input has-text-centered App-input"
              type="text"
              placeholder="Ingrese el número b..."
              onChange={(e) => {
                const inputB = e.target.value;
                setBValue(inputB);
              }}
            />
          </div>

          <label className="label">m</label>
          <div className="field">
            <input
              class="input has-text-centered App-input"
              type="text"
              placeholder="Ingrese el número m..."
              onChange={(e) => {
                const inputM = e.target.value;
                setMValue(inputM);
              }}
            />
          </div>

          <button className="button is-primary">Probar</button>
        </form>
      </div>
    );
  }
}
