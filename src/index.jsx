import React, { Fragment } from "react";
import ReactDom from "react-dom";
import { Button } from "antd";
import "./index.less";

function App() {
  return (
    <Fragment>
      <Button type="primary">primary</Button>
      <Button>default</Button>
      12335888
    </Fragment>
  );
}

ReactDom.render(<App />, document.getElementById("app"));
