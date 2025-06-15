import express from 'express'
import movies from './local_db/movies.json' with {type: 'json'}
import {Message} from 'firebase-functions/pubsub'

const app = express(); //para crear la aplicacion de express
const PORT = process.env.PORT || 3000

app.use(express.json()); //se encarga de parsear el body de las peticiones, basicamente de hacer lo que esta comentado abajo

// app.use((req, res, next) => {

//     let body = '';

//     req.on('data', (chunk) => {
//         body += chunk.toString(); // convierte el buffer a string
//     });

//     req.on('end', () => {
//         req.body = JSON.parse(body); // convierte el string a JSON
//         next()
//     })

//     console.log('Middleware ejecutado');
// })


//rutas

app.get('/', (req, res) => {
    res.send('<h1>Hola, mundo!</h1>')
})

app.get('/movies', (req, res) => {
    res.json(movies)
})

app.get('/movies/search', (req, res) => {

    const {genre, year} = req.query

    if(genre){
        //filtrar por el genero
        const moviesFiltered = movies.filter((movie) => {
            return movie.genre.some((valor) => valor.toLowerCase().trim() === genre.toLowerCase().trim())
        })

        res.json(moviesFiltered)
    }

    res.status(404).json({
        message: 'No se ha proporcionado un genero para filtrar por las peliculas'
    })
})





app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})  
