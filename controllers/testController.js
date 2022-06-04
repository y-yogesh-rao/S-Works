const Axios = require('axios');
const Moment = require('moment');

const isPrime = (number) => {
    let count = 0;
    for(let i = 2; i < number / 2; i++) {
        if(number % i === 0 ) count++;
    }
    return count > 0 ? false : true;
}

exports.primeDate = async (req,res) => {
    try {
        const axiosResponse = await Axios({
            url: 'https://jsonkeeper.com/b/N9OS',
            method: 'get'
        });
        const data = axiosResponse.data;

        let responseData = {};
        let dataWithTag = [];
        let dataWithoutTag = [];
        for(let elementObject of data) {
            const dateDifference = (Moment().diff(Moment(elementObject.createdAt), 'days'));
            if(isPrime(dateDifference)) {
                elementObject = {...elementObject, isPrime: true};
            } else {
                elementObject = {...elementObject, isPrime: false};
            }

            if(elementObject?.tag) {
                dataWithTag.push(elementObject);
            } else {
                dataWithoutTag.push(elementObject);
            }
        }

        responseData['dataWithTag'] = dataWithTag;
        responseData['dataWithoutTag'] = dataWithoutTag;

        return res.status(200).json({
            success: true,
            message: 'REQUEST_SUCCESSFUL',
            responseData: responseData
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'SOMETHING_WENT_WRONG',
            responseData: {}
        })
    }
}