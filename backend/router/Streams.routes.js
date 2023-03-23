import express from 'express';
import { createStreams, updateStream, deleteStream, getStreams, getStreamById } from '../controller/Stream.controler.js';

const streamrouter = express.Router();

//create
streamrouter.post ('/add', createStreams);

//UPDATE
streamrouter.put('/:id', updateStream)

//DELETE
streamrouter.delete('/:id', deleteStream)

//GET ALL
streamrouter.get('/', getStreams)

//GET BY ID
streamrouter.get('/get/:id', getStreamById)

export default streamrouter;


