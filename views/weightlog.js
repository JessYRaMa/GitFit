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
       
    //    if($("#dataRemove").val()!= null){
    //     var toDelete = $("#dataRemove").val().trim();
    //     for(var i=0; i<data.length; i++){
    //         console.log(data[i].id);
    //         if(newUser == data[i].username && toDelete == (moment(data[i].logged_at).format('L'))){
    //         }
    //     }
    //    }
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

//hello
function getId(){
    var toDelete = $("#dataRemove").val().trim();
    var newUser = $("#currentUser").val().trim();
        console.log("datausearray", dataUse);
        for(var i=0; i<dataUse.length; i++){
            console.log(dataUse[i].id);
            console.log(dataUse);
            console.log((moment(dataUse[i].logged_at).format('L')));
            console.log("newUser" ,newUser);
            console.log("toDelete", toDelete);
            console.log(dataUse[i].username);
            console.log("found match!", (newUser == dataUse[i].username && toDelete == (moment(dataUse[i].logged_at).format('L'))));

            if(newUser == dataUse[i].username && toDelete == (moment(dataUse[i].logged_at).format('L'))){
                    return(dataUse[i].id);
            }
        }
};


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
        // $("#username").attr("value", $("#currentUser").val().trim());
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
    // console.log("ITS RETURNING THIS", getId());
    removeData();
    deletePost(getId());
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

//   var blogContainer = $(".allLogs");

//   function initializeRows() {
//     blogContainer.empty();
//     var postsToAdd = [];
//     var post = data;
//     for (var i = 0; i < post.length; i++) {
//       postsToAdd.push(createNewRow(post[i].weight));
//       postsToAdd.push(createNewRow(post[i].logged_at));
//       postsToAdd.push(createNewRow(post[i].username));
//     }
//     blogContainer.append(postsToAdd);
//   }

//   function createNewRow(post) {
//     var newPostCard = $("<div>");
//     newPostCard.addClass("card");
//     var newPostCardHeading = $("<div>");
//     newPostCardHeading.addClass("card-header");
//     var deleteBtn = $("<button>");
//     deleteBtn.text("x");
//     deleteBtn.addClass("delete btn btn-danger");
//     var editBtn = $("<button>");
//     editBtn.text("EDIT");
//     editBtn.addClass("edit btn btn-default");
//     var newPostTitle = $("<h2>");
//     var newPostDate = $("<small>");
//     var newPostCategory = $("<h5>");
//     newPostCategory.text(post.category);
//     newPostCategory.css({
//       float: "right",
//       "font-weight": "700",
//       "margin-top":
//       "-15px"
//     });
//     var newPostCardBody = $("<div>");
//     newPostCardBody.addClass("card-body");
//     var newPostBody = $("<p>");
//     newPostTitle.text(post.title + " ");
//     newPostBody.text(post.body);
//     var formattedDate = new Date(post.createdAt);
//     formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
//     newPostDate.text(formattedDate);
//     newPostTitle.append(newPostDate);
//     newPostCardHeading.append(deleteBtn);
//     newPostCardHeading.append(editBtn);
//     newPostCardHeading.append(newPostTitle);
//     newPostCardHeading.append(newPostCategory);
//     newPostCardBody.append(newPostBody);
//     newPostCard.append(newPostCardHeading);
//     newPostCard.append(newPostCardBody);
//     newPostCard.data("post", post);
//     return newPostCard;
//   }

//   // This function figures out which post we want to delete and then calls
//   // deletePost
//   function handlePostDelete() {
//     var currentPost = $(this)
//       .parent()
//       .parent()
//       .data("post");
//     deletePost(currentPost.id);
//   }

//   // This function figures out which post we want to edit and takes it to the
//   // Appropriate url
//   function handlePostEdit() {
//     var currentPost = $(this)
//       .parent()
//       .parent()
//       .data("post");
//     window.location.href = "/api/weight/id=" + currentPost.id;
//   }
//   function displayEmpty() {
//     blogContainer.empty();
//     var messageH2 = $("<h2>");
//     messageH2.css({ "text-align": "center", "margin-top": "50px" });
//     messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
//     blogContainer.append(messageH2);
//   }




