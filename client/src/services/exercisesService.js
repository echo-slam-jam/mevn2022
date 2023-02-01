import { config } from "dotenv";
import {exercisesAPI, usersAPI} from "../http-common";
import axios from "axios";
  
export default {
//EXERCISES
    getExercises() {
        return exercisesAPI().get('/')
    },
    findExercise(id) {
        return exercisesAPI().get(`/${id}`)
    },
    createExercise(data) {
        return exercisesAPI().post('/', data)
    },
    deleteExercise(id) {
        return exercisesAPI().delete(`/${id}`)
    },
//USERS
    getProfile() {
        return usersAPI().get('/profile')
    },
    createUser(data) {
        return usersAPI().post('/', data)
    },
    deleteUser(id) {
        return usersAPI().delete(`/${id}`)
    },
    signin(data) {
        return usersAPI().post('/signin', data, {withCredentials: true})
    },
    signout(data) {
        return usersAPI().post('/signout', data, {withCredentials: true})
    },
    refreshToken(data) {
        return usersAPI().post('/refresh', data, {withCredentials: true})
    },
}
