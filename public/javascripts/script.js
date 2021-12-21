$("form").submit(function() {
    if($(".search").val() == "") {
            $(".search").attr('disabled', true);
    }
});