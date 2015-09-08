var checksum = require('checksum');

module.exports = {

	website: {
		assets: "./book",
		css: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
			"fbqx.css"
		],
		js: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
			"fbqx.js",
			"js.cookie.js"
		]
	},

	blocks: {
		fbq: {
			process: function(blk) {

				var para = blk.body.trim();
				var reInput = /\$\$.*?##/ig; 	//$$(anything)##
				var reGp = /\(gp([0-9]*)\)/i; 	//(gp(number))
				var getStr = /\$\$(.*?)##/;
				var answer = {
								0:[] //0: defualt
							};
				var index = 0;
				var arr_input = para.match(reInput);

				for(var i=0; i<arr_input.length; i++){
					if(reGp.test(arr_input[i])){
						index = arr_input[i].match(reGp)[1];  //get the string inside (gp and )
						if(answer[index] == undefined)
							answer[index] = [];
						answer[index].push(arr_input[i].replace(reGp, '').match(getStr)[1]);
					}
					else{
						index = 0;
						answer[0].push(arr_input[i].match(getStr)[1]);
					}
					para = (this.generator === 'website')?
						para = para.replace(arr_input[i], "<div class='ans'><input type='text' name='"+ index +"' class='form-control input-sm'/></div>"):
						para.replace(str, "______");
				}

/*				var ans = [];
				//var ansGp = [];
				var count = 1;
				var ansgp = {}

				para = para.split('\n').join('<br>');

				for(var i = 1; i<substr.length; i++){

					if(substr[i].indexOf('(gp'+count+')')>-1){
						var temp = [];
						for(var j = i; j<substr.length; j++){
							if(substr[j].indexOf('(gp'+count+')')>-1){
								var tempans = substr[j].replace('(gp'+count+')', '').split("##", 1).toString();
								temp.push(tempans);
								var str = '$$(gp'+count+')'+tempans+'##';
								para = (this.generator === 'website')?
									para = para.replace(str, "<div class='ans'><input type='text' name='"+ count +"' class='form-control input-sm'/></div>"):
									para.replace(str, "______");
								substr[j] = substr[j].replace(substr[j], 'DontReadMe');
							}
						}
						//ansGp.push(temp);
						ansgp[count]=temp;
						count++;
					}

					else if(substr[i]!='DontReadMe'){
						var tempans = substr[i].split("##", 1).toString();
						ans.push(tempans);
						var str = '$$'+tempans+'##';

						para = (this.generator === 'website')?
							para = para.replace(str, "<div class='ans'><input type='text' name='default' class='form-control input-sm'/></div>"):
							para.replace(str, "______");
					}

				}
*/

        return (this.generator === 'website')?
				"<div class='fbqx'><div class='FBQbox gitQuestion' data-id='"+checksum(blk.body)+"' data-answer='" + JSON.stringify(answer) + "'>" + para + "<br><button class='btn btn-default btn-sm FBQsubmit'>Submit</button><br><p class='alert alert-default FBQmessage'>Correct.</p></div></div>":
				"<blockquote>"+ para +"<br/><small>ans: "+ans.join(',')+"</small></blockquote>";
			}
		}
	}
};
