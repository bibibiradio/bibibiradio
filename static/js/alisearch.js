$.fn.alisearch = function() {
    $(this).autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "http://asoc.alipay.net/user/findUser/",
                dataType: "json",
                data: {
                    fuzzyStr: request.term
                },
                success: function(data) {

                    response($.map(data.content.items, function(item) {
                      
                        if(typeof item.nickNameCn == 'undefined') {

                            return {
                                label: item.lastName + '//' + item.depDesc,
                                nick: item.account,
                                value: item.lastName + '//' + item.empId

                            }
                        }
                        else {
                          
                            return {
                                label: item.lastName + '/' + item.nickNameCn + '/' + item.depDesc,
                                nick: item.account,
                                value: item.lastName + '/' + item.nickNameCn + '/' + item.empId

                            }

                        }



                    }));

                }
            });
        },
        minLength: 1,
        selectFirst: true
    });
};
