function onReady() {
    var dimensions = {  //размерности матриц
        a: {
            rows: 4,
            columns: 2
        },
        b: {
            rows: 2,
            columns: 3
        },
        c: {
            rows: 4,
            columns: 3
        }
    };

    function addRow(matrixName) {
        if (dimensions[matrixName].rows >= 10) {
            return;
        }
        var row = $('<tr/>');
        for (var i = 0; i < dimensions[matrixName].columns; i++) {
            var cell = $('<td/>');
            var settings = {
                type: 'text',
                'class': 'cell',
                id: matrixName + '_' + dimensions[matrixName].rows + '_' + i
            };
            if (matrixName === 'c') {
                settings['disabled'] = 'disabled';
            }
            $('<input>', settings).appendTo(cell);
            cell.appendTo(row);
        }
        row.appendTo($('#' + matrixName));
        dimensions[matrixName].rows++;
        setMask();
    }

    function removeRow(matrixName) {
        if (dimensions[matrixName].rows <= 2) {
            return;
        }
        var row = $('tr:last-child', '#' + matrixName);
        row.remove();
        dimensions[matrixName].rows--;
    }

    function addColumn(matrixName) {
        if (dimensions[matrixName].columns >= 10) {
            return;
        }
        var rows = $('tr', '#' + matrixName);
        for (var i = 0; i < rows.length; i++) {
            var cell = $('<td/>');
            var settings = {
                type: 'text',
                'class': 'cell',
                id: matrixName + '_' + i + '_' + dimensions[matrixName].columns
            };
            if (matrixName === 'c') {
                settings['disabled'] = 'disabled';
            }
            $('<input>', settings).appendTo(cell);
            cell.appendTo(rows[i]);
        }
        dimensions[matrixName].columns++;
        setMask();
    }

    function removeColumn(matrixName) {
        if (dimensions[matrixName].columns <= 2) {
            return;
        }
        var rows = $('tr', '#' + matrixName);
        for (var i = 0; i < rows.length; i++) {
            var cell = $('td:last-child', rows[i]);
            cell.remove();
        }
        dimensions[matrixName].columns--;
    }

    $('#addRow').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        addRow(matrixName);
        if (matrixName === 'a') {
            addRow('c');
        }
    });

    $('#removeRow').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        removeRow(matrixName);
        if (matrixName === 'a') {
            removeRow('c');
        }
    });
    $('#addColumn').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        addColumn(matrixName);
        if (matrixName === 'b') {
            addColumn('c');
        }
    });

    $('#removeColumn').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        removeColumn(matrixName);
        if (matrixName === 'b') {
            removeColumn('c');
        }
    });
    $('#clearAll').click(function () {
        var cells = $('.cell');
        for (var i = 0; i < cells.length; i++) {
            $(cells[i]).val('');
        }
        setPlaceholders(cells);
    });
    $('#multiplyMatrix').click(function () {
        if (dimensions['a'].columns !== dimensions['b'].rows) {
            $('#leftPart').css('background', '#f6c1c0');
            $('#errorMsg').css('display', 'block');
            return;
        } else {
            $('#leftPart').css('background', '#bcbcbc');
            $('#errorMsg').css('display', 'none');
        }

        for (var i = 0; i < dimensions['a'].rows; i++) {
            for (var j = 0; j < dimensions['b'].columns; j++) {
                var sum = 0;
                for (var k = 0; k < dimensions['b'].rows; k++) {
                    var a_i_k = parseInt($('#a_' + i + '_' + k).val(), 10) || 0;
                    var b_k_j = parseInt($('#b_' + k + '_' + j).val(), 10) || 0;
                    sum += a_i_k * b_k_j;
                }
                $('#c_' + i + '_' + j).val(sum);
            }
        }
    });
    $('.deleteError').click(function () {
        $('#errorMsg').css('display', 'none');
        $('#leftPart').css('background', '#bcbcbc');
    })
}
