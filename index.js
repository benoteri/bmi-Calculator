const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json();
const fs = require('fs');
const { response } = require('express');
const fileName = 'db.json'


let rawData = fs.readFileSync(fileName)
let bmiData = JSON.parse(rawData)

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/contacts', function (request, response){
    response.render('contact-us');
});
app.get('/', function (request, response){
    response.render('bmi');
});

app.get('/bmi', function (request, response){
    response.render('bmi');
});

app.get('/reports', (request, response)=>{
    response.render('reports')
})

app.get('/bmiReports', (request, response) => {
    response.send(bmiData);
})


app.post('/process-contacts', urlEncodedParser, (request, response) => {
    response.end('Thank you ' + request.body.first_name + ' ' + request.body.last_name);
});

app.post('/calculate-bmi', urlEncodedParser, jsonParser, (request, response) => {
    var bmi = request.body.weight / (request.body.height * request.body.height);
    var status = '';
    if(bmi < 18.5){
        status = 'underweight';
    }else if(bmi >= 18.5 && bmi < 25){
        status = 'normal'
    }else if(bmi >= 25  && bmi < 30){
        status = 'overweight'
    }else{
        status = 'obese'
    }
    const info = {
        height: request.body.height,
        weight: request.body.weight,
        bmi: bmi,
        status: status
    }

    bmiData.push(info);
    
    fs.writeFileSync(fileName, JSON.stringify(bmiData, null, 2));
    response.render('individual', {bmi: bmi, status: status});
});

app.listen(port);
console.log('Server listening on port ${port}');
