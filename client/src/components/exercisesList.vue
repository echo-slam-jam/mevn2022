<template>
    <div>
        <h4>Exercises List</h4>
        <table>
            <thead>
                <tr>
                <th>name</th>
                <th>type</th>
                <th>achieved</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="exercise in exercises" :key="exercises._id">
                    <td>{{ exercise.name }}</td>
                    <td>{{ exercise.type }}</td>
                    <td>{{ exercise.achieved }}</td>
                    <td>
                        <button @click="deleteExercise(exercise._id)">Delete</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <h2>NEW EXERCISE FORM</h2>
        <input v-model="newName" placeholder="enter name">
        <select v-model="newType">
            <option disabled value="">Please select one</option>
            <option>pull</option>
            <option>push</option>
        </select>
        <input v-model="achieved" type="checkbox" id="checkbox">
        <label for="checkbox">achieved status: {{ achieved }}</label>
        <p>
            <button @click="createExercise(newName, newType, achieved)">Create Exercise</button>
        </p>

        <h4>Users List</h4>
        <table>
            <thead>
                <tr>
                <th>names</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="users in users" :key="users._id">
                    <td>{{ users.name }}</td> 
                    
                </tr>
                
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "exercisesList"
}
</script>
<script setup>
// import ExercisesService from "../services/exercisesService";
import axios from 'axios';
import { ref } from 'vue';
// import API from '../services/exercisesService'
    //get exercises
    const exercises = ref([])
    const Response = ref('')
    const achieved = ref(false)
    //get users
    const users = ref([])
    //create exercise
    const newName = ref('')
    const newType = ref('')

    const loadExercises = async () => {
        const response = await axios.get('exercises')
        exercises.value = response.data.exercises;
    }

    const createExercise = async (newName, newType, achieved) => {
        const response = await axios.post('exercises', {
            name: newName,
            type: newType,
            achieved: achieved,
        })
        Response.value = response.data.message
        loadExercises();
    }

    const deleteExercise = async (id) => {
        const response = await axios.delete(`exercises/${id}`)
        Response.value = response.data.message
        loadExercises();
    }

    const loadUsers = async (id) => {
        await axios.get('users').then(async (items) => {
            console.log(items)
            users.value = items.data.users
        })
          
        
    }

    loadUsers();
    loadExercises();
</script>

<style>
    
</style>