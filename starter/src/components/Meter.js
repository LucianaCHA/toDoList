import React from "react";
import "./Meter.css";
import { createPopper } from "@popperjs/core";

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
//popprr para mostrar valor de salario en el tooltip
const popover = document.querySelector("#popover");
const tooltip = document.querySelector("#tooltip");

const poper = createPopper(popover, tooltip, {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
      }
  ]
});

function show (){
  // popover.style.display = "block";
  //muestro salario en tooltip
  tooltip.setAttribute("data-show", "$" + min, "data-show", "$" + max, "position", "absolute");
  console.log('this value', Meter.attributes);

  poper.setOptions((options) => ({
    ...options,
    modifiers:[
      ...options.modifiers,
      {
        name:"eventListeners",
        enabled: true,
      }
    ]
  }));
  //actualiza posici+on de tooltip
  poper.update();
}

  function hide (){
  //  popover.style.display = "none";
   tooltip.removeAttribute("data-show");
    poper.setOptions((options) => ({
      ...options,
      modifiers:[
        ...options.modifiers,
        {
          name:"eventListeners",
          enabled: false,
        }
      ]
    }))
  }

  const showEvent = ["mouseenter", "touchstart", "focus"];
  const hideEvent = ["mouseleave", "touchend", "blur"];

  showEvent.forEach((event) => {
    popover?.addEventListener(event, show);
  })

  hideEvent.forEach((event) => {
    popover?.addEventListener(event, hide);
  }
  )

  return salarios.map((salario) => (
    <div id="popover" key={salario.name}>
    <h6>{salario.name}{salario.salario} </h6>
    <div id="tooltip" role="tooltip" style={{ fontSize:"12px" }} ></div>
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
  
  ));
}
