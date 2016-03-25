/**
 * Created by naineel on 3/24/16.
 */
module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        //var movieImdbIDs = user.likes;
        //var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        //user.likesMovies = movies;
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        console.log("In server services/user.service.server.js/login");
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}