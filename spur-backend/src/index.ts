import express from "express";
import "dotenv/config";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Spur Backend Running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
