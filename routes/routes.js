// var redis = require('redis'),
//     client = redis.createClient();
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Betamax' });
};

/*
 * GET about page.
 */
exports.about = function(req, res) {
  res.render('index', {title: 'About'});
};

/*
 * GET idea list page.
 */
exports.idea = function(req, res) {
    var ideas = ["stuff", "more stuff ", "final stuff"];
    res.render('idea', {title: 'New ideas list', ideas: ideas });
    // client.hgetall("Idea", function(err, arr){
    //     for(var i in arr) {
    //         var newIdea = {
    //             text: arr[i]
    //         };
    //         ideas.push(newIdea);

    //     }
    //     //console.log(arr);
    //     //console.log(ideas);
    //     res.render('idea', {title: 'New ideas list', ideas: ideas });
    // });
};

/*
 * Saves idea to redis db
 */
exports.saveIdea = function(req, res) {
    var newIdea = {};
    newIdea.name = req.body['search'];
    newIdea.id = newIdea.name.replace(/\s/g, '-');
    client.hset("Idea", newIdea.id, newIdea.name);
    res.redirect('back');
};