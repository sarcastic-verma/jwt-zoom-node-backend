import express, { Express, NextFunction, Request, Response } from 'express';
import RequestError from "./utils/request-error";
import meetingRoutes from './routes/meeting-routes';
import { ErrorWithCode } from "./utils/error-with-code";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req: Request, res: Response) => {
    res.json({ status: "success", message: "Ping Successful" });
});

app.use('/api/meeting', meetingRoutes);

app.use(() => {
    throw new RequestError('Cannot find this Route!', 404);
});

//Error Handling for any other error
app.use((error: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
    if ( res.headersSent ) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        "status": "failed",
        "message": error.message || 'An unknown error occurred!'
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Started Listening on ${ process.env.PORT || 8080 }`);
});
