import { useEffect, useRef, useState } from 'react'
import TaskItem from './TaskItem'

const STORAGE_KEY = 'task-board.tasks'

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function TaskBoard() {
  const [tasks, setTasks] = useState(loadTasks)
  const [inputValue, setInputValue] = useState('')
  const nextId = useRef(
    tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (event) => {
    event.preventDefault()
    const text = inputValue.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: nextId.current++, text, completed: false },
    ])
    setInputValue('')
  }

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="task-board">
      <h1 className="task-board__title">タスクボード</h1>

      <form className="task-board__form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="task-board__input"
          placeholder="新しいタスクを入力"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit" className="task-board__add-button">
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="task-board__empty">タスクはまだありません</p>
      ) : (
        <ul className="task-board__list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskBoard
