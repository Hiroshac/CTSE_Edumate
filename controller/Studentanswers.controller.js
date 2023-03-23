import studentanswers from '../model/Studentanswers.model.js';
import multer from 'multer';

//multer and file location
export const Upload = multer({storage : multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'StudentAnswers')
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname)
    },
})});

//Create Industry
export const CreateStudentAnswers = async (req, res, next) => {
    try {
        const newStudentAnswers = new studentanswers({ 
            stream : req.body.stream,
            subject : req.body.subject,
            lname : req.body.lname,
            grade : req.body.grade,
            date : req.body.date,
            time : req.body.time,
            image: req.file.originalname,
            student_id: req.body.student_id,
            status:"None"
         });
        await newStudentAnswers.save()
        res.status(200).json("Student Answers has been created.....");
    } catch (err) {
        next(err);
    }
};

//Update Industry
       
export const UpdateStudentAnswers = async(req, res, next) => {
    try {
            const updaStudentAnswers = await studentanswers.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
             res.status(200).json(updaStudentAnswers);
    } catch (err) {
        next(err);
    }
};

//Delete Industry
export const DeleteStudentAnswers = async (req, res, next) => {
    try {
        await studentanswers.findByIdAndDelete(req.params.id);

        res.status(200).json("Industry has been deleted");
    } catch (err) {
        next(err);
    }
};

//Get Industry
export const GetStudentAnswers= async (req, res, next) => {
    try {
        const getStudentAnswers = await studentanswers.findById(req.params.id);

        res.status(200).json(getStudentAnswers);
    } catch (err) {
        next(err);
    }
};

//Get all Industry
export const GetAllStudentAnswers = async (req, res, next) => {
    try {
        const getallStudentAnswers= await studentanswers.find();

        res.status(200).json(getallStudentAnswers);
    } catch (err) {
        next(err);
    }
};

//get subject by stream
export const getAnswersbyID = async (req,res,next) => {
    try{
      const filter = await studentanswers.find(
        {student_id : req.body.student_id}
      )
      res.status(200).json(filter)
    }catch(err){next(err)}
  }

  export const getSubject = async (req, res, next) => {
    const marks = await studentanswers.find().select({ subject: 1, _id: 0 })
    res.status(200).json(marks)
  }

  export const getStudentAnswersByStream = async (req, res, next) => {
    let myquery = { stream: req.params.stream }
    studentanswers.find(myquery, function (err, result) {
      if (err) throw err
      res.json(result)
    })
   }
   


