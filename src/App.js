import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/Header";
import SaveTask from "./components/SaveTask";
import Tasks from "./components/Tasks";

const App = () => {
  const [display, setDisplay] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Go jogging",
      datetime: "October 10 at 1:30pm",
      archived: false,
      complete: true,
    },
    {
      id: 2,
      text: "Buy bread",
      datetime: "October 1 at 5:30pm",
      archived: false,
      complete: false,
    },
    {
      id: 3,
      text: "Wash sink",
      datetime: "October 15 at 2:30pm",
      archived: false,
      complete: false,
    },
  ]);

  const handleAdd = () => {
    setDisplay(!display);
  };

  // Toggle archive/unarchived status
  const handleToggleArchive = (id) => {
    tasks.forEach((task) => {
      if (task.id === id) {
        task.archived = !task.archived;
        return task;
      } else return task;
    });
    setTasks([...tasks]);

    // setTasks(
    //   tasks.map((task) => {
    //     if (task.id === id) {
    //       task.archived = !task.archived;
    //       return task;
    //     } else return task;
    //   })
    // );
  };

  // Toggle checked/unchecked status
  const handleCheckbox = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.complete = !task.complete;
          return task;
        } else return task;
      })
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSave = (task) => {
    setTasks([...tasks, task]);
  };

  const handleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  return (
    <div className="container">
      <Header onAdd={handleAdd} onShowArchived={handleShowArchived} />
      {display ? <SaveTask onSave={handleSave} /> : null}
      <DragDropContext>
        <Tasks
          tasks={tasks}
          showArchived={showArchived}
          archiveFunction={handleToggleArchive}
          onCheck={handleCheckbox}
          onDelete={handleDelete}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
