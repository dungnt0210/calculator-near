import React, { useEffect, useContext } from "react";
import { Button } from "antd";
import { CalculateContext } from "../context/CalculateContext";

const Keyboard = ({
  setParam1,
  setParam2,
  setOpt,
  isParam1Done,
  param1,
  param2,
  setIsParam1Done,
  opt,
}) => {
  const { add, minus, divide, multiple, square, squareRoot, result } =
    useContext(CalculateContext);
  useEffect(() => {
    if (isParam1Done) {
      setParam1(result);
    }
  }, [result]);

  useEffect(() => {
    if (opt === "square_root") {
      if (param1) {
        squareRoot(param1);
        setIsParam1Done(true);
      }
    } else if (opt === "square") {
      if (param1) {
        square(param1);
        setIsParam1Done(true);
      }
    } else if (opt === "add") {
      if (isParam1Done) {
        add(param1, param2);
        setParam2(0);
      } else {
        setIsParam1Done(true);
      }
    } else if (opt === "minus") {
      if (isParam1Done) {
        minus(param1, param2);
        setParam2(0);
      } else {
        setIsParam1Done(true);
      }
    } else if (opt === "multiple") {
      if (isParam1Done) {
        multiple(param1, param2);
        setParam2(0);
      } else {
        setIsParam1Done(true);
      }
    } else if (opt === "divide") {
      if (isParam1Done) {
        divide(param1, param2);
        setParam2(0);
      } else {
        setIsParam1Done(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opt]);
  const onNumClick = (num) => {
    if (isParam1Done) {
      param2 ? setParam2(parseInt(param2) * 10 + num) : setParam2(num);
    } else {
      param1 ? setParam1(parseInt(param1) * 10 + num) : setParam1(num);
    }
  };

  const onDelete = () => {
    if (isParam1Done) {
      param2 > 9 ? setParam2(Math.floor(param2 / 10)) : setParam2(0);
    } else {
      param1 > 9 ? setParam1(Math.floor(param1 / 10)) : setParam1(0);
    }
  };
  const clearMath = () => {
    setParam1(0);
    setParam2(0);
    setIsParam1Done(false);
    setOpt("");
  };
  const calculate = () => {
    if (!isParam1Done) {
      setIsParam1Done(true);
    } else {
      if (opt === "square_root") {
        if (param1) {
          squareRoot(param1);
          setIsParam1Done(true);
        }
      } else if (opt === "square") {
        if (param1) {
          square(param1);
          setIsParam1Done(true);
        }
      } else if (opt === "add") {
        if (isParam1Done) {
          add(param1, param2);
          setParam2(0);
        } else {
          setIsParam1Done(true);
        }
      } else if (opt === "minus") {
        if (isParam1Done) {
          minus(param1, param2);
          setParam2(0);
        } else {
          setIsParam1Done(true);
        }
      } else if (opt === "multiple") {
        if (isParam1Done) {
          multiple(param1, param2);
          setParam2(0);
        } else {
          setIsParam1Done(true);
        }
      } else if (opt === "divide") {
        if (isParam1Done) {
          divide(param1, param2);
          setParam2(0);
        } else {
          setIsParam1Done(true);
        }
      }
      setOpt("");
      setParam2(0);
    }
  };
  return (
    <table style={{border: "1px solid", backgroundColor:"#DCDCDC"}}>
      <tr>
        <td>
          <Button size="large" onClick={() => setOpt("square_root")} shape="circle">
            &radic;
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => setOpt("square")} shape="circle">
            ^2
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onDelete()} shape="circle">
            &lArr;
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => setOpt("divide")} shape="circle">
            :
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button size="large" onClick={() => onNumClick(7)} shape="circle">
            7
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(8)} shape="circle">
            8
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(9)} shape="circle">
            9
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => setOpt("multiple")} shape="circle">
            x
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button size="large" onClick={() => onNumClick(4)} shape="circle">
            4
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(5)} shape="circle">
            5
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(6)} shape="circle">
            6
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => setOpt("add")} shape="circle">
            +
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button size="large" onClick={() => onNumClick(1)} shape="circle">
            1
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(2)} shape="circle">
            2
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(3)} shape="circle">
            3
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => setOpt("minus")} shape="circle">
            -
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button size="large" shape="circle" onClick={() => clearMath()}>
            C
          </Button>
        </td>
        <td>
          <Button size="large" onClick={() => onNumClick(0)} shape="circle">
            0
          </Button>
        </td>
        <td colspan="2">
          <Button size="large"
            shape="round"
            onClick={() => calculate()}
            type="primary"
            style={{ width: "100%" }}
          >
            =
          </Button>
        </td>
      </tr>
    </table>
  );
};
export default Keyboard;
