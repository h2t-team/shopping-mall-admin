$("form").submit(function() {
    if($(".search").val() == "") {
            $(".search").remove();
    }
});