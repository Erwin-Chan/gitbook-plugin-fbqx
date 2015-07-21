var fitb = function() {

	var success = function($this, msg){
		$this.find('button').addClass('disabled');
		$this.append('<br><p class="alert alert-default">'+msg+'</p>');
		$this.children('.alert').hide().show('slow');
	}

	$('.para').each(function(){
		var qid = $(this).data('id');
		if(Cookies.get(qid)){

			var answer = $(this).data('answer'); 
			$(this).find('input').each(function(i){
				$(this).val(answer[i]);
				$(this).prop('readonly', true);
			});

			success($(this),'You had already answered this question.');
		}	
	});

	$('.but').click(function(){

		var answer = $(this).parent('.para').data('answer'); 
		var all_corret = 1;

		$(this).siblings('.ans').each(function(i){
			var input = $(this).children('input').val();
			if(answer[i]==input)
				$(this).children('input').addClass('correct').removeClass('add').prop("readonly", true);
			else {
				$(this).children('input').addClass('add');
				all_corret = 0;
			}
		});
		
		var qid = $(this).parent('.para').data('id');

		if(all_corret){
			Cookies.set(qid, true);
			success($(this).parents('.para'),'Correct!');
		}
	});

	$('.ans > input').click(function(){
		$(this).removeClass('add');
	});
	$('.ans > input').keypress(function(){
		$(this).removeClass('add');
	});
}



require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        fitb();
    });

});