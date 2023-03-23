import chatbox from '../model/chatbox.model.js'


//Create chatbox
export const CreateChatbox = async (req, res, next) => {
    try {
        const newChatbox= new chatbox({ 
            subject : req.body.subject,
            author : req.body.author,
            stream : req.body.stream,
            email : req.body.email,
            message : req.body.message,
            time : req.body.time,
         });
        await newChatbox.save()
        res.status(200).json("Chatbox has been created.....");
    } catch (err) {
        next(err);
    }
};

//Get all subjectsfeedback
export const Getchatbox = async (req, res, next) => {
    try {
        const getchatbox = await chatbox.find();

        res.status(200).json(getchatbox);
    } catch (err) {
        next(err);
    }
};

//Get all subjectsfeedback
export const Getchatboxsubject = async (req, res, next) => {
    try {
        const getchatboxsubject = await chatbox.find(
            {subject : req.body.subject}
        );
        res.status(200).json(getchatboxsubject);
    } catch (err) {
        next(err);
    }
};

//Get all subjectsfeedback
export const Getstreamchat = async (req, res, next) => {
    try {
        const getchatboxsubject = await chatbox.find(
            {stream : req.body.stream}
        );
        res.status(200).json(getchatboxsubject);
    } catch (err) {
        next(err);
    }
};

