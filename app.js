const express = require('express');
const app = express();

require('dotenv').config();
let PORT = process.env.PORT || 6000;

const testRoutes = require('./routes/test');

app.use(express.json());

app.get('/',(req,res) => {
    return res.status(200).json({
        success: true,
        message: 'SUCCESSFULLY_STARTED_APPLICATION',
        responseData: {}
    })
})

app.use('/',testRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${process.env.PORT}....`);
});