import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Learn Redux", completed: false },
  ],
  //aqui se ponen los reducers
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo); //mi estado es un array así que lo actualizo pusheando la nueva tarea, no altero el estado original porque uso push
    },
    deleteTodo: (state, action) => {
        const todoIndex = state.findIndex((todo) => todo.id === action.payload.id);
        state.splice(todoIndex, 1);
    },
    toggleTodo: (state, action) => {
         state.map((todo) => {
              if (todo.id === action.payload.id) {
                   todo.completed = !todo.completed;
              }
              return 0;
         })

    //   const index = state.findIndex((todo) => todo.id === action.payload.id);
    //   state[index].completed = !state[index].completed;
    // ,
  },
}
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer; //esto conecta al store
