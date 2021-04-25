import express from 'express';
import {
    createMeeting,
    deleteMeeting,
    getAllMeetings,
    getMeeting,
    getMeetingRegistrants
} from "../controllers/meeting-controller";

const router = express.Router();

router.post('/create', createMeeting);

router.get('/meeting/:id', getMeeting);

router.get('/meeting/all', getAllMeetings);

router.get('/meeting/status/:id', getMeetingRegistrants);

router.delete('/meeting/:id', deleteMeeting);

export default router;
