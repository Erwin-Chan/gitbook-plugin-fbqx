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
                if(this.generator === 'website'){

                    var para = blk.body;
                    var substr = para.split("$$");
                    var ans = [];

                    for(var i = 1; i<substr.length; i++){
                        ans.push(substr[i].split("##", 1));
                        var str = '$$' + ans[i-1].toString() + '##';
                        para = para.replace(str, "<div class='ans'><input type='text' class='form-control input-sm'/></div>");
                    }

				    return "<blockquote class='FBQbox' data-id='"+checksum(blk.body)+"' data-answer='" + JSON.stringify(ans)+ "'>" + para + "<br><button class='btn btn-default btn-sm FBQsubmit'>Submit</button></blockquote>";
                } 
                else {

                    var para = blk.body;
                    var substr = para.split("$$");
                    var ans = [];

                    for(var i = 1; i<substr.length; i++){
                        ans.push(substr[i].split("##", 1));
                        var str = '$$' + ans[i-1].toString() + '##';
                        para = para.replace(str, "______");
                    }

                    var ansString = ans.join(',');

                    return "<blockquote>"+ para +"<br>ans: "+ansString+"</blockquote>";
                }
			}
		}
	}
};
