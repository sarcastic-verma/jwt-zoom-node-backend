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

router.get('/:id', getMeeting);

router.get('/all', getAllMeetings);

router.get('/status/:id', getMeetingRegistrants);

router.delete('/:id', deleteMeeting);

export default router;
