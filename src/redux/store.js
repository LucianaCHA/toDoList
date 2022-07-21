//este configureStore es el que se encarga de crear el store y combinar reducers
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

export default configureStore({
    reducer: {
        //aqui se ponen los reducers
        //el reducer es un objeto con las propiedades que se quieren que sean reducers
        //esto se conecta como siempre a la app en index
        todos: todoReducer,
        deleteTodo: todoReducer,
        toggleTodo: todoReducer
    }
})