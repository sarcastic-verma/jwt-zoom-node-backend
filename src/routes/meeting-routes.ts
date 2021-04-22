import express from 'express';
import { createMeeting } from "../controllers/meeting-controller";

const router = express.Router();

router.get('/create', createMeeting);

export default router;
