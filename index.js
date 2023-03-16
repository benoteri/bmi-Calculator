const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const {response} = require('express');

const jsonParser =bodyParser.json();
const fileName = 'bmiCalc.json';
const urlEncoderParser = bodyParser.urlencoded({extended:false});

let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views','views');
app.set('view engine','hbs');
app.use(express.static('public'));

app.get('/', function(request, response){
    response.render('bmiCalculator');
});

app.get('/contacts', function(request, response){
    response.render('contact_us');
});
app.post('/process-contacts', urlEncoderParser, function(request, response){
    response.end('Thank You '+ request.body.first_name + ' '+ request.body.last_name);
});
app.get('/bmi',jsonParser, function(request, response){
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(daata, null,2));
    
    response.render('/bmiResults');
});
app.post('/bmiResults', urlEncoderParser,function(request, response){
    
         height = parseFloat(request.body.h-input);
         weight = parseFoat(request.body.w-input);
    
        // var result = parseFloat(weight) /(parseFloat(height)/100)**2;
        // document.getElementById("bmi_output").innerHTML = result;
        
    
   response.end('Your BMI is '+ weight/Math.pow(height,2));
});
app.listen(port);
console.log(`server is listening on port ${port}`);