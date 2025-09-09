require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 8080;

const BEDROCK_API_KEY = process.env.BEDROCK_API_KEY;
console.log("BEDROCK_API_KEY", BEDROCK_API_KEY.slice(-4));

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/hello", (req, res) => {
    res.send({ message: "bonjour!" });
});

app.post("/sendMessage", (req, res) => {
    console.log("message received", req?.body);
    if (!req?.body?.userMessage)
        res.status(400).send({ error: "userMessage is required" });
    
    const requestBody = {
        messages: [
            {
                role: "user",
                content: [
                    {
                        text: req?.body?.userMessage,
                    },
                ],
            },
        ],
    };
    axios
        .post(
            "https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.nova-micro-v1:0/invoke",
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${BEDROCK_API_KEY}`,
                },
            }
        )
        .then((resp) => {
            // traverse the response object to get the message text
            const messageText = resp?.data?.output?.message?.content[0]?.text;
            res.send({ replyMessage: messageText });
        })
        .catch((error) => {
            console.error("Error occurred while sending message:", error);
            res.status(500).send({ error: "Failed to send message" });
        });
});

app.listen(port, () => {
    console.log(`"listening on port ${port}"`);
});
