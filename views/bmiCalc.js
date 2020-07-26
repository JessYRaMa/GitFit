
    $('#calculate').on('click', function(){
    let units = $('#units').val();
    let weightType = $('#weightType').val();
    let heightType = $('#heightType').val();
    let weight = $("#weight").val().trim();
    let height = $("#height").val().trim();
    let impBmi;
    let metBmi;
    console.log(impBmi);
    
    let imperialBmi = function(){
        impBmi = weight / height * 703;
        if ( units == 'Imperial') && ( weightType == 'Lbs') && ( heightType == 'Inches')) {
              imperialBmi();
            }
    };
    let metricBmi = function(){
            metBmi = weight / height;
            if ( units == 'Metric') && (weightType == 'Kg') && (heightType == 'Cm')) {
                metricBmi();
            }
        };  
});