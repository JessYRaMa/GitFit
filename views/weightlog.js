var labels = [];
var dataSet = [];
var users = [];

var newUser = $("#username").val().trim();

function getPostData() {
    $.get("/api/weight", function(data) {
        console.log(data);
        
        for(var i=0; i<data.length; i++){
            if(data[i].username === newUser){
            labels.push(moment(data[i].logged_at).format('L'));
            dataSet.push(data[i].weight);
            };
            if(users.indexOf(data[i].username) === -1){
                users.push(data[i].username);
            }
        };
        myChart.update();
       UserDropdown();    
    });
  };

  getPostData();

  function dropDown(){
      $("#dataRemove").html('<option value="" disabled selected>Want to delete one?</option>');
    for(var i=0; i<labels.length; i++){
        $('#dataRemove').append('<option value="'+ labels[i]+'">'+labels[i]+'</option>');
        console.log("hello");
    };

    console.log(labels);
    // labels.length = 0;
}

function UserDropdown(){
    for(var i=0; i<users.length; i++){
        $('#currentUser').append('<option value="'+users[i]+'">'+users[i]+'</option>');
    };
}

 function createGraph(){
    
    var currentUser = $("#currentUser").val().trim();

    $.get("/api/weight", function(data) {
        console.log(data);
        console.log(currentUser);

        for(var i=0; i<data.length; i++){
            if(data[i].username === currentUser){
            labels.push(moment(data[i].logged_at).format('L'));
            dataSet.push(data[i].weight);
            dropDown();
            };
            if(users.indexOf(data[i].username) === -1){
                users.push(data[i].username);
            }
        };
        myChart.update();
    });
}

function resetGraph(){
    var chartData = myChart.data;

    console.log(chartData.length);
    // for(var i=0; i< chartData.labels.length || i<chartData.datasets[0].data.length; i++){
    // chartData.datasets[0].data.pop();
    // chartData.labels.pop();
    // }
    chartData.datasets[0].data.length = 0;
    chartData.labels.length = 0;

    console.log(myChart.data.datasets[0].data);
    console.log(myChart.data);
    myChart.update();
};

$("#deleteGraph").on("click", function(){
    resetGraph();
});

$("#currentUser").on("change", function(){
    if(this.selectedIndex){
        resetGraph();
        createGraph();
        $("#username").attr("value", $("#currentUser").val().trim());
        dropDown();
    }
})
//chart creation
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight',
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

 $("#addBtn").on("click",function(){
     event.preventDefault();
     submitPost();
 })   
    
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
     var newuser = $("#username");
     var newheight = $("#height");

    var newPost = {
        username: newuser.val().trim(),
        logged_at: logged.val().trim(),
        weight: newData.val().trim(),
        height: newheight.val().trim(),
        age: newage.val().trim(),
      };

    $.post("/api/weight", newPost, function() {
      console.log(newPost);
    });
  }

  $("#deleteBtn").on("click",function(){
    event.preventDefault();
    removeData();
    deletePost();
})   

//removal of data
function removeData() {
    var toDelete = $("#dataRemove").val().trim();
    console.log(toDelete);
    var index = labels.indexOf(toDelete);
    if (index > -1) { labels.splice(index, 1) }
    myChart.update();
}

function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/weight/" + id
    })
      .then(function() {
        myChart.update();
      });
  }




