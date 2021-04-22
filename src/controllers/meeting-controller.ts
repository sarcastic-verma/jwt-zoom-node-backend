import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { getToken } from "../utils/getToken";
import RequestError from "../utils/request-error";

export const createMeeting = async (req: Request, res: Response, next: NextFunction) => {
    const email = "shivamthegreat.sv@gmail.com";
    const token = getToken();
    await axios.post(`https://api.zoom.us/v2/users/${ email }/meetings`, {
        body: {
            topic: "test create meeting",
            type: 1,
            settings: {
                host_video: "true",
                participant_video: "true"
            }
        },
    }, {
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(result => res.json({
            status: "success",
            message: "Meeting created successfully.",
            response: result && result?.data
        })
    ).catch((e) =>
        next(new RequestError(e.response.data.message, 400)));
};
