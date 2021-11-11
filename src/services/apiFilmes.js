import axios from 'axios'

const apiFilmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'content-type': 'application/json;charset=utf-8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDY5ZTE0YzY1MmIxNGQ0YWRmMGEzZGY1OGZjY2FkYSIsInN1YiI6IjYxNmRmNzlhZjkyNTMyMDA5MDAwZWRkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mz48iHFaPhJd89c4OVn3GdiaxGyxqMqeSaLdn0XwMGg'
    }
})

export default apiFilmes