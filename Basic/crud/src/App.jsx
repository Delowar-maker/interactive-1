import { useState } from "react";
import "./App.css";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (studentName.trim() === "") {
      return alert(`please Provide a valid name`);
    }
    editMode ? updateHandler() : createHandler();
  };

  const changeNameHandler = (e) => {
    setStudentName(e.target.value);
  };

  const createHandler = () => {
    const newStudent = {
      id: Date.now() + "",
      name: studentName,
      isPresent: null,
    };
    setStudents([...students, newStudent]);
    setStudentName("");
  };

  const editHandler = (student) => {
    setEditMode(true);
    setEditableStudent(student);
    setStudentName(student.name);
  };

  const updateHandler = () => {
    const updatedStudentList = students.map((item) => {
      if (item.id === editableStudent.id) {
        return { ...item, name: studentName };
      }
      return item;
    });
    setStudents(updatedStudentList);
    setEditMode(false);
    setEditableStudent(null);
    setStudentName("");
  };

  const removeHandler = (studentId) => {
    const updatedStudentList = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudentList);
  };

  const togglePresenceHandler = (studentId, isPresent) => {
    const updatedStudentList = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, isPresent };
      }
      return student;
    });
    setStudents(updatedStudentList);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={studentName} onChange={changeNameHandler} />
        <button>{editMode ? "Update Student" : "Add Student"}</button>
      </form>
      <div className="student-section">
        <div className="list all-students">
          <h2>All Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                <span>{student.name}</span>
                <button onClick={() => editHandler(student)}>Edit</button>
                <button onClick={() => removeHandler(student.id)}>
                  Delete
                </button>
                <button onClick={() => togglePresenceHandler(student.id, true)}>
                  Make Present
                </button>
                <button
                  onClick={() => togglePresenceHandler(student.id, false)}
                >
                  Make Absent
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="list present-students">
          <h2>Present students</h2>
          <ul>
            {students
              .filter((student) => student.isPresent)
              .map((student) => (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button>Accidentally Added</button>
                </li>
              ))}
          </ul>
        </div>
        <div className="list absent-students">
          <h2>Absent students</h2>
          <ul>
            {students
              .filter((student) => student.isPresent === false)
              .map((student) => (
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button>Accidentally Added</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
