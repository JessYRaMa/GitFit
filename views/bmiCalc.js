
    $('#calculate').on('click', function(){
    let weight = $("#weight").val().trim();
    let height = $("#height").val().trim();
    let impBmi;
    let metBmi;
    console.log(impBmi);
    
    let imperialBmi = function(){
        impBmi = weight / height * 703;
    };
    let metricBmi = function(){
            metBmi = weight / height;
    };
    
    if (($('#units') == 'imperial') && ($('#weightType') == 'Lbs') && ($('#heightType') == 'Inches')){
            imperialBmi();
        }
    else if (($('#units') == 'metric') && ($('#weightType') == 'Kg') && ($('heightType') == 'Cm')) {
        metBmi();
        }
});