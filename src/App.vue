<template>
  <div class="container p-2 px-4 rounded-5">
    <div class="menu my-2 d-flex flex-column justify-content-center align-items-center">
      <h1 class="text-light">Твой ToDo List,</h1>
      <div class="username d-flex text-light">
        <h1 v-if="!isNameEdit"> {{ name }} </h1>
        <form v-else @submit.prevent="changeName(name)">
          <input class="form-control mb-3" placeholder="Ваше имя" v-model="name">
        </form>
        <i class="ms-1 bi bi-pencil" @click="editName(name)"></i>
      </div>
      <TodoInput />
    </div>

    <div>
      <UserList />
    </div>

  </div>
</template>

<script>
import { ref } from "vue"
import TodoInput from "./components/TodoInput.vue"
import UserList from "./components/TodoList.vue"
export default {
  data() {
    const name = ref("");
    const savedName = localStorage.getItem("name")

    if (savedName) {
      name.value = savedName
    }

    const isNameEdit = false
    return { name, isNameEdit }
  },

  methods: {
    editName() {
      this.isNameEdit = !this.isNameEdit
    },

    changeName(username) {
      this.isNameEdit = !this.isNameEdit
      localStorage.setItem("name", username)
    }

  },

  components: {
    TodoInput,
    UserList
  }
}
</script>

<style>
#app {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 20px;
  padding-top: 30px;
}

.bg {
  background-image: url('./assets/bg.gif');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: #717070;
}

.container {
  background: #ddb5caa0;
  border: 2px solid rgba(0, 0, 0, 0.439);
}

.menu {
  min-height: 150px;
}

select {
  max-width: 170px;
}
</style>
