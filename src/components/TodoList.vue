<template>
    <select class="form-select form-control align-self-start m-2" aria-expanded="false" v-model="activeFilter"
        @change="onSelected($event)">
        <option v-for="(filter, index) in filters" :key="index">{{ filter }}</option>
    </select>

    <div v-for="todo in filteredTodo" :key="todo.id" class="card m-2 p-1">
        <div class="row g-0" :class="{ done: todo.done }">
            <div class="col-1 d-flex justify-content-center align-items-center border-end border-dark">
                <input v-if="todo.done" class="form-check-input me-1" type="checkbox" @click.stop="toggleDone(todo.id)"
                    checked>
                <input v-else class="form-check-input me-1" type="checkbox" @click.stop="toggleDone(todo.id)">
            </div>

            <div class="row g-0 col-11 card-body">
                <div class="col-8 card-body">
                    <h4 class="card-title" v-if="!todo.editMode">
                        {{ todo.task }}
                    </h4>
                    <form v-else @submit.prevent="todoUpdate(todo.id, todo.task, todo.description)">
                        <input type="text" class="form-control mb-3" v-model="todo.task">
                    </form>
                    <p class="card-text" v-if="!todo.editMode">
                        {{ todo.description }}
                    </p>
                    <form v-else @submit.prevent="todoUpdate(todo.id, todo.task, todo.description)">
                        <textarea class="form-control form-control-sm" v-model="todo.description"></textarea>
                    </form>

                </div>
                <div class="col d-flex justify-content-end align-items-center me-2">
                    <button class="btn btn-primary rounded-pill bi bi-pencil-fill me-2" @click="editTask(todo.id)"></button>
                    <button class="btn btn-danger rounded-pill bi bi-x-circle-fill" @click="deleteAlert(todo.id)"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useTodoStore } from '@/store/useTodoStore'
import { storeToRefs } from 'pinia'
export default {
    data() {
        const store = useTodoStore()
        store.getLastTodoList()
        const { filteredTodo, filters, activeFilter } = storeToRefs(store)
        const { toggleDone, deleteTask, editTask, todoUpdate, hideUpdate, filterUpdate } = store

        return { filteredTodo, toggleDone, deleteTask, editTask, todoUpdate, hideUpdate, filters, activeFilter, filterUpdate }
    },

    methods: {
        deleteAlert(id) {
            this.$swal({
                title: "Внимание!",
                text: "Вы действительно хотите удалить задачу?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Да",
                cancelButtonText: "Отмена"
            }).then((result) => {
                if (result.value) {
                    this.deleteTask(id)

                    this.$swal({
                        title: "Удалено!",
                        text: "Задача успешно удалена.",
                        icon: "success"
                    }
                    )
                }
            })
        },

        onSelected(event) {
            this.filterUpdate(event.target.value);
        }
    }
}
</script>

<style>
.card {
    background-color: azure !important;
}

.done {
    text-decoration: line-through;
    color: rgb(52, 88, 62);
    background-color: rgb(142, 203, 149);
}

p {
    font-size: 14px;
    color: rgb(47, 47, 47);
}
</style>