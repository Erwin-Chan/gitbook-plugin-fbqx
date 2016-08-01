var checksum = require('checksum');

module.exports = {

	website: {
		assets: "./book",
		css: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
			"fbqx.css"
		],
		js: [
			"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
			"fbqx.js"
		]
	},

	blocks: {
		fbq: {
			process: function (blk) {

				var self = this;
				var para = blk.body.trim();

				return this.book.renderBlock('markdown', para)
					.then(function (para) {
						return new Promise(function (resolve, reject) {
							var substr = para.split("$$");
							var ans = [];

							para = para.split('\n').join('<br>');
							for (var i = 1; i < substr.length; i++) {
								ans.push(substr[i].split('##', 1));
								var str = '$$' + ans[i - 1].toString() + '##';

								para = (self.output.name === 'website') ?
									para.replace(str, "<div class='ans'><input type='text' class='form-control input-sm'/></div>") :
									para.replace(str, "______");
							}

							var result = (self.output.name === 'website') ?
								"<div class='fbqx'><div class='FBQbox gitQuestion' data-id='" + checksum(blk.body) + "' data-answer='" + JSON.stringify(ans) + "'>" + para + "<br><button class='btn btn-default btn-sm FBQsubmit'>Submit</button><br><p class='alert alert-default FBQmessage'>Correct.</p></div></div>" :
								"<blockquote>" + para + "<br/><small style='font-size: 8px;'>ans: " + ans.join(',') + "</small></blockquote>";

							resolve(result);
						});
					});
			}
		}
	}
};
