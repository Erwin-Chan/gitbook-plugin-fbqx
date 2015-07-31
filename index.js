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

				var para = blk.body;
				var substr = para.split("$$");
				var ans = [];

				for(var i = 1; i<substr.length; i++){
					ans.push(substr[i].split("##", 1));
					var str = '$$'+ans[i-1].toString()+'##';

					para = (this.generator === 'website')?
						para.replace(str, "<div class='ans'><input type='text' class='form-control input-sm'/></div>"):
						para.replace(str, "______");
				}

        return (this.generator === 'website')?
					"<blockquote class='FBQbox' data-id='"+checksum(blk.body)+"' data-answer='" + JSON.stringify(ans)+ "'>" + para + "<br><button class='btn btn-default btn-sm FBQsubmit'>Submit</button></blockquote>":
					"<blockquote>"+ para +"<br/><small>ans: "+ans.join(',')+"</small></blockquote>";
			}
		}
	}
};
