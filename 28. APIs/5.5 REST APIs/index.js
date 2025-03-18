import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "d82468ce-d135-49d8-951a-e0026bc36458";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  // console.log(typeof(req.body.secret)); // Testing
  // console.log(req.body.id);
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const addSecret = req.body.secret;
  const addScore = req.body.score;
  // Improvement: I could have directly passed the req.body in axios body, manually creating and passing the requestBody object was not needed.
  const requestBody = {
    "secret": addSecret,
    "score": addScore
  }
  try {
    const result = await axios.post(API_URL + "/secrets", requestBody , config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  const putID = req.body.id;
  const putSecret = req.body.secret;
  const putScore = req.body.score;
  const requestBody = {
    "secret": putSecret,
    "score": putScore
  }
  try {
    const result = await axios.put(API_URL + "/secrets/" + putID , requestBody , config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const patchID = req.body.id;
  const patchSecret = req.body.secret;
  const patchScore = req.body.score;
  const requestBody = {};
    // Improvement: I could have directly passed the req.body in axios body, manually creating and passing the requestBody object was not needed. These if blocks are also not needed, if req.body is directly passed.
  if (req.body.secret != ""){
    requestBody["secret"]= patchSecret;
  }
  if (req.body.score != ""){
    requestBody["score"]= patchScore;
  }
  try {
    const result = await axios.patch(API_URL + "/secrets/" + patchID , requestBody , config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
