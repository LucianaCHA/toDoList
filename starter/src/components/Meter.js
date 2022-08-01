import React from "react";
import "./Meter.css";
export default function Meter() {
  const salarios = [
    { name: "João", salario: 120000, puesto: "Developer", senority: "Junior" },
    { name: "Maria", salario: 200500, puesto: "Developer", senority: "Junior" },
    { name: "José", salario: 35000, puesto: "Designer", senority: "Senior" },
    { name: "Pedro", salario: 80000, puesto: "Designer", senority: "Senior" },
    {
      name: "Juan",
      salario: 50300,
      puesto: "Designer",
      senority: "SemiSenior",
    },
  ];
  let min = 50000;
  let max = 100000;

  return salarios.map((salario) => (
    <div className="card" key={salario.name}>
    <h6>{salario.name}{salario.salario} </h6>
      <div class="graph">
      
        <span class={salario.salario < min ? "min alert" : "min ok" }>{min} </span>
        <meter
          className={salario.salario > max ? "tope" : "mix"}
          min={min}
          low ={min}
          high={max}
          max={max}
          value={salario.salario}
        ></meter>
        <span class={salario.salario < max && salario.salario > min ? "max ok" : salario.salario > max ? "max alert" : "max"} >{max} </span>
      </div>
    </div>
  ));
}
