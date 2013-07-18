
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
        server.on('messages', function(data){
            app.result.append('<li> ' + data + '</li>');
            // when using a data base, you may consider pulling from the data base rather than just loading it.
            // Or just load it, since it will be up to date when you get the message, 
            // and then you will load from the data base when the page refreshes
        });

        app.searchBox.on('keypress', function(e) {
            if(e.which === 13) {
                e.preventDefault();
                app.seedArray.push(app.searchBox.val());
                var msg = app.searchBox.val();
                //alert(msg);
                //var msg = { apple: "fruit" };

                // in this version appending to our list happnes in the messages listener above.
                //$('#results').append('<li> ' + app.searchBox.val() + '</li>');
                server.emit('messages', msg);
                console.log(server);
            }
        });
    };

    var app = new Client();
    app.init();
});