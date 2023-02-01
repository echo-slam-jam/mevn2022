<template>
    <div>
      <h3>{{ message }}</h3>
  
      <a href="javascript:void(0)" class="btn btn-lg btn-primary"
         @click="logout"
      >Logout</a>

      <ExercisesList/>
    </div>
  </template>
  
  <script>
  import exercisesList from "../components/exercisesList.vue";
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import {useRouter} from "vue-router";
import ExercisesList from "../components/exercisesList.vue";
  //import API from '../services/exercisesService'
  export default {
    name: "Home",
    setup() {
        const message = ref("");
        const router = useRouter();
        onMounted(async () => {
            try {
                const { data } = await axios.get("users/profile");
                console.log(data.val.name);
                message.value = `Hi ${data.val.name}`;
            }
            catch (e) {
                await router.push("/login");
            }
        });
        const logout = async () => {
            await axios.post("users/signout", {}, { withCredentials: true });
            axios.defaults.headers.common["Authorization"] = "";
            await router.push("/login");
        };
        return {
            message,
            logout
        };
    },
    components: { ExercisesList }
}
  </script>