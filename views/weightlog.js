//global variables
var labels = [];
var dataSet = [];
var users = [];
var dataUse = [];
var localUserName = window.localStorage.userName;
$("#currentUser").attr("value", localUserName);
var newUser = localUserName;

//chart title
var main = $(".title").html("<h3>" + "Welcome to " + "<b>" + localUserName + "</b>" + "'s Progress Log" + "</h3>");
main.attr("class", "mb-5");

function getPostData() {
    $.get("/api/weight", function(data) {
        // console.log(data);
        var newUser = localUserName;
        for(var i=0; i<data.length; i++){
            if(data[i].username === newUser){
            labels.push(JSON.stringify(moment(data[i].logged_at).format('L')).slice(1,-1));
            dataSet.push(parseInt(JSON.stringify(data[i].weight)));
            };
            if(users.indexOf(data[i].username) === -1){
                users.push(data[i].username);
            }
            dataUse.push(data[i]);
        };
        labels, dataSet = bubbleSort(labels, dataSet);
        myChart.update();
       resetGraph();
       createGraph();
       dropDown();
    });
  };
  //onload getPostData
  getPostData();

//populate the dropdown with dates available to remove  
  function dropDown(){
      $("#dataRemove").html('<option value="" disabled selected>Want to delete one?</option>');
    for(var i=0; i<labels.length; i++){
        $('#dataRemove').append('<option value="'+ labels[i]+'">'+labels[i]+'</option>');
    };
}

//get post id
function getId(){
    var toDelete = $("#dataRemove").val().trim();
    var newUser = localUserName;
        for(var i=0; i<dataUse.length; i++){
            if(newUser == dataUse[i].username && toDelete == (moment(dataUse[i].logged_at).format('L'))){
                    return(dataUse[i].id);
            } 
        }
        return -1;
    };


 function createGraph(){
    var currentUser = localUserName;
    $.get("/api/weight", function(data) {
        for(var i=0; i<data.length; i++){
            if(data[i].username === currentUser){
                labels.push(JSON.stringify(moment(data[i].logged_at).format('L')).slice(1,-1));
                dataSet.push(parseInt(JSON.stringify(data[i].weight)));
                dropDown();
            };
            if(users.indexOf(data[i].username) === -1){
                users.push(data[i].username);
            }
        };
        labels, dataSet = bubbleSort(labels, dataSet);
        myChart.update();
    });
}

function resetGraph(){
    var chartData = myChart.data;
    chartData.datasets[0].data.length = 0;
    chartData.labels.length = 0;
    myChart.update();
};

$("#deleteGraph").on("click", function(){
    resetGraph(); 
});

//on load chart creation
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'WEIGHT (LBS)',
                data: dataSet,
                backgroundColor: '#ffffff00',
                borderColor: "#1DC995",
                borderWidth: 3,
                pointBorderColor: '#808080',
                pointBackgroundColor: '#808080',
                pointBorderWidth: 5,
                
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        labels: "lbs"
                    },
                }],
            },
            title: {
                display: false,
            },
            legend: {
                display: true,
            },
            layout: {
                padding: {
                    left: 20,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }     
        }
    });
$("#lineChart").on("click", function(){
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'WEIGHT (LBS)',
                data: dataSet,
                backgroundColor: '#ffffff00',
                borderColor: "#1DC995",
                borderWidth: 3,
                pointBorderColor: '#808080',
                pointBackgroundColor: '#808080',
                pointBorderWidth: 5,
                
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        labels: "lbs"
                    },
                }],
            },
            title: {
                display: false,
            },
            legend: {
                display: true,
            },
            layout: {
                padding: {
                    left: 20,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }     
        }
    });
    myChart.update();
});    

$("#barChart").on("click", function(){
    var ctx = document.getElementById('myChart').getContext('2d');
     myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'WEIGHT (LBS)',
                data: dataSet,
                backgroundColor: '#ffffff00',
                borderColor: "#1DC995",
                borderWidth: 3,
                pointBorderColor: '#808080',
                pointBackgroundColor: '#808080',
                pointBorderWidth: 5,
                
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        labels: "lbs"
                    },
                }],
            },
            title: {
                display: false,
            },
            legend: {
                display: true,
            },
            events: 'click',
            layout: {
                padding: {
                    left: 20,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }     
        }
    });
    myChart.update();
});

$("#polarChart").on("click", function(){
    var ctx = document.getElementById('myChart').getContext('2d');
     myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                label: 'WEIGHT (LBS)',
                data: dataSet,
                backgroundColor: '#ffffff00',
                borderColor: "#1DC995",
                borderWidth: 3,
                pointBorderColor: '#808080',
                pointBackgroundColor: '#808080',
                pointBorderWidth: 5,
                
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        labels: "lbs"
                    },
                }],
            },
            title: {
                display: false,
            },
            legend: {
                display: true,
            },
            events: 'click',
            layout: {
                padding: {
                    left: 20,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }     
        }
    });
    myChart.update();
});

 $("#addBtn").on("click",function(){
     event.preventDefault();
     submitPost();
 });
    
//when add button is clicked
function addData() {
     var newLabel = moment($("#newLabel").val()).format('L');
     var newData = $("#data").val();
    labels.push(newLabel);
    dataSet.push(newData);
    myChart.update();
    //add to labels to dropdown
    $('#dataRemove').append('<option value="'+ newLabel +'">'+ newLabel+'</option>');
};
function submitPost(newPost) {

     var newData = $("#data");
     var newage = $("#age");
     var logged = $("#newLabel");
     var newuser = localUserName;
     var newheight = $("#height");

     if(!(logged.val() && newData.val() && newheight.val() && newage.val())){
        var empty = $("#noEmpty").html("<p><em>" + "Please fill in all fields." + "</em><p>");
                empty.css("color", "red");
                clearValues();
     } else{
        addData();
        getPostData();
//post to be submitted to the database
        var newPost = {
            username: newuser,
            logged_at: logged.val().trim(),
            weight: newData.val().trim(),
            height: newheight.val().trim(),
            age: newage.val().trim(),
          };
        $.post("/api/weight", newPost, function() {
        //   console.log(newPost);
          clearValues();
        });
     }
  }

  $("#deleteBtn").on("click",function(){
    event.preventDefault();
    deletePost(getId());
})   

//removal of data
function removeData() {
    var toDelete = $("#dataRemove").val().trim();
    // console.log(toDelete);
    var index = labels.indexOf(toDelete);
    var weightIndex = dataSet.indexOf(toDelete);
    if(weightIndex > -1){dataSet.splice(index,1)};
    if (index > -1) { labels.splice(index, 1) };
    myChart.update();
}

function deletePost(id) {
    if (id == -1){
        var empty = $("#noValue").html("<p><em>" + "Error. No value to remove. Try again." + "</em><p>");
        empty.css("color", "red");
    } else{

        removeData();
        dropDown();
        getPostData();

        // console.log("deleted");
        $.ajax({
            method: "DELETE",
            url: "/api/weight/" + id
          })
            .then(function() {
              myChart.update();
            });
    }
  }

  function clearValues(){
    var newData = $("#data");
     var newage = $("#age");
     var logged = $("#newLabel");
     var newheight = $("#height");
    newData.val(null);
    newage.val(null);
    logged.val(null);
    newheight.val(null);
};

  //BUBBLE SORT
  function bubbleSort(arr, arr2){
    for (var i = arr.length; i > 0; i--){
        for(var j = 0; j < i-1; j++){
            if(arr[j] > arr[j+1]){
                var temp = arr[j];
                arr [j]= arr[j+1];
                arr[j+1] = temp;

                var temp2 = arr2[j];
                arr2 [j]= arr2[j+1];
                arr2[j+1] = temp2;
            };
        };
    };
    return arr, arr2;
}

//Debug function
function DebugMe(location){
    var chartyData = myChart.data;

    console.log("---------------------------------DEBUGGING-----------------------------------\n",
    "ISSUE: Label & Dataset Access inside " + location + "-\n",
    "\t" + "labels: ", labels, "\n",
    "\t" + "labels.length: ", labels.length, "\n",
    "\t" + "labels[0]: ", labels[0], "\n",
    "\t" + "dataSet: ", dataSet,  "\n",
    "\t" + "dataSet.length: ", dataSet.length, "\n",
    "\t" + "dataSet[0]: ", dataSet[0],  "\n",
    "\t" + "myChart.data.labels: ", myChart.data.labels, "\n",
    "\t" + "myChart.data.labels.length: ", myChart.data.labels.length, "\n",
    "\t" + "myChart.data.labels[0]: ", myChart.data.labels[0], "\n",
    "\t" + "myChart.data.datasets[0].data: ", myChart.data.datasets[0].data, "\n",
    "\t" + "myChart.data.datasets[0].data.length: ", myChart.data.datasets[0].data.length, "\n",
    "\t" + "myChart.data.datasets[0].data[0]: ", myChart.data.datasets[0].data[0], "\n",
    "\t" + "-(var chartyData = myChart.data define within debug function)-\n",
    "\t" + "chartyData.labels: ", chartyData.labels, "\n",
    "\t" + "chartyData.labels.length: ", chartyData.labels.length, "\n",
    "\t" + "chartyData.labels[0]: ", chartyData.labels[0], "\n",
    "\t" + "chartyData.datasets[0].data: ", chartyData.datasets[0].data, "\n",
    "\t" + "chartyData.datasets[0].data.length: ", chartyData.datasets[0].data.length, "\n",
    "\t" + "chartyData.datasets[0].data[0]: ", chartyData.datasets[0].data[0], "\n",
    "Notes:\n",
    "\t\t Idea1: Main and functions within main have some form of limited access, "
        + "functions with a $.get have perfect access (sometimes???). The issue must be scope?"
        +" (Not a viable method.)\n",
    "\t\t Idea2: access data via myChart.data.labels & ... .datasets[0].data (Not a viable method.)\n",
    "\t\t Idea3: define function within a function that has $.get ." + "$.get must not be the issue" 
        + "function defined within $.get did not get access, but function defined within resetGraph() did."
        +" why? (Not a viable method.)\n",
    "\t\t Idea4: Data access attempt are too direct, try method of access used within resetGraph()" 
        + "(Not a viable method.) so why did it work within the resetGraph()???\n",
    "\t\t Idea5: ...\n", 
    "\n----------------------------------------------------------------------------\n");
}