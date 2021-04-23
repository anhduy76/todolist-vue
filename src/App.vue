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
// import { ref } from "vue";
import gql from "graphql-tag";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import TodoList from "./components/TodoList.vue";
import Input from "./components/Input.vue";
const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://smiling-ant-46.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "20kN0tz0BRZqI8aVWt9woePUdqLhoxRB0shmAVpc7XJ26CH41jbB64o6cM9zFmaV"
    }
  })
});

export default {
  name: "App",
  components: { TodoList, Input },
  // setup() {
  //   const List = ref([]);
  //   return { List };
  // },
  data: () => {
    var List = [];
    return { List };
  },
  beforeMount() {
    apolloProvider.clients.defaultClient
      .query({
        query: gql`
          query MyQuery {
            TodoList_TodoList {
              createdAt
              id
              title
              description
              status
            }
          }
        `
      })
      .then(res => {
        console.log(res);
        res.data.TodoList_TodoList.map(item => {
          this.List.push(item);
        });
        console.log(this.List);
        console.log(this.List.length);
      });
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
      this.updateData(val);
    },
    editTodo(val, todo) {
      let index = this.List.indexOf(todo);
      this.List[index].title = val;
      this.editData(todo);
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
    },
    updateData(val) {
      apolloProvider.clients.defaultClient.mutate({
        mutation: gql`
          mutation insert_TodoList_TodoList(
            $objects: [TodoList_TodoList_insert_input!]!
          ) {
            insert_TodoList_TodoList(objects: $objects) {
              returning {
                description
                id
                status
                title
              }
            }
          }
        `,
        variables: {
          objects: [
            {
              title: val,
              description: "desc",
              status: "new"
            }
          ]
        }
      });
    },
    editData(val) {
      console.log("val", val);
      apolloProvider.clients.defaultClient.mutate({
        mutation: gql``,
        variables: {
          objects: [
            {
              title: val.title,
              description: "desc",
              status: "new"
            }
          ]
        }
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
