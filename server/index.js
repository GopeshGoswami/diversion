const express = require("express");
const cors = require("cors");

const OPENAI_API_KEY = "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";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  //   organization: "org-XPZm5m3cXMWZ4cdslGpKmFTl",
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

openai.listEngines().then((response) => {
  //   console.log(response);
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/ping", (req, res) => {
  res.json({
    message: "ping",
  });
});

app.post("/chat", (req, res) => {
  const question = req.body.question;

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 1000,
      temperature: 0,
    })
    .then((response) => {
      console.log(response?.data?.choices?.[0]?.text);
      return response?.data?.choices?.[0]?.text;
    })
    .then((answer) => {
      const array = answer
        ?.split("\n")
        .filter((value) => value)
        .map((value) => value.trim());

      return array;
    })
    .then((answer) => {
      res.json({
        answer: answer,
        prompt: question,
      });
    });

  //   console.log({ question });
});

app.listen(3001, () => {
  console.log("SERVER IS LIVE AT PORT 3001");
});
