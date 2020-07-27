var labels = [];
var dataSet = [];
var users = [];
var dataUse = [];
var localUserName = window.localStorage.userName;

$("#currentUser").attr("value", localUserName);
var newUser = localUserName;
//localUserName;

function getPostData() {
    $.get("/api/weight", function(data) {
        console.log(data);
        var newUser = localUserName;
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
       //UserDropdown();

       resetGraph();
       createGraph();
       dropDown(); 

    //    sortLD();
    });
  };

  getPostData();

  function dropDown(){
      $("#dataRemove").html('<option value="" disabled selected>Want to delete one?</option>');
    for(var i=0; i<labels.length; i++){
        $('#dataRemove').append('<option value="'+ labels[i]+'">'+labels[i]+'</option>');
    };
}

// function UserDropdown(){
//     $("#currentUser").html('<option value="'+localUserName+'">'+localUserName+'</option>' || '<option value="" selected = "selected">Select Your Username!</option>');
//     for(var i=0; i<users.length; i++){
//         $('#currentUser').append('<option value="'+users[i]+'">'+users[i]+'</option>');
//     };
// }

function getId(){
    var toDelete = $("#dataRemove").val().trim();
    var newUser = localUserName;
        console.log("datausearray", dataUse);

        for(var i=0; i<dataUse.length; i++){
            console.log("id",dataUse[i].id);
            console.log("username", dataUse[i].username);
            console.log("logged", (moment(dataUse[i].logged_at).format('L')));
            console.log("to delete", toDelete);
            console.log("newUser", newUser);

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


// $("#currentUser").on("change", function(){
//     if(this.selectedIndex){
//         // localStorage.setItem("selected",($(this).val()));
//         // console.log(localStorage.getItem("selected"));
//         resetGraph();
//         createGraph();
//         dropDown(); 
//     }
// })

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
                text: 'Weight Log' + ': ' + localUserName
            }
        }
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
       alert("no empty fields");
     } else{
        addData();
        getPostData();

        var newPost = {
            username: newuser,
            logged_at: logged.val().trim(),
            weight: newData.val().trim(),
            height: newheight.val().trim(),
            age: newage.val().trim(),
          };
        $.post("/api/weight", newPost, function() {
          console.log(newPost);
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
    console.log(toDelete);
    var index = labels.indexOf(toDelete);
    var weightIndex = dataSet.indexOf(toDelete);
    if(weightIndex > -1){dataSet.splice(index,1)};
    if (index > -1) { labels.splice(index, 1) };
    myChart.update();
}

function deletePost(id) {
    if (id == -1){
        console.log(id);
        console.log("not deleted");
        alert("ERROR! NO EVIDENCE TO REMOVE!!!");
    } else{

        removeData();
        dropDown();
        getPostData();

        console.log("deleted");
        $.ajax({
            method: "DELETE",
            url: "/api/weight/" + id
          })
            .then(function() {
              myChart.update();
            });
    }
  }



  //ACCESS LABELS AND DATASET ERROR (labelsArry empty etc)
//   function sortLD(){
//       console.log("check:" + labels);
//       console.log(dataSet);

//       console.log(labels.pop());
//         console.log(dataSet.pop());

//       var labelArry = [];
//       var dataArry = [];
      

//       for(let i = 0; i < labels.length; ++i){
//         labelArry.push(labels[i]);
//         dataArry.push(dataSet[i]);
//       }

//       for(let i = 0; i < labelArry.length-1; ++i){
//           for(let j = 0; j < labelArry.length- i - 1; ++j){
//               if(labelArry[j] > labelArry[j+1]){
//                 var temp = labelArry[j]; 
//                 labelArry[j] = labelArry[j+1]; 
//                 labelArry[j+1] = temp; 

//                 var temp2 = dataArry[j]; 
//                 dataArry[j] = dataArry[j+1]; 
//                 dataArry[j+1] = temp2; 
//               }
//           }
//       }

//       for(let i = 0; i < labels.length; ++i){
//           labels[i] = labelArry[i];
//           dataSet[i] = dataArry[i];
//       }

//       console.log(labelArry);
//       console.log(dataArry);
//   }
