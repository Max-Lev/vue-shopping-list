<template>
    <section>
        {{userName}}
    </section>
</template>
<script>
import Vue from 'vue';

var UserComponent = Vue.component('UserComponent', {
  data() {
    return {
      userName: 'Max'
    };
  }
});
export default UserComponent;
</script>
