import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   // Conditional styling if these props were passed down, add the class modifier to it
   if (props.confirm) buttonClass += " button--confirm";
   if (props.danger) buttonClass += " button--danger";


   return (
      <button className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   ); 
};
