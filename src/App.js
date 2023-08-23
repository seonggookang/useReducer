import React from "react";
import Bank from "./bank/Bank";
import Students from "./students/Students";

// reducer(은행) : state 업데이트
// dispatch(요구)
// action (요구의 내용)

function App() {
  return (
    <div>
      <Bank />
      <hr />
      <Students />
    </div>
  );
}

export default App;
