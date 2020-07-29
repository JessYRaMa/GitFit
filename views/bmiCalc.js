
    $('#calculate').on('click', function(){
        event.preventDefault();
        var units = $('#units').val();
        var weightType = $('#weightType').val();
        var heightType = $('#heightType').val();
        var weight = parseInt($("#weight").val().trim());
        var height = parseInt($("#height").val().trim());
        

        if (units == 'Imperial') {
            var bmi1 = Math.floor(703 * weight/Math.pow(height,2));
            $('#yourBMI').html(bmi1);
        }
        else if (units == 'Metric') {
            var bmi2 = Math.floor(10000 * weight/Math.pow(height,2));
            $('#yourBMI').html(bmi2);
            }
            console.log(weightType, heightType, units,height, weight);
    });
    