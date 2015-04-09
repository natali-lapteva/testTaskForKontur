function changeMatrix() {
    console.log(1);
    changeVertical();
}

function changeVertical () {
    for (var i = 1; i <= 2; i++) {
        var temp = $('.matrixWrapper', '#place_' + i + '_1').detach();
        $('.matrixWrapper', '#place_' + i + '_2').detach().appendTo($('#place_' + i + '_1'));
        $('#place_' + i + '_2').append(temp);
    }
}