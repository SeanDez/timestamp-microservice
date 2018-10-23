const express = require("express");
const app = express();
const port = 3000;
const lodash = require('lodash');

app.get('/', (request, response) => response.send("Hello World"));

// testing setting url parameters
app.get('/users/:user_id/books/:book_id', function (request, response) {
    response.send(request.params)
});


// app.get('/test_id/:test_id', function(request,response) {
//     const test_id = request.params.test_id;
//     if (test_id) {
//         console.log(request.params);
//         response.send(test_id);
//     if (lodash.isEmpty(request.params)) {
//         response.send('No test_id detected')
//     } else {
//         response.send('hit the else statement')
//     }
//
// }});

// if "timestamp param left empty" aka route is empty
app.get('/api/timestamp/', function(request, response) {
    response.send(new Date());
});




app.get('/api/timestamp/:date_string?', function (request, response) {
    const date_string_raw = request.params.date_string;
    const date_string_attempted_parse = new Date(date_string_raw);
    console.log(date_string_attempted_parse);

    // either send the object or raise an exception
    try {
        if (date_string_attempted_parse.getTime()) {
            response.send({
                unix : date_string_attempted_parse.getTime(),
                utc : date_string_attempted_parse.toUTCString()
            });
        }
        else if (!!date_string_attempted_parse.getTime() == false) {
            response.send({
                error : "Invalid Date"
            })
            // throw new DateError('Invalid Date')
        }
    }

    catch(e) {
        console.log('Error:', e);
        response.send('Error:', e)
    }

});



app.listen(port, () => console.log(`Example express app listening on port ${port}`));

