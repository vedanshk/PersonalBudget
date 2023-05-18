const express = require('express');

const app = express();

const { doesTitleExists } = require("./utils.js");

const PORT = 3000;
const envelopes = [];
const totalBudget = 1000;
//end points

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {

    res.send("Hello World");

});

app.post("/envelopes", (req, res) => {

    const budget = req.body;
    const titleIndex = doesTitleExists(budget.title, envelopes);
    if (titleIndex == -1) {
        envelopes.push(budget);

        res.status(201).send("Successfully saved");


    } else {
        res.send("Envelope With title already exists");

    }

});

app.get("/envelopes", (req, res) => {

    res.send(JSON.stringify(envelopes));

});
app.get("/envelopes/:title", (req, res) => {
    const titleIndex = doesTitleExists(req.params.title, envelopes);

    if (titleIndex == -1) {
        res.status(404).send("Envelope with title not found");
    } else {
        const envelope = envelopes[titleIndex];

        res.send(JSON.stringify(envelope));

    }

});

app.put("/envelopes/:title", (req, res) => {
    const titleIndex = doesTitleExists(req.params.title, envelopes);
    const envelope = req.body;

    if (titleIndex == -1) {
        res.status(404).send("Envelope with title not found");
    } else {
        envelopes[titleIndex] = envelope;

        res.send("Successfully updated");

    }

});


app.delete("/envelopes/:title", (req, res) => {

    envelopes.filter(envelope => envelope.title == req.params.title);
    res.send("Successfully deleteted")

});




// 

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});