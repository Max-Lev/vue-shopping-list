/* eslint-disable */
<template>
<div id="app">
    <v-app>
        <v-content>            
            <LayoutContainer></LayoutContainer>
        </v-content>
    </v-app>
</div>
</template>

<script>
import LayoutContainer from './layout/layout.container';
export default {
  name: 'app',
  props: {},
  components: {
    LayoutContainer
  },
  data() {
    return {};
  },
  methods: {
    saveHandler(data) {
      console.log('saveHandler: ', data);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
