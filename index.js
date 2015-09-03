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
				var substr = para.split("$$");
				var ans = [];
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

        return (this.generator === 'website')?
				"<div class='fbqx'><div class='FBQbox gitQuestion' data-id='"+checksum(blk.body)+"' data-answer='" + JSON.stringify(ans)+ "' data-ansgp='" + JSON.stringify(ansgp)+ "' data-count='"+ count +"'>" + para + "<br><button class='btn btn-default btn-sm FBQsubmit'>Submit</button><br><p class='alert alert-default FBQmessage'>Correct.</p></div></div>":
				"<blockquote>"+ para +"<br/><small>ans: "+ans.join(',')+"</small></blockquote>";
			}
		}
	}
};
