const server = "http://localhost:3000";

fetchData();


async function fetchData() {
    try {
        const response = await fetch('/bmiReports');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        buildReportsTable(data);
        calculateTotalAverage(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function buildReportsTable(data) {
    var table = document.getElementById('reportsTable');

    const bodyRows = data.map(item => {
        const row = document.createElement('tr');
        const height = document.createElement('td');
        const weight = document.createElement('td');
        const bmi = document.createElement('td');
        const status = document.createElement('td');

        height.textContent = item.height;
        weight.textContent = item.weight;
        bmi.textContent = item.bmi;
        status.textContent = item.status;

        row.appendChild(height);
        row.appendChild(weight);
        row.appendChild(bmi);
        row.appendChild(status);
        row.addClassList('row');

        return row;
    })

    bodyRows.forEach(row => table.appendChild(row));
}

function calculateTotalAverage(data) {
    var paragraph = document.getElementById('averageBMI');
    var statusStage = document.getElementById('averageStatus');
    var sum = 0;
    var average = 0;
    var status = '';



    data.forEach(item => {

        sum += item.bmi

    });
    average = sum / data.length;
    if(average < 18.5){
        status = 'underweight';
    }else if(average >= 18.5 && average < 25){
        status = 'normal'
    }else if(average >= 25  && average < 30){
        status = 'overweight'
    }else{
        status = 'obese'
    }

    console.log(average)

    paragraph.append(average);
    statusStage.append(status);
}