import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: "success" });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Started Listening on ${ process.env.PORT || 8080 }`);
});
