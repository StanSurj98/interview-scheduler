import React from "react";
// Styles
import "components/Button.scss";
// Libraries
import classNames from 'classnames';

export default function Button(props) {
   // Using the classNames library here to conditionally apply className to button
   let buttonClass = classNames({
      "button": true, 
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });


   // We added the onClick and disabled props here from stories rn in isolated testing
   return (
      <button 
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   ); 
};
