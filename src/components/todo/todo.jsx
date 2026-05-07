import { useState } from "react"
import "./todo.css"

const tododata = [

]

export const Todos = () => {

    const [todos, setTodos] = useState([])
    const [tododInput, setTodoInput] = useState("")
    const [filteredTodos, setFilteredTodos] = useState([])

    function handleChange(e) {
        setTodoInput(e.target.value)
    }

    function todoHandler() {
        if (!tododInput.trim()) {
            return;
        }
        const newTodo = {
            id: new Date().getTime(),
            name: tododInput
        }
        setTodoInput("")
        setTodos((prev) => [newTodo, ...prev])
    }

    function handleCompleteTodo(id) {
        const newTodo = structuredClone(todos)
        const targetTodo = newTodo.find((t) => t.id === id)
        targetTodo.isCompleted = !targetTodo.isCompleted
        setTodos(newTodo);
    }

    function handleDelete(id) {
        const newTodo = structuredClone(todos)
        const filteredtodo = newTodo.filter((item) => item.id !== id)
        setTodos(filteredtodo)
    }

    function filterTodos(type) {
        const newTodo = structuredClone(todos)
        console.log(type, newTodo)
        switch (type) {
            case "all":
                setFilteredTodos(newTodo)
                break;
            case "completed":
                setFilteredTodos(newTodo?.filter((item) => item.isCompleted === true))
                break;
            case "active":
                setFilteredTodos(newTodo?.filter((item) => item?.isCompleted === true))
                break;
            default:
                setFilteredTodos(newTodo)
        }
    }


    return (
        <div className="todo-container">
            <div className="input-box">
                <input type="text" onChange={handleChange} value={tododInput} />
                <button onClick={todoHandler}>Add</button>
            </div>
            <div className="todolist-conatiner">
                <div className="filter-button">
                    <button onClick={() => filterTodos("all")}>All</button>
                    <button onClick={() => filterTodos("completed")} >Completed</button>
                    <button onClick={() => filterTodos("active")}>Active</button>
                </div>
                {todos.map((item) => {
                    return (
                        <div className="todo" key={item.id}>
                            <div className="todo-item">
                                <input type="checkbox" checked={item?.isCompleted} onChange={() => handleCompleteTodo(item.id)} />
                                <p style={{ textDecoration: item?.isCompleted ? "line-through" : "none" }}>{item.name}</p>
                            </div>
                            <button onClick={() => handleDelete(item.id)}>❌</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}