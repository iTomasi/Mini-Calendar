import express from "express";
import cors from "cors";
import routerRemember from "./routes/remember";

const app = express();
const port = 4000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", routerRemember);

app.listen(port, () => console.log(`SV ON PORT ${port}`))
