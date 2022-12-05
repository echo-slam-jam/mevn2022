import {exercisesAPI, usersAPI} from "../http-common";

export default {
//EXERCISES
    getExercises() {
        return exercisesAPI().get('/')
    },
    findExercise(id) {
        return exercisesAPI().get(`/${id}`)
    },
    createExercise(data) {
        return exercisesAPI('http://localhost:5000/exercises').post('/', data)
    },
    deleteExercise(id) {
        return exercisesAPI('http://localhost:5000/exercises').delete(`/${id}`)
    },
//USERS
    getUsers() {
        return usersAPI().get('/')
    },
    createUser(data) {
        return usersAPI('http://localhost:5000/exercises').post('/', data)
    },
    deleteUser(id) {
        return usersAPI('http://localhost:5000/exercises').delete(`/${id}`)
    },
}