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

    if(genre && year){
        const moviesFiltered = movies.filter((movie) => {
            //filtrar por genero y anio
            const genreValidated = movie.genre.some((valor) => valor.toLowerCase().trim() === genre.toLowerCase().trim() )

            return genreValidated && movie.year === parseInt(year)
        })

        res.json(moviesFiltered)

    } else if(genre){
        //filtrar por el genero
        const moviesFiltered = movies.filter((movie) => {
            return movie.genre.some((valor) => valor.toLowerCase().trim() === genre.toLowerCase().trim())
        })

        res.json(moviesFiltered)
    } else if(year){
        //filtrar por anio
        const moviesFiltered = movies.filter((movie) => {
            return movie.year === parseInt(year)
        })

        res.json(moviesFiltered)
    }

    res.status(404).json({
        message: 'No se ha proporcionado un genero para filtrar por las peliculas'
    })
})


app.get('/movies/:id', (req, res) => {
    const {id} = req.params

    const parsedID = Number(id)

    if(isNaN(parsedID)){
        res.status(400).json({
            message: 'El id debe ser un numero'
        })
    }

    const movie = movies.find(({id}) => {
        return id === parsedID
    })

    if(!movie){
        res.status(404).json({
            message: 'La pelicula no existe'
        })
    }

    res.json(movie)
})

app.post('/movies', (req, res)=>{
    const id = Date.now()//genera un id unico basado en la fecha actual

    req.body.id = id
    movies.push(req.body)

    res
    .status(201) //establece el codigo de estado http como 201 (creado)
    .json(req.body)
})

//actualizar
app.put('/movies/:id', (req, res)=>{})

//eliminar
app.delete('/movies/:id', (req, res)=>{})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})  
