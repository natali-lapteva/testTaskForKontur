function getPlaceholder(input) {
    var inputId = input.attr('id');
    var idParts = inputId.split('_');
    var matrixName = idParts[0];
    var row = parseInt(idParts[1], 10) + 1;
    var column = parseInt(idParts[2], 10) + 1;
    return matrixName + row + ',' + column;
}

function setMask () {
    var inputs = $('input.cell');
    inputs.blur(function(e){
        var input = $(e.target);
        var stringValue = input.val();
        var intValue = parseInt(stringValue, 10);
        if (intValue > 10) {
            input.val('10');
        }
        if (input.val() === '') {
            setTimeout(function () {
                input.val(getPlaceholder(input));
                input.addClass('placeholder');
            }, 0);
        }
    });
    inputs.focus (function(e) {
        var input = $(e.target);
        if (input.val() === getPlaceholder(input)) {
            input.val('');
            input.removeClass('placeholder');
        }
    });
    inputs.mask('9?9', {placeholder:''});
    for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        input.val(getPlaceholder(input));
        input.addClass('placeholder');
    }
}
