const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const urlEncoderParser = bodyParser.urlencoded({extended:false});

app.set('views','views');
app.set('view engine','hbs');
app.use(express.static('public'));

app.get('/contacts', function(request, response){
    response.render('contact_us');
});
app.post('/process-contacts', urlEncoderParser, function(request, response){
    response.end('Thank You '+ request.body.first_name + ' '+ request.body.last_name);
});
app.get('/bmi', function(request, response){
    response.render('bmiCalculator');
});
app.post('/bmiResults', urlEncoderParser,function(request, response){
    
         height = parseFloat(request.body.h-input);
         weight = parseFoat(request.body.w-input);
    
        // var result = parseFloat(weight) /(parseFloat(height)/100)**2;
        // document.getElementById("bmi_output").innerHTML = result;
        
    
   response.end('Your BMI is '+ weight/Math.pow(height,2));
});
app.listen(port);
console.log('server is listening on port 3000');