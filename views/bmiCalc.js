
    $('#calculate').on('click', function(){
        let units = $('#units').val();
        let weightType = $('#weightType').val();
        let heightType = $('#heightType').val();
        let weight = $("#weight").val().trim();
        let height = $("#height").val().trim();
    
    
    let imperialBmi = function(){
        let impBmi = weight / height * 703;
        if (units == 'Imperial' && weightType == 'Lbs' && heightType == 'Inches') {
            imperialBmi();
        };
            }
    let metricBmi = function(){
        let metBmi = weight / height;
        if (units == 'Metric' && weightType == 'Kg' && heightType == 'Cm') {
            metricBmi();
        }
    };
});