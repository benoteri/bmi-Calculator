const {response} = require('express');

const server = 'http://localhost:3000';
var weight;
var height;
var statusReport;
var result;

async function calculateBMI(){
    const url = server + '/bmi';
    const bmi = {Height: height,
Weight: weight,
BMI: result,
Status: statusReport
};
const options = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bmi)
}
const response = await fetch(url,options);
}

async function getBMI(){
    const url = server + '/reports';
    const options = {
        method:'GET',
    headers:{
        'Accept': 'application/json'
    }
    }
    const response = await fetch(url,options);
    const BMIs = await response.json();
    populateBMIs(BMIs);
}

function populateBMIs(BMIs){
        var table = document.getElementById("content");
}