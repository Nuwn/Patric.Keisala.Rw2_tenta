$('.js_edit-component').click(function (event) {

    var catName = $(this).data('cat');
    var compName = $(this).data('comp');



    event.preventDefault();
    $.ajax(this.href, {
        success: function (data) {
            $('#js_actionDrawer__content').html($(data));



            var notesVal = $('#' + compName + '-container').find('.compNotes').data('description');
            var bgColor = $('#' + compName + '-container').find('.component').data('color');
            var hasJs = $('#' + compName + '-container').data('hasjs');



            if(hasJs == true){
                $('.hasJs-checkbox').remove();
            }


            $('input[name=compName]').val(compName);
            $('textarea[name=compNotes]').val(notesVal);

            //console.log(hasJs);




            $(".bgColor").spectrum({
                allowEmpty: true,
                preferredFormat: "hex",
                showInput: true,
                color: bgColor
            });





            $('#edit-comp-file').submit(function (event) {

                var hasJs = $('#' + compName + '-container').data('hasjs');


                //console.log(hasJs);

                var cb = $("input#js_file");

                if (cb.is(":checked")) {
                    //console.log('create js file');
                    js_file = "true"
                } else {
                    //console.log('dont create js file');
                    js_file = "false"
                }


                var formData = {
                    'catName': catName,
                    'newName': $('input[name=compName]').val(),
                    'oldName': compName,
                    'compNotes': $('textarea[name=compNotes]').val(),
                    'bgColor': $('input[name=bgColor]').val(),
                    'js_file': js_file,
                    'hasJs': hasJs,
                    'btnValue-delete': $('.delete-txt').val()
                };


                $.ajax({
                        type: 'POST',
                        url: 'atomic-core/temp-processing/temp-edit-component.php',
                        data: formData,
                        dataType: 'json',
                        encode: true
                    })
                    .done(function (data) {
                        console.log(data);
                        if (!data.success) {
                            if (data.errors.exists) {
                                $('.aa_errorBox__message').html("");
                                $('.aa_actionDrawer').prepend('<div class="aa_errorBox"><p class="aa_errorBox__message"><i class="fa fa-times aa_js-errorBox__close"></i> ' + data.errors.exists + '</p></div>').find('.aa_errorBox').hide().fadeIn(200);
                            }


                            if (data.errors.name) {
                                $('.aa_errorBox__message').html("");
                                $('.aa_actionDrawer').prepend('<div class="aa_errorBox"><p class="aa_errorBox__message"><i class="fa fa-times aa_js-errorBox__close"></i> ' + data.errors.name + '</p></div>').find('.aa_errorBox').hide().fadeIn(200);
                            }


                        } else {
                            window.location = 'atomic-core/?cat=' + catName + '';

                        }
                    })
                    .fail(function (data) {
                        console.log(data);
                    });


                event.preventDefault();
            });













            $('#delete-comp-file').submit(function (event) {





                var formData = {
                    'catName': catName,
                    'compName': compName,
                    'hasJs': hasJs

                };







                $.ajax({
                        type: 'POST',
                        url: 'atomic-core/temp-processing/temp-delete-component.php',
                        data: formData,
                        dataType: 'json',
                        encode: true
                    })
                    .done(function (data) {
                        console.log(data);
                        if (!data.success) {
                            if (data.errors.exists) {
                                $('.aa_errorBox__message').html("");
                                $('.aa_actionDrawer').prepend('<div class="aa_errorBox"><p class="aa_errorBox__message"><i class="fa fa-times aa_js-errorBox__close"></i> ' + data.errors.exists + '</p></div>').find('.aa_errorBox').hide().fadeIn(200);
                            }


                            if (data.errors.name) {
                                $('.aa_errorBox__message').html("");
                                $('.aa_actionDrawer').prepend('<div class="aa_errorBox"><p class="aa_errorBox__message"><i class="fa fa-times aa_js-errorBox__close"></i> ' + data.errors.name + '</p></div>').find('.aa_errorBox').hide().fadeIn(200);
                            }


                        } else {
                            window.location = 'atomic-core/?cat=' + catName + '';
                        }
                    })
                    .fail(function (data) {
                        console.log(data);
                    });


                event.preventDefault();
            });

































        },
        error: function () {
            //alert('did not worked!');
        }
    })
    ;
})
;