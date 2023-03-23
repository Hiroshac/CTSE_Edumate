import StreamModel from '../model/Streams.model.js';

// create stream

export const createStreams = async (req, res, next) =>{
    const stream = new StreamModel(req.body);
    try {
        const savedStream = await stream.save();
        res.status(200).json(savedStream)
    }
    catch(err) {
        next(err);
    }
}

//update stream

export const updateStream = async (req, res, next) => {
    try {
      const updatedStream = await StreamModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updatedStream)
    } catch (err) {
      next(err)
    }
  }

  //get stream by id
  export const getStreamById = async (req, res, next) => {
    try {
      const stream = await StreamModel.findById(req.params.id)
      res.status(200).json(stream)
    } catch (err) {
      next(err)
    }
  } 

  //delete stream

  export const deleteStream = async (req, res, next) => {
    try {
      await StreamModel.findByIdAndDelete(req.params.id)
      res.status(200).json('Stream has been deleted.')
    } catch (err) {
      next(err)
    }
  }

//get Streams

export const getStreams = async (req, res, next) => {
    try {
      const streams = await StreamModel.find()
      res.status(200).json(streams)
    } catch (err) {
      next(err)
    }
  }