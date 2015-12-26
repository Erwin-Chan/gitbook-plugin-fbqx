require(["gitbook", "jquery"], function(gitbook, $) {

    var init = function() {

        if(!$('.toolbar-delete').length)
            gitbook.toolbar.createButton({
                position: 'left',
                icon: 'fa fa-history',
                className: 'toolbar-delete',
                onClick: function() {
                    $('.gitQuestion').each(function() {
                        Cookies.remove($(this).data('id'));
                    });
                    $(this).prepend('<p class="historyMessage">History cleared. Refreshing ...</p>');
                    $('.historyMessage').hide().fadeIn('slow').delay(2000).fadeOut('slow').delay(1).queue(function() {
                        $(this).remove();
                        location.reload();
                    });
                }
            });

        $('.fbqx').each(function() {
            var $fbqBox = $(this).children('.FBQbox');
            var qid = $fbqBox.data('id');
            var answer = $fbqBox.data('answer');
            var ansgp = $fbqBox.data('ansgp');
            var count = $fbqBox.data('count');

            console.log(ansgp[0]);

            $fbqBox.find('.FBQmessage').hide();

            if (Cookies.get(qid)) {
                $fbqBox.find('input').each(function(i) {
                    $(this).val(answer[i]).prop('readonly', true);
                });
                $fbqBox.find('button').addClass('disabled');
                $fbqBox.find('.FBQmessage').show();
            }

            $fbqBox.find('.FBQsubmit').click(function() {
                var allCorrect = true;

                j = 0;
                $fbqBox.find('.ans').each(function() {

                    var gp = $(this).children('input').attr('name');

                    if (gp == 'default') {
                        var input = $(this).children('input').val();
                        if (answer[j] == input)
                            $(this).children('input').addClass('correct').removeClass('wrong').prop('readonly', true);
                        else {
                            $(this).children('input').addClass('wrong');
                            allCorrect = false;
                        }
                        j++;
                    } else {
                        gp = parseInt(gp, 10);
                        //console.log(gp);
                        //console.log(ansgp[gp]);
                        var input = $(this).children('input').val();
                        var wrong = true;
                        for (var i = 0; i < ansgp[gp].length; i++) {
                            if (ansgp[gp][i] == input) {
                                $(this).children('input').addClass('correct').removeClass('wrong').prop('readonly', true);
                                ansgp[gp].splice(i, 1);
                                wrong = false;
                            }
                        }
                        if (wrong) {
                            $(this).children('input').addClass('wrong');
                            allCorrect = false;

                        }

                    }

                });

                if (allCorrect) {
                    Cookies.set(qid, true, {
                        expires: 365
                    });
                    $fbqBox.find('button').addClass('disabled');
                    $fbqBox.find('.FBQmessage').show('slow');
                }
            });

            $fbqBox.find('.ans > input').click(function() {
                $(this).removeClass('wrong');
            });

            $fbqBox.find('.ans > input').keypress(function() {
                $(this).removeClass('wrong');
            });

        });
    }

    gitbook.events.bind("page.change", init);
});
