<template>
  <div id="main">
    <div id="header">
      <h1>Todo List</h1>
      <p>Get things done, one item at a time</p>
    </div>
    <hr />
    <Input @inputTodo="addTodo" />
    <p v-if=" List.length===0 ">Your to do list is empty</p>
    <TodoList
      id="todolist"
      v-for="todo in List"
      :key="todo.index"
      :todo="todo"
      @onEdit="editTodo"
      @onTick="onTick"
      @onDelete="onDelete"
    />
  </div>
</template>
  
<script>
import { ref } from "vue";

import TodoList from "./components/TodoList.vue";
import Input from "./components/Input.vue";

export default {
  name: "App",
  components: { TodoList, Input },
  setup() {
    const List = ref([]);
    return { List };
  },
  methods: {
    addTodo(val) {
      let newTodo = {
        createdTime: Date.now(),
        title: val,
        description: "",
        status: "new"
      };
      this.List = [...this.List, newTodo];
    },
    editTodo(val, todo) {
      let index = this.List.indexOf(todo);
      this.List[index].title = val;
    },
    onTick(val) {
      this.list = this.List.map(function(item) {
        if (item != val) {
          return;
        }
        if (item.status == "new") {
          item.status = "done";
          return;
        }
        if (item.status == "done") {
          item.status = "new";
          return;
        }
      });
    },
    onDelete(val) {
      this.List = this.List.filter(function(item) {
        return item !== val;
      });
    }
  }
};
</script>

<style scoped>
#main {
  font-family: Helvetica, Arial, sans-serif;
  background-color: #ff6666;
  width: 35%;
  max-width: 100%;
  margin: auto;
  margin-top: 100px;
  padding: 60px;
  color: white;
  box-shadow: -20px -20px 0px 0px #ddd;
}
/* hr {
  color: black;
} */
#todolist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 5px;
  margin: 5px 0;
}
h1 {
  margin: 0;
}
</style>
