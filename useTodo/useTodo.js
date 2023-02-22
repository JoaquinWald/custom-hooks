import { useEffect, useReducer } from "react";
import { todoReducer } from ".todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {

  const [todos, dispatch] = useReducer(todoReducer, [], init); //[] es el estado inicial.

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] add todo',
      payload: todo,
    }
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    });
  };

  const todosCount = () => {
    return todos.length;
  }

  const pendingTodosCount = () => {
    return todos.filter(todo => !todo.done).length;
  }

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount,
    pendingTodosCount,
  }
}
