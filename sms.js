const express = require('express');
const twilio = require('twilio');

require('dotenv').config();

const port = process.env.PORT || 3000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.post('/send-sms', (req, res) => {
    const {to, body} = req.body;

    client.messages.create({
        to,
        body, 
        from: "Test"
    })
    .then(()=>{
        res.send('SMS sent successfully!');
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).send("Error sending SMS")
    })
})
app.use((req, res)=>{
    res.status(404)
        .json({
            status: "Failured",
            message: "Not found"
        })
})

app.use((err, req, res, next) => {
    const {status=500, message="Server ERROR"} = err;
    res.status(status)
    .json({
        status: "Failured",
        message
    })
})

app.listen(port, ()=>{console.log(`Server is running on port ${port}`);});
// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // console.log("accountSid", accountSid);
// const client = twilio(accountSid, authToken);

// // app.use(cors);

// app.use(express.json);
// // console.log("accountSid", accountSid);

// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/send-sms', (req, res) => {
//     // const {to, body} = req.body;
//     try {
//         console.log();
//         res.status(200).json({
//             body: req.body
//         })
//         // client.messages.create({
//         //     body: body,
//         //     to: to,
//         //     from: "TEST"
//         // })
//         // .then(()=>{
//         //     res.send('SMS sent successfully!');
//         // })
//         // .catch((err)=> {
//         //     console.log(err);
//         //     res.status(500).send("Error sending SMS")
//         // })
            
//     } catch (error) {
//         throw new Error("Error");        
//     }
// })

// app.use((req, res) => {
//     res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//     const { status = 500, message = 'Server Error' } = err;
//     res.status(status).json({ message })
// })

// app.listen(port, () => {
//     console.log(`Serveris listening on port ${port}`);
// })