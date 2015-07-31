require(["gitbook", "jquery"], function(gitbook, $) {

  var init = function(){

    $('.FBQbox').each(function(){
      var $fbqBox = $(this);
      var qid = $fbqBox.data('id');
      var answer = $fbqBox.data('answer');

      var success = function(){
        $fbqBox.find('button').addClass('disabled');
        $fbqBox.append('<br><p class="alert alert-default">Correct.</p>');
        $fbqBox.children('.alert').hide().show();
      }

      if(Cookies.get(qid)){
        $fbqBox.find('input').each(function(i){
          $(this).val(answer[i]).prop('readonly', true);
        });
        success($fbqBox);
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
          success($fbqBox);
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
