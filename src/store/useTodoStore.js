import { defineStore } from "pinia"

export const useTodoStore = defineStore('todoList', {
    state: () => ({
        todoList: [],
        id: 0,
        activeFilter: "Все задачи",
        filters: ['Все задачи', 'В процессе', 'Завершённые']
    }),

    getters: {
        filteredTodo() {
            return this.activeFilter === this.filters[2]
                ? this.todoList.filter((obj) => obj.done)
                : this.activeFilter === this.filters[1]
                    ? this.todoList.filter((obj) => !obj.done)
                    : this.todoList
        }
    },

    actions: {
        getLastTodoList() {
            const lastTodoList = JSON.parse(localStorage.getItem("todoList"))
            if (lastTodoList) {
                this.todoList = lastTodoList.todoList
                this.id = lastTodoList.id
                this.activeFilter = lastTodoList.activeFilter
            }
        },

        addTask(task, description) {
            this.todoList.push({ id: this.id++, task, description, done: false, editMode: false })
            localStorage.setItem("todoList", JSON.stringify(this))
        },

        deleteTask(taskID) {
            this.todoList = this.todoList.filter((obj) => {
                return obj.id !== taskID
            })

            localStorage.setItem("todoList", JSON.stringify(this))
            if (this.todoList.length === 0) {
                localStorage.removeItem("todoList")
            }
        },

        editTask(taskID) {
            const curTodo = this.todoList.find((obj) => obj.id === taskID)
            if (curTodo) {
                curTodo.editMode = !curTodo.editMode
            }

            localStorage.setItem("todoList", JSON.stringify(this))
        },

        todoUpdate(taskID, task, description) {
            const curTodo = this.todoList.find((obj) => obj.id === taskID)
            curTodo.task = task
            curTodo.description = description
            curTodo.editMode = !curTodo.editMode
            localStorage.setItem("todoList", JSON.stringify(this))
        },

        toggleDone(taskID) {
            const curTodo = this.todoList.find((obj) => obj.id === taskID)
            if (curTodo) {
                curTodo.done = !curTodo.done
            }

            localStorage.setItem("todoList", JSON.stringify(this))
        },

        filterUpdate(type) {
            this.activeFilter = type;
            localStorage.setItem("todoList", JSON.stringify(this))
        }
    }
})