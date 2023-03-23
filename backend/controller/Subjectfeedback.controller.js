import subjectsfeedback from '../model/SubjectFeedback.model.js';

//Create subjectsfeedback
export const CreateSubjectfeedback = async (req, res, next) => {
    try {
        const newSubjectfeedback= new subjectsfeedback({ 
            subjectname : req.body.subjectname,
            Comment : req.body.Comment,
         });
        await newSubjectfeedback.save()
        res.status(200).json("Subjectfeedback has been created.....");
    } catch (err) {
        next(err);
    }
};

//Update subjectsfeedback
       
export const Updatesubjectsfeedback = async(req, res, next) => {
    try {
            const updasubjectsfeedback = await subjectsfeedback.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
             res.status(200).json(updasubjectsfeedback);
    } catch (err) {
        next(err);
    }
};

//Delete subjectsfeedback
export const Deletesubjectsfeedback= async (req, res, next) => {
    try {
        await studentsubjectsfeedback.findByIdAndDelete(req.params.id);

        res.status(200).json("subjectsfeedback has been deleted");
    } catch (err) {
        next(err);
    }
};

//Get subjectsfeedback
export const Getsubjectsfeedback= async (req, res, next) => {
    try {
        const getsubjectsfeedback = await subjectsfeedback.findById(req.params.id);

        res.status(200).json(getsubjectsfeedback);
    } catch (err) {
        next(err);
    }
};

//Get all subjectsfeedback
export const GetAllsubjectsfeedback = async (req, res, next) => {
    try {
        const getallsubjectsfeedback= await subjectsfeedback.find();

        res.status(200).json(getallsubjectsfeedback);
    } catch (err) {
        next(err);
    }
};

