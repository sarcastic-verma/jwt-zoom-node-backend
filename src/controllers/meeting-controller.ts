import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { getToken } from "../utils/getToken";
import RequestError from "../utils/request-error";

export const createMeeting = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken();
    const { topic } = req.body;
    await axios.post(`https://api.zoom.us/v2/users/${ process.env.API_EMAIL }/meetings`, {
        body: {
            topic,
            type: 1, // 1 for instant meeting
            settings: {
                host_video: "true",
                participant_video: "true"
            }
        },
    }, {
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${ token }`
        }
    }).then(result => res.json({
            status: "success",
            message: "Meeting created successfully.",
            response: result && result?.data
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};

export const deleteMeeting = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken();
    const { id } = req.params;
    await axios.delete(`https://api.zoom.us/v2/meetings/${ id }`, {
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    }).then(() => res.json({
            status: "success",
            message: "Meeting deleted successfully.",
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};

// gets all meetings of an user
export const getAllMeetings = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken();
    await axios.delete(`https://api.zoom.us/v2/users/${ process.env.API_EMAIL }/meetings`, {
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    }).then(result => res.json({
            status: "success",
            message: "Fetched All Meetings",
            response: result && result?.data
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};

export const getMeeting = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken();
    const { id } = req.params;
    await axios.get(`https://api.zoom.us/v2/meetings/${ id }`, {
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    }).then((result) => res.json({
            status: "success",
            message: "Meeting fetched successfully.",
            response: result && result?.data
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};

export const getMeetingRegistrants = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken();
    const { id } = req.params;
    await axios.get(`https://api.zoom.us/v2/meetings/${ id }/registrants?page_size=300`, {
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    }).then((result) => res.json({
            status: "success",
            message: "Meeting registrants fetched successfully.",
            response: result && result?.data
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};
