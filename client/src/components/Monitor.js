import React, { useState, useEffect, useContext } from "react";

const Monitor = ({ param1, param2, opt, isParam1Done }) => {
  const [mathText, setMathText] = useState("");
  useEffect(() => {
    if (param2) {
      setMathText(param1 + " " + opt + " " + param2);
    } else if (opt) {
      setMathText(param1 + " " + opt);
    } else {
      setMathText(param1);
    }
  }, [param1, param2, opt]);
  return (
    <div style={{ border: "1px solid", borderBottom: 0 }}>
      <div>{mathText}</div>
      <div style={{ fontSize: "20px", textAlign: "right" }}>
        {param2 ? param2 : param1}
      </div>
    </div>
  );
};
export default Monitor;
