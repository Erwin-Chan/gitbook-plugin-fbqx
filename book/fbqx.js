require(["gitbook"], function(gitbook) {
	gitbook.events.bind("page.change", function() {
		var success = function($this){
			$this.find('button').addClass('disabled');
			$this.append('<br><p class="alert alert-default">Correct.</p>');
			$this.children('.alert').hide().show('slow');
		}

		$('.FBQbox').each(function(){
			var qid = $(this).data('id');

			if(Cookies.get(qid)){
				var answer = $(this).data('answer');
				$(this).find('input').each(function(i){
					$(this).val(answer[i]);
					$(this).prop('readonly', true);
				});

				success($(this));
			}
		});

		$('.FBQsubmit').click(function(){

			var answer = $(this).parent('.FBQbox').data('answer');
			var allCorrect = true;

			$(this).siblings('.ans').each(function(i){
				var input = $(this).children('input').val();
				if(answer[i]==input)
					$(this).children('input').addClass('correct').removeClass('wrong').prop('readonly', true);
				else {
					$(this).children('input').addClass('wrong');
					allCorrect = false;
				}
			});

			var qid = $(this).parent('.FBQbox').data('id');

			if(allCorrect){
				Cookies.set(qid, true, 365);
				success($(this).parent('.FBQbox'));
			}
		});

		$('.ans > input').click(function(){
			$(this).removeClass('add');
		});

		$('.ans > input').keypress(function(){
			$(this).removeClass('add');
		});

	});
});
