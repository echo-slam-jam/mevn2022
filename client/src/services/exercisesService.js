//import http from "../http-common";
import axios from 'axios';

const url = 'http://localhost:5000/exercises/';
class ExercisesService {
    static getExercises() {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(exercise => ({
                            ...exercise,
                            createdAt: new Date(exercise.createdAt)
                        }))
                    );
                })
                .catch((err) => {
                    reject(err);
                })

        });
    }
}

export default new ExercisesService();