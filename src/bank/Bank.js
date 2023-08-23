import React, { useState, useReducer } from "react";

const ACTION_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
};

const reducer = (state, action) => {
  // state는 reducer가 불리는 시점에 아래 money로 들어감
  console.log("clicked", state, action);
  // return state + action.payload; // state는 0, payload는 너가 누른숫자

  switch (action.type) {
    case ACTION_TYPES.DEPOSIT:
      return state + action.payload;
    case ACTION_TYPES.WITHDRAW:
      return state - action.payload;
    default:
      return state;
  }
};
const Bank = () => {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0); // 0은 money에 들어갈 초기값
  // money : useReducer 통해 새로 만들어준 state, reducer를 통해서만 수정 가능
  // dispatch : useReducer가 만들어준 dispatch 함수, dispatch를 부르면 reducer호출됨
  return (
    <div>
      <h2>useReducer 은행에 오신것을 환영합니다</h2>
      <p>잔고 : {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        step="1000"
      />
      <button
        onClick={() => {
          dispatch({ type: "DEPOSIT", payload: number });
        }}
      >
        예금
      </button>
      <button
        onClick={() => {
          dispatch({ type: "WITHDRAW", payload: number });
        }}
      >
        출금
      </button>
    </div>
  );
};

export default Bank;
