import React from "react";

export default function Table(props) {

    const headers = props.headers.map( header => {
        return (<th>{header}</th>)
    });
    const rows = props.rows.map( row => {
        return (
        <tr>
            {row.map( data => {
                return(
                <td>
                    {data}
                </td>)
            })}
        </tr>)
    })
    console.log(headers ,rows, props)
  return (
    <table class="table is-striped is-bordered is-hoverable is-fullwidth">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
