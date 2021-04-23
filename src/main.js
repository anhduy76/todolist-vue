// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import { createApp } from "vue";

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: "https://smiling-ant-46.hasura.app/v1/graphql"
  })
});

createApp(App)
  //   .use(VueApollo)
  .use({ apollo: apolloProvider })
  .mount("#app");
