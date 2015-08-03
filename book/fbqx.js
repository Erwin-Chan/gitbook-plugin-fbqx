require(["gitbook", "jquery"], function(gitbook, $) {

  var init = function(){

    $('.FBQbox').each(function(){
      var $fbqBox = $(this);
      var qid = $fbqBox.data('id');
      var answer = $fbqBox.data('answer');

      $fbqBox.find('.FBQmessage').removeClass('hidden').hide();

      if(Cookies.get(qid)){
        $fbqBox.find('input').each(function(i){
          $(this).val(answer[i]).prop('readonly', true);
        });
        $fbqBox.find('.FBQmessage').text('Correct.').show();
        $fbqBox.find('button').addClass('disabled').hide();
      }

      $fbqBox.find('.FBQsubmit').click(function(){

        var allCorrect = true;
        var ans = [];

        $fbqBox.find('.ans').each(function(i){
          var input = $(this).children('input').val();
          if(answer[i]==input)
            $(this).children('input').addClass('correct').removeClass('wrong').prop('readonly', true);
          else {
            $(this).children('input').addClass('wrong');
            allCorrect = false;
          }
        });

        if(allCorrect){
          Cookies.set(qid, true, 365);
          $fbqBox.find('.FBQmessage').text('Correct.').show('slow');
          $fbqBox.find('button').addClass('disabled');
        }
      });

      $fbqBox.find('.ans > input').click(function(){
        $(this).removeClass('wrong');
      });

      $fbqBox.find('.ans > input').keypress(function(){
        $(this).removeClass('wrong');
      });

    });
  }

	gitbook.events.bind("page.change", init);
});
