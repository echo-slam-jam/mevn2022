import API from "../http-common";

export default {
    getExercises() {
        return API().get('/')
    },
    createExercise(data) {
        return API('http://localhost:5000/exercises').post('/', data)
    },
    deleteExercise(id) {
        return API('http://localhost:5000/exercises').delete(`/${id}`)
    }
}