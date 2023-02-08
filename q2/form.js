$(function() {
    let startTyping = false;

    $('#ask8Ball').submit(() => {
        if(startTyping) {
            $.get('http://localhost:3000/8ball')
            .done((ans) => { $('#textfield').val(ans); })
            .fail(() => { alert('Something wrong with the server'); });
            startTyping = false;
        }
        return false;
    });

    $('#textfield').keypress(() => {
        if(!startTyping) {
            startTyping = true;
            $('#textfield').val('');
        }
    });    
});