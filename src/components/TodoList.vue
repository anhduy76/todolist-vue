<template>
  <div id="list-item">
    <!-- <p>{{todo.title}}</p> -->
    <input
      type="text"
      :id="`${todo.status === 'done' ? 'done':'name'}`"
      :class="[isEdit ?'editOn':'']"
      name="name"
      :disabled="!isEdit"
      :value="todo.title"
      v-on:keyup.enter="submitEdit"
      v-on:change="editInput"
    />
    <div class="list-button">
      <button v-on:click="edit">
        <i class="fas fa-pen"></i>
      </button>
      <button v-on:click="tick">
        <i :class="`${todo.status === 'new' ? 'far fa-square' : 'fas fa-check'}`"></i>
      </button>
      <button v-on:click="remove">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TodoList",
  props: ["todo"],
  setup() {
    const isEdit = ref(false);
    const editTodo = ref("");
    return { isEdit, editTodo };
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    editInput(e) {
      this.editTodo = e.target.value;
    },
    submitEdit() {
      this.$emit("onEdit", this.editTodo, this.todo);
      this.editTodo = "";
      this.isEdit = false;
    },
    tick() {
      this.$emit("onTick", this.todo);
    },
    remove() {
      this.$emit("onDelete", this.todo);
    }
  }
};
</script>

<style scoped>
p {
  text-transform: capitalize;
}
button {
  margin-left: 5px;
  text-align: center;
  border: none;
  background-color: transparent;
  text-align: center;
  outline: none;
  max-width: 30px;
}
i {
  font-size: 24px;
  color: white;
}
#name {
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 18px;
  width: 80%;
}
.editOn {
  background-color: white !important;
  color: black !important;
}
input {
  line-height: 24px;
}
#done {
  text-decoration: line-through;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 18px;
  width: 80%;
}
</style>