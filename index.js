module.exports = {

    // Extend ebook resources and html
    website: {
        assets: "./book",
        css: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css",
            "fbqx.css"
        ],
        js: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js",
            "https://parse.com/downloads/javascript/parse-1.4.2.min.js",
            "fbqx.js",
            "js.cookie.js"
        ]
    },

    // Extend templating blocks
    blocks: {
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        fbq: {
            process: function(blk) {

                var qid = blk.kwargs.id;
                var para = blk.body;
                var substr = para.split("$$");
                var ans = [];

                for(var i = 1; i<substr.length; i++){
                    ans.push(substr[i].split("##", 1));
                    var str = '$$' + ans[i-1].toString() + '##';
                    para = para.replace(str, "<div class='ans'><input type='text' class='form-control input-sm'/></div>");
                }

                return "<blockquote class='para' data-id='"+qid+"' data-answer='" + JSON.stringify(ans)+ "'>" + para + "<br><button class='btn btn-default btn-sm but'>Submit</button></blockquote>";
            }
        }
    }
};
