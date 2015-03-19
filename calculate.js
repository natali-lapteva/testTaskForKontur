function onReady() {
    var dimensions = {
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
            $('<input>', {
                type: 'text',
                class: 'cell',
                id: matrixName + '_' + dimensions[matrixName].rows + '_' + i
            }).appendTo(cell);
            cell.appendTo(row);
        }
        row.appendTo($('#' + matrixName));
        dimensions[matrixName].rows++;
    }

    function removeRow(matrixName) {
        if (dimensions[matrixName].rows <= 1) {
            return;
        }
        var rows = $('tr', '#' + matrixName);
        rows[rows.length - 1].remove();
        dimensions[matrixName].rows--;
    }

    function addColumn(matrixName) {
        if (dimensions[matrixName].columns >= 10) {
            return;
        }
        var rows = $('tr', '#' + matrixName);
        for (var i = 0; i < rows.length; i++) {
            var cell = $('<td/>');
            $('<input>', {
                type: 'text',
                class: 'cell',
                id: matrixName + '_' + i + '_' + dimensions[matrixName].columns
            }).appendTo(cell);
            cell.appendTo(rows[i]);
        }
        dimensions[matrixName].columns++;
    }

    function removeColumn(matrixName) {
        if (dimensions[matrixName].columns <= 1) {
            return;
        }
        var rows = $('tr', '#' + matrixName);
        for (var i = 0; i < rows.length; i++) {
            var cells = $('td', rows[i]);
            cells[cells.length - 1].remove();
        }
        dimensions[matrixName].columns--;
    }

    $('#addRow').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        addRow(matrixName);
    });

    $('#removeRow').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        removeRow(matrixName);
    });
    $('#addColumn').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        addColumn(matrixName);
    });

    $('#removeColumn').click(function () {
        var matrixName = $('input[name=matrix]:checked', '#radioBox').val();
        removeColumn(matrixName);
    });
    $('#clearAll').click(function () {
        var cells = $('.cell');
        for (var i = 0; i < cells.length; i++) {
            $(cells[i]).val('');
        }
    });
    $('#multiplyMatrix').click(function () {
        if (dimensions['a'].columns !== dimensions['b'].rows) {
            $('#leftPart').css('background', '#f6c1c0');
            $('#errorMsg').css('display', 'block');
        } else {
            $('#leftPart').css('background', '#bcbcbc');
            $('#errorMsg').css('display', 'none');
        }

        while (dimensions['c'].rows < dimensions['a'].rows) {
            addRow('c');
        }
        while (dimensions['c'].rows > dimensions['a'].rows) {
            removeRow('c');
        }
        while (dimensions['c'].columns < dimensions['b'].columns) {
            addColumn('c');
        }
        while (dimensions['c'].columns > dimensions['b'].columns) {
            removeColumn('c');
        }

        for (var i = 0; i < dimensions['a'].rows; i++) {
            for (var j = 0; j < dimensions['b'].columns; j++) {
                var sum = 0;
                for (var k = 0; k < dimensions['b'].rows; k++) {
                    var a_i_k = parseInt($('#a_' + i + '_' + k).val(), 10);
                    var b_k_j = parseInt($('#b_' + k + '_' + j).val(), 10);
                    sum += a_i_k * b_k_j;
                }
                $('#c_' + i + '_' + j).val(sum);
            }
        }
    });

}
