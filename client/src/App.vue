<template>
 <div>
 <li><router-link to="/">home</router-link></li> 
  <li><router-link to="/login">login</router-link></li>
 </div>
 <router-view />
</template>
<script>
import {RouterView, RouterLink} from 'vue-router';
export default{

  setup() {

}
}
</script>