var labels = [];
var dataSet = [];

function getPostData() {
    $.get("/api/weight", function(data) {
        console.log(data);
        
        for(var i=0; i<data.length; i++){
            labels.push(data[i].logged_at);
            dataSet.push(data[i].weight);
        };
    });
  };

  getPostData();

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

     addData();
     submitPost();
 })   
    

//when add button is clicked
function addData() {
     var newLabel = $("#newLabel").val();
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
      addData();
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
        removeData();
      });
  }

function dropDown(){
    for(var i=0; i<labels.length; i++){
        $('#dataRemove').append('<option value="'+labels[i]+'">'+labels[i]+'</option>');
    };
}
//load the dates into dropdown menu to be deleted
dropDown();


