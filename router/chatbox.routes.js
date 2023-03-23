import express from "express";
import {
  CreateChatbox,
  Getchatbox,
  Getchatboxsubject,
  Getstreamchat,
} from "../controller/chatbox.controller.js";
const router = express.Router();
//CREATE
router.post("/add", CreateChatbox);

//get all chat
router.get("/get", Getchatbox);

//filter
router.post("/subject", Getchatboxsubject);

router.post("/stream", Getstreamchat);

export default router;
