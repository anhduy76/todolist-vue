<template>
  <div>
    <h2>Add to the todo list</h2>
    <form id="inputForm" v-on:submit.prevent="noop">
      <input v-on:keyup.enter="submitInput" v-on:change="editInput" :value="input" />
      <button type="button" v-on:click="submitInput">ADD ITEM</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Input",
  setup() {
    const input = ref("");
    return { input };
  },
  methods: {
    submitInput() {
      if (!this.input) {
        alert("Vui lòng nhập công việc");
        return;
      }
      this.$emit("inputTodo", this.input);
      this.input = "";
    },
    editInput(e) {
      this.input = e.target.value;
    }
  }
};
</script>

<style scoped>
#inputForm {
  display: flex;
}
input {
  line-height: 36px;
  outline: none;
  padding: 0px;
  padding-left: 5px;
  border: none;
  border-radius: 3px;
  width: 100%;
}
button {
  height: 36px;
  width: 20%;
  margin-left: 5px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
}
</style>