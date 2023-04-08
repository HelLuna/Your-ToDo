<template>
    <button class="col-2 col-sm-2 mx-auto mt-3 btn text-light gradient-button" @click="modal.show()">&#10010;
        Новая задача</button>

    <div class="modal fade" ref="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Добавить задачу</h1>
                    <button type="button" class="btn-close" @click="modal.hide()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="task-name" class="form-label">Задача</label>
                    <input v-model="task" type="text" class="form-control mb-3" id="task-name" maxlength="40"
                        placeholder="Наименование задачи">

                    <label for="task-describe" class="form-label">Описание</label>
                    <input v-model="description" type="text" class="form-control mb-3" id="task-describe"
                        placeholder="Описание задачи">

                    <button type="submit" class="add-new btn btn-success"
                        @click="showAlert(task, description), modal.hide()">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useTodoStore } from '@/store/useTodoStore'
import { Modal } from 'bootstrap'
export default {
    data() {
        const task = ref('')
        const description = ref('')
        const store = useTodoStore()

        function addInputTask(item, desc) {
            store.addTask(item, desc)
            clearInput()
        }

        function clearInput() {
            task.value = ''
            description.value = ''
        }

        return { modal: null, task, description, store, addInputTask, clearInput }
    },

    mounted() {
        this.modal = new Modal(this.$refs.exampleModal)
    },

    methods: {
        showAlert(item, desc) {
            if (item.length !== 0) {
                this.addInputTask(item, desc)
            } else {
                this.$swal({
                    title: 'Ошибка',
                    icon: 'error',
                    text: 'Не введено название задачи!'
                })

                this.clearInput()
            }
        }
    }
}

</script>

<style>
.gradient-button {
    min-width: 200px;
    background: linear-gradient(to bottom left, #1D976C, #93F9B9);
}

.gradient-button:hover {
    background: linear-gradient(to bottom left, #348F50, #56B4D3);
}

.gradient-button:active {
    background: linear-gradient(to bottom left, #536976, #BBD2C5);
}
</style>