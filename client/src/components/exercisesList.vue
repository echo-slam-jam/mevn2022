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
        <p>
            <button @click="createExercise">Create Exercise</button>
        </p>
        <p>{{Response}}</p>
    </div>
</template>
<script>
// import ExercisesService from "../services/exercisesService";
import axios from 'axios';
import { ref } from 'vue';
import exercisesAPI from '../services/exercisesService'
export default {
    name: "exercisesList",
    setup() {
        const exercises = ref([])
        const Response = ref('')

        const loadExercises = async () => {
            const response = await exercisesAPI.getExercises()
            exercises.value = response.data.exercises;
        }
        loadExercises();

        const createExercise = async () => {
            const response = await exercisesAPI.createExercise({
                name: "sample",
                type: "pull",
                achieved: false,
            })
            Response.value = response.data.message
            loadExercises();
        }

        const deleteExercise = async (id) => {
            const response = await exercisesAPI.deleteExercise(id)
            Response.value = response.data.message
            loadExercises();
        }
    return {
        createExercise,
        deleteExercise,
        exercises,
        Response
    }
    }
}
</script>
<style>
    
</style>