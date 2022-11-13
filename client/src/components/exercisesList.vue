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
                <tr v-for="exercise in exercises">
                    <td>{{ exercise.name }}</td>
                    <td>{{ exercise.type }}</td>
                    <td>{{ exercise.achieved }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
// import ExercisesService from "../services/exercisesService";
import axios from 'axios';
import { ref } from 'vue';
export default {
    name: "exercisesList",
    setup() {
      const exercises = ref()
       
        const loadExercises = async () => {
        const response = await axios.get('http://localhost:5000/exercises/')
        exercises.value = response.data.exercises;
       }
       loadExercises();
       return {
        exercises
    }
    }
}
</script>
<style>
    
</style>