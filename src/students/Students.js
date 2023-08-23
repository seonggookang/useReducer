import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add-student":
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };

    case "delete-student":
      return {
        count: state.count - 1,
        // 삭제 기능
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case "check":
      return {
        count: state.count,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return { ...student, isHere: !student.isHere }; // ...student>> 나머지는 이전 속성과 동일
          }
          return student; // 이걸 해줘야함
        }),
      };
    default:
      return state;
  }
};

const initialState = {
  count: 0, // 초기값 0으로 설정
  students: [],
};

const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? "line-through" : "none",
          color: isHere ? "gray" : "black",
        }}
        onClick={() => {
          dispatch({ type: "check", payload: { id } });
        }}
      >
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: "delete-student", payload: { id } });
        }}
      >
        삭제
      </button>
    </div>
  );
};

const Students = () => {
  const [name, setName] = useState("");
  const [studentsInfo, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생 수 : {studentsInfo.count}</p>
      <form // 엔터로도 동작되게하기
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch({
              type: "add-student",
              payload: { name },
            });
            setName("");
          }}
        >
          추가
        </button>
      </form>
      {studentsInfo.students.map((student) => {
        return (
          <Student
            key={student.id}
            name={student.name}
            dispatch={dispatch}
            id={student.id}
            isHere={student.isHere}
          />
        );
      })}
    </div>
  );
};

export default Students;
