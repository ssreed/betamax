$(function(){

    function Client() {
        var app = this;
        app.searchBox = $('input[id=searchbox]');
        app.searchForm = $('#search_form');
        app.result = $('#results');
        app.resetBtn = $('#reset');
        app.seedArray = [];
    }


    Client.prototype.init = function() {
        console.log('App initialized' + app);
        
        var server = io.connect('http://localhost:3000');
        
        app.searchBox.on('keypress', function(e) {
            if(e.which === 13) {
                //e.preventDefault();
                app.seedArray.push(app.searchBox.val());
                var msg = app.searchBox.val();
                //alert(msg);
                //var msg = { apple: "fruit" };
                $('#results').append('<li> ' + app.searchBox.val() + '</li>');
                server.emit('messages', msg);
                console.log(server);
            }
        });
    };

    var app = new Client();
    app.init();
});