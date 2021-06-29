import React from "react";
import { middleSquare } from "../RandomApp/generators";
import Table from "./Table";

export default function MiddleSquare() {
  const title = "Generador de Cuadrado Medio";
  const ref = "/generator/middle-square";

  const ammounts = [];
  for (let i = 10; i <= 200; i++) {
    ammounts.push(<option value={i}>{i}</option>);
  }
  const defaultAmmount = 10;

  const lengths = [];
  for (let i = 2; i <= 8; i++) {
    lengths.push(<option value={i}>{i}</option>);
  }
  const defaultLength = 2;

  const [seedValue, setSeedValue] = React.useState("");
  const [ammountValue, setAmmountValue] = React.useState(defaultAmmount);
  const [lengthValue, setLengthValue] = React.useState(defaultLength);
  const [renderTable, setRenderTable] = React.useState(false);
  const [table, setTable] = React.useState([]);
  const [data, setData] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const seed = Number(seedValue);
    if (seed === 0) {
      alert("Por favor ingrese una semilla válida...");
      return 0;
    }
    const ammount = Number(ammountValue);
    const length = Number(lengthValue);

    const results = middleSquare(seed, length, ammount);

    console.log(results);
    const tableData = results.randoms.map( (element, i) => {
        return [i, element, results.normalized[i]];
    });
    setTable(tableData);
    
    setData([
        ["Semilla", results.seed],
        ["Longitud", results.length],
        ["Cantidad de Números", results.ammount],
    ]);
    
    setRenderTable(true);
  };

  if (renderTable === true) {
    return (
      <div className="App-body columns is-justify-content-center">
        <div className="column is-10 box mt-6 App-grow">
          <h2 className="has-text-weight-bold is-size-2">{title}</h2>
          <h3>Números Generados</h3>
          <Table headers={["n", "Random", "Normalizado"]} rows={table} />

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

          <div className="columns">
            <div className="field column is-12">
              <label className="label">Longitud</label>
              <div className="select">
                <select
                  defaultValue={defaultLength}
                  onChange={(e) => {
                    const selectedLength = e.target.value;
                    setLengthValue(selectedLength);
                  }}
                >
                  {lengths}
                </select>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="field column is-12">
              <label className="label">Cantidad de números a generar</label>
              <div className="select">
                <select
                  defaultValue={defaultAmmount}
                  onChange={(e) => {
                    const selectedAmmount = e.target.value;
                    setAmmountValue(selectedAmmount);
                  }}
                >
                  {ammounts}
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
