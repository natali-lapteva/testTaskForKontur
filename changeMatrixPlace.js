var isChangeVertical = true;
var isARightSide = true;
var isBBottomSide = true;

function changeMatrix() {
    if (isChangeVertical) {
        changeHorizontally();
    }
    else {
        changeVertical();
    }
    isChangeVertical = !isChangeVertical;
}

function changeVertical() {
    for (var i = 1; i <= 2; i++) {
        var temp = $('.matrixWrapper', '#place_' + i + '_1').detach();
        $('.matrixWrapper', '#place_' + i + '_2').detach().appendTo($('#place_' + i + '_1'));
        $('#place_' + i + '_2').append(temp);
    }
    var a = $('#descriptionA').detach();
    if (isARightSide) {
        a.prependTo($('#matrixWrapperA'));
    }
    else {
        a.appendTo($('#matrixWrapperA'));
    }
    a.toggleClass('leftSide', isARightSide);
    isARightSide = !isARightSide;
    a.toggleClass('rightSide', isARightSide);
}

function changeHorizontally() {
    for (var i = 1; i <= 2; i++) {
        var temp = $('.matrixWrapper', '#place_1_' + i).detach();
        $('.matrixWrapper', '#place_2_' + i).detach().appendTo($('#place_1_' + i));
        $('#place_2_' + i).append(temp);
    }
    var b = $('#descriptionB').detach();
    if (isBBottomSide) {
        b.prependTo($('#matrixWrapperB'));
    }
    else {
        b.appendTo($('#matrixWrapperB'));
    }
    b.toggleClass('topSide', isBBottomSide);
    isBBottomSide = !isBBottomSide;
    b.toggleClass('bottomSide', isBBottomSide);
}