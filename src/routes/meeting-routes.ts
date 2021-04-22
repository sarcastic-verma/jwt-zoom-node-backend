import express from 'express';
import { createMeeting } from "../controllers/meeting-controller";

const router = express.Router();

router.post('/create', createMeeting);

export default router;
