import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();



const configuration = new Configuration({
  organization: "org-7EAaubmcaczu3EPQyzHML9OP",
  apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;
app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:`${message}`,
      max_tokens: 500,
      temperature: 0.5,
     
    });
    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
