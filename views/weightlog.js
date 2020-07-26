var labels = [];
var dataSet = [];
var users = [];
var dataUse = [];

$("#currentUser").attr("value", "default");
var newUser = $("#currentUser").val().trim();

function getPostData() {
    $.get("/api/weight", function(data) {
        console.log(data);
        var newUser = $("#currentUser").val().trim();
        for(var i=0; i<data.length; i++){
            if(data[i].username === newUser){
            labels.push(moment(data[i].logged_at).format('L'));
            dataSet.push(data[i].weight);
            };
            if(users.indexOf(data[i].username) === -1){
                users.push(data[i].username);
            }
            dataUse.push(data[i]);
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
    };
}

function UserDropdown(){
    for(var i=0; i<users.length; i++){
        $('#currentUser').append('<option value="'+users[i]+'">'+users[i]+'</option>');
    };
}

function getId(){
    var toDelete = $("#dataRemove").val().trim();
    var newUser = $("#currentUser").val().trim();
        console.log("datausearray", dataUse);
        for(var i=0; i<dataUse.length; i++){
            if(newUser == dataUse[i].username && toDelete == (moment(dataUse[i].logged_at).format('L'))){
                    return(dataUse[i].id);
            } else{
                return -1;
            }
        }
};

 function createGraph(){
    var currentUser = $("#currentUser").val().trim();
    $.get("/api/weight", function(data) {
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
    chartData.datasets[0].data.length = 0;
    chartData.labels.length = 0;
    myChart.update();
};

$("#deleteGraph").on("click", function(){
    resetGraph(); 
});

$("#currentUser").on("change", function(){
    if(this.selectedIndex){
        resetGraph();
        createGraph();
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
 });
 
 $("#submit").on("click", function(){
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
     var newuser = $("#currentUser");
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
    deletePost(getId());
})   

//removal of data
function removeData() {
    var toDelete = $("#dataRemove").val().trim();
    console.log(toDelete);
    var index = labels.indexOf(toDelete);
    var weightIndex = dataSet.indexOf(toDelete);
    if(weightIndex > -1){dataSet.splice(index,1)};
    if (index > -1) { labels.splice(index, 1) };
    myChart.update();
}

function deletePost(id) {
    if (id < 0){
        alert("ERROR! NO EVIDENCE TO REMOVE!!!");
    } else{
        $.ajax({
            method: "DELETE",
            url: "/api/weight/" + id
          })
            .then(function() {
              myChart.update();
            });
    }
  }



