import React from "react";
// Styles
import "components/Button.scss";
// Libraries
import classNames from "classnames";

export default function Button(props) {
  let buttonClass = classNames({
    button: true,
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
