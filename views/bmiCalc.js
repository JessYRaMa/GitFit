var units = $('#units').val();
var weightType = $('#weightType').val();
var heightType = $('#heightType').val();
var weight = $("#weight").val().trim();
var height = $("#height").val().trim();

    $('#calculate').on('click', function(){
        if (units == 'Imperial' && weightType == 'Lbs' && heightType == 'Inches') {
            $('#yourBmi').html(imperialBmi());
        }
        if (units == 'Metric' && weightType == 'Kg' && heightType == 'Cm') {
            $('#yourBmi').html(metricBmi());
            }
    });
    
    var imperialBmi = function(){
       return weight / height * 703;
    };
    
    var metricBmi = function(){
     return weight / height;
};