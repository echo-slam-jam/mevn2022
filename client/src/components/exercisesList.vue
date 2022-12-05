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
        
        <p>{{Response}}</p>
        <p v-for="exercises in userExercises">
            <p v-for="exercises in exercises.data">
                {{exercises[0].name}}
            </p>
        </p>
       <p>{{entity}}</p>

        <h4>Users List</h4>
        <table>
            <thead>
                <tr>
                <th>name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="users in users" :key="users._id">
                    <td>{{ users.name }}</td> 
                    
                </tr>
                
            </tbody>
        </table>
        <table>
            <thead>
                <th>exercises</th>
                <th>sets</th>
                <th>reps</th>
                <th>weight</th>
            </thead>
            <tbody>
                
                <tr v-for="users in users" :key="users._id">
                        <tr v-for="exercises in users.routine">
                            <td>{{exercises.sets }}</td>
                            <td>{{ exercises.reps }}</td>
                            <td>{{ exercises.weight }}</td>
                        </tr>
                    </tr>   
                </tr>
                <tr>
                    <td>
                        <button @click="deleteExercise(exercise._id)">Delete</button>
                    </td>
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
import { ref } from 'vue';
import API from '../services/exercisesService'

    const exercises = ref([])
    const Response = ref('')
    const achieved = ref(false)
    const users = ref([])
    const newName = ref('')
    const newType = ref('')
//const filter = ref('')
    const entity = ref('')
    const userExercises = ref([])

    const loadExercises = async () => {
        const response = await API.getExercises()
        exercises.value = response.data.exercises;
    }

    const findExercise = async () => {
        const response = await API.findExercise()
        entity.value = response.data.exercises;
    }

    const createExercise = async (newName, newType, achieved) => {
        const response = await API.createExercise({
            name: newName,
            type: newType,
            achieved: achieved,
        })
        Response.value = response.data.message
        loadExercises();
    }

    const deleteExercise = async (id) => {
        const response = await API.deleteExercise(id)
        Response.value = response.data.message
        loadExercises();
    }

    const loadUsers = async (id) => {
        const response2 = [];
        await API.getUsers().then(async (items) => {
            console.log(items)
            users.value = items.data.users
            console.log(users.value)
            console.log(response2)
            userExercises.value = response2
            console.log(userExercises.value)
        })
          
        
    }

    loadUsers();
    loadExercises();
   // findExercise();
</script>

<style>
    
</style>