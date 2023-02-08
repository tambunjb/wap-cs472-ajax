$(function() {
    $('#addToCart').submit(() => {
        $.post('http://localhost:3000/addToCart', { id: $('#id').val()})
        .done(numOfItems => { $('#numOfItems').text(numOfItems); } )
        .fail(() => { alert('Something wrong with the server'); });
        
        return false;
    });
});