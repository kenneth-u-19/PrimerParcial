import express from 'express'
import movies from '.local_db/movies.json' with {type: 'json'}
import {Message} from 'firebase-functions/pubsub'

const app = express();

app.use(express.json);

