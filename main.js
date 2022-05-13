function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#img-container').attr('src', e.target.result);
            $('#base64-string').val(
                e.target.result.replace('data:image/png;base64,', '')
                .replace('data:image/jpg;base64,', '')
                .replace('data:image/jpeg;base64,', ''));
            $('#base64-string-origin').val(
                e.target.result.replace('data:image/png;base64,', '')
                .replace('data:image/jpg;base64,', '')
                .replace('data:image/jpeg;base64,', ''));
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function updateImg() {
    var base64Img = $('#img-container').attr('src')
        .replace('data:image/png;base64,', '')
        .replace('data:image/jpg;base64,', '')
        .replace('data:image/jpeg;base64,', '');
    $('#base64-string').val(base64Img);
}

function negative() {
    var base64Img = $('#base64-string').val();

    var dataReq = {
        "base64Img": base64Img
    }

    $.ajax({
        url: 'http://localhost:5000/negative',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(dataReq),
        // dataType: 'json',
        success: function(result) {
            console.log(result);
            $('#img-container').attr('src', 'data:image/png;base64,' + result);
        },
        error: function(error) {
            console.log(result);
        }
    });

    updateImg();
}

function logTransformation() {
    var base64Img = $('#base64-string-origin').val();
    var c_log = parseInt($('#log-transformation-c').val());

    var dataReq = {
        "base64Img": base64Img,
        "c": c_log
    }

    $.ajax({
        url: 'http://localhost:5000/log-transformation',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(dataReq),
        // dataType: 'json',
        success: function(result) {
            console.log(result);
            $('#img-container').attr('src', 'data:image/png;base64,' + result);
        },
        error: function(error) {
            console.log(result);
        }
    });

    updateImg();
}

function gaussian(type) {
    if (type == 'smoothing') {
        var kernel = $('#smoothing-gaussian-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        var base64Img = $('#base64-string').val();
        var threshold = $('#smoothing-gaussian-threshold').val();

        var dataReq = {
            "kernel": parseInt(kernel),
            "base64Img": base64Img,
            "threshold": parseInt(threshold)
        }

        $.ajax({
            url: 'http://localhost:5000/smoothing/gaussian',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(dataReq),
            // dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#img-container').attr('src', 'data:image/png;base64,' + result);
            },
            error: function(error) {
                console.log(result);
            }
        });
    } else if (type == 'sharpening') {
        var kernel = $('#sharpening-gaussian-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        var base64Img = $('#base64-string').val();
        var threshold = $('#sharpening-gaussian-threshold').val();

        var dataReq = {
            "kernel": parseInt(kernel),
            "base64Img": base64Img,
            "threshold": parseInt(threshold)
        }

        $.ajax({
            url: 'http://localhost:5000/sharpening/gaussian',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(dataReq),
            // dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#img-container').attr('src', 'data:image/png;base64,' + result);
            },
            error: function(error) {
                console.log(result);
            }
        });
    }


    updateImg();
}

function median(type) {
    if (type == 'smoothing') {
        var kernel = $('#smoothing-median-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        var base64Img = $('#base64-string').val();

        var dataReq = {
            "kernel": parseInt(kernel),
            "base64Img": base64Img
        }

        $.ajax({
            url: 'http://localhost:5000/smoothing/median',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(dataReq),
            // dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#img-container').attr('src', 'data:image/png;base64,' + result);
            },
            error: function(error) {
                console.log(result);
            }
        });
    } else if (type == 'sharpening') {
        var kernel = $('#sharpening-median-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        var base64Img = $('#base64-string').val();

        var dataReq = {
            "kernel": parseInt(kernel),
            "base64Img": base64Img
        }

        $.ajax({
            url: 'http://localhost:5000/sharpening/median',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(dataReq),
            // dataType: 'json',
            success: function(result) {
                console.log(result);
                $('#img-container').attr('src', 'data:image/png;base64,' + result);
            },
            error: function(error) {
                console.log(result);
            }
        });
    }

    updateImg();
}

function sharpening() {
    var kernel = $('#sharpening-kernel').val();
    if (kernel % 2 == 0)
        kernel++;
    var base64Img = $('#base64-string').val();
    var threshold = $('#sharpening-threshold').val();

    var dataReq = {
        "kernel": parseInt(kernel),
        "base64Img": base64Img,
        "threshold": parseInt(threshold)
    }

    $.ajax({
        url: 'http://localhost:5000/sharpening',
        type: 'POST',
        async: false,
        contentType: 'application/json',
        data: JSON.stringify(dataReq),
        // dataType: 'json',
        success: function(result) {
            console.log(result);
            $('#img-container').attr('src', 'data:image/png;base64,' + result);
        },
        error: function(error) {
            console.log(result);
        }
    });

    updateImg();
}

function showGaussianKernelValue(type) {
    if (type == 'smoothing') {
        var kernel = $('#smoothing-gaussian-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        $('.smoothing-gaussian-kernel-label')[0].innerHTML = kernel;
    } else if (type == 'sharpening') {
        var kernel = $('#sharpening-gaussian-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        $('.sharpening-gaussian-kernel-label')[0].innerHTML = kernel;
    }

}

function showMedianKernelValue(type) {
    if (type == 'smoothing') {
        var kernel = $('#smoothing-median-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        $('.smoothing-median-kernel-label')[0].innerHTML = kernel;
    } else if (type == 'sharpening') {
        var kernel = $('#sharpening-median-kernel').val();
        if (kernel % 2 == 0)
            kernel++;
        $('.sharpening-median-kernel-label')[0].innerHTML = kernel;
    }

}

function showLogTransformationCValue() {
    var c = $('#log-transformation-c').val();
    $('.log-transformation-c-label')[0].innerHTML = c;

}

function origin() {
    $('#img-container').attr('src', 'data:image/png;base64,' + $('#base64-string-origin').val());
    $('#base64-string').val($('#base64-string-origin').val());
}