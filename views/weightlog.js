//dummy data with static data
var labels = ['2020-03-04', '2020-03-25', '2020-04-08', '2020-05-28', '2020-06-18', '2020-07-04'];
var dataSet = [100,125,104,108,103,102];
   
//chart creation
   var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Progress',
                data: dataSet,
                backgroundColor: '#ffffff00',
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            },
            title: {
                display: true,
                text: 'Weight Log'
            }
        }
    });  


//when add button is clicked
function addData() {
    var newLabel = $("#newLabel").val().trim();
    var newData = $("#data").val().trim();
    labels.push(newLabel);
    dataSet.push(newData);
    myChart.update();
    //add to labels to dropdown
    $('#dataRemove').append('<option value="'+ newLabel +'">'+ newLabel+'</option>');
};

//removal of data
function removeData() {
    var toDelete = $("#dataRemove").val().trim();
    console.log(toDelete);
    var index = labels.indexOf(toDelete);
    if (index > -1) { labels.splice(index, 1) }
    myChart.update();
}

//live updating the labels for the dropdown menu????

function dropDown(){
    for(var i=0; i<labels.length; i++){
        $('#dataRemove').append('<option value="'+labels[i]+'">'+labels[i]+'</option>');
    };
}
//load the dates into dropdown menu to be deleted
dropDown();
