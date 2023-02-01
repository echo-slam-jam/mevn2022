<template>
    <form @submit.prevent="submit">
        <h1>Please Sign-in</h1>

        <div>
            <input type="text" name="name" placeholder="examplename">
            <label>Name</label>
        </div>
        <div>
            <input type="password" name="password" placeholder="password">
            <label>password</label>
        </div>

        <button type="submit">Submit</button>
    </form>
</template>
<script>
import axios from 'axios';
import {useRouter} from "vue-router"

export default {
    name: "Login",
    setup() {
        const router = useRouter();

        const submit = async e => {
            const form = new FormData(e.target);
            const inputs = Object.fromEntries(form.entries());
            const {data} = await axios.post('users/signin', inputs, {withCredentials: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            await router.push('/');
        }
        return {
            submit
        }
    }
}
</script>
<style>
</style>