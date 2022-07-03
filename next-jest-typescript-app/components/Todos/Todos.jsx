import { useRef, useState } from 'react';

const Todos = () => {
    const todoInputRef = useRef();
    const [todos, setTodos] = useState([]);

    function addTodo() {
        const updatedTodos = [...todos, todoInputRef.current.value];
        todoInputRef.current.value = '';
        setTodos(updatedTodos);
    }

    return (
        <div>
            <div>
                <input ref={todoInputRef} id='todo-input' />
                <button id='todo-button' onClick={addTodo}>Add</button>
            </div>
            <div>
                {todos.map((el) => <div key={el} className='todo-item'>{el}</div>)}
            </div>
        </div>
    )
};

export default Todos;