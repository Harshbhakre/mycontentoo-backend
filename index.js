import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import { contentModel } from "./Models/ContentModel.js";
import cors from "cors";
import dotenv from "dotenv";
import { login, signup,reqToAccess, allowAccess, removeUser } from "./Controller/UserController.js";
import { AuthUser } from "./Utils/Auth.js";
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Failed to connect to DB:", err));

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "https://my-contentoo-frondend.vercel.app"], credentials: true }));
app.use(express.json());
app.get("/favicon.ico", (req,res)=> res.status(204).end());

app.get("/", (req, res) => {
  contentModel
    .find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(`failed to get data ${err}`);
    });
});
app.get("/:id", (req, res) => {
  contentModel
    .findOne({ _id: req.params.id })
    .then((response) => {
      if (response==null) res.status(400).json("content not found")
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(401).json(`failed to get data ${err}`);
    });
});

app.post("/content", (req, res) => {
  let newData = new contentModel({
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    poster: req.body.poster,
    description: req.body.description,
    type: req.body.type,
  });

  newData
    .save()
    .then((response) => res.json(`content Saved`))
    .catch((err) => res.status(400).json("failed to save data" + err));
});

app.delete('/content/:id',(req,res)=>{
    contentModel
    .findOneAndDelete({ _id: req.params.id })
    .then((response) => {
      if (response==null) res.status(400).json("content not found")
        res.status(200).end('Deleted Successfully'+response);
    })
    .catch((err) => {
      res.status(401).end(`failed to get data ${err}`);
    });
})
app.put('/content/:id',(req,res)=>{
    contentModel
    .findByIdAndUpdate({ _id: req.params.id },
      req.body
    )
    .then((response) => {
      if (response==null) res.status(400).json("content not found")
        res.status(200).end('Updated Successfully'+response);
    })
    .catch((err) => {
      res.status(401).end(`failed to update data ${err}`);
    });
})

app.post("/signup",signup)
app.post("/login",login)

app.post('/request',reqToAccess)

app.post("/allowaccess",allowAccess)
app.post("/removeaccess",removeUser)

export default app;
// app.listen(3000,()=>{
//   console.log("listenting to port 3000");
  
// })
