import React, { useState, useEffect } from "react";
import {
  getHealthBarBackgroundColor,
  defaultColorPallet
} from './util/HealthBarUtils';


export default function HealthBar(props, {
  colors = defaultColorPallet,
  width = 350,
  height = 24
}) {

    const [percentage, setCount] = useState(100)

    useEffect(() => {
      setCount(props.damage)
    }, [props.damage])

  return (
    <div
      style={{
        borderRadius: '3px',
        border: '1px solid black',
        maxWidth: width,
        height
      }}
    >
      <div
        style={{
          width: `${[percentage]}%`,
          height: '100%',
          minHeight: height,
          backgroundColor: getHealthBarBackgroundColor(100, colors)
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}
