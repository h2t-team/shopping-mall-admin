const search = e => {
    e.preventDefault();
    const keyword = $('input[name="user-search"]').val();
    $.ajax({
        contentType: "application/json",
        url: '/users',
        type: 'GET', 
        data: {
            keyword: keyword
        }, 
        success: data => {
            console.log(data);
        },
        error: err => {
            const msg = err.responseJSON.message;
            console.log(msg);
        }
    })
}

$('#search-btn').click(search);
$('input[name="user-search"]').keypress(e => {
    if (e.keyCode === 13) search(e);
});