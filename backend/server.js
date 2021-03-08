import express from "express";
import bodyParser from "body-parser";
import moongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://waycaosi:GIAbao1998@booksstore.dnjc2.mongodb.net/BooksStore?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

moongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

moongoose.set("useFindAndModify", false);
