module.exports = function(app, userModel, startupModel) {
  app.post("/api/project/login", login);
  app.get("/api/project/loggedin", loggedin);
  app.post("/api/project/logout", logout);
  app.post("/api/project/user", createUser);
  app.get("/api/project/profile/:userId", profile);

    function login(req,  res) {
        var credentials = req.body;
        console.log("In server/services/userService: credentials=" + credentials);
        var user = userModel.findUserByCredentialsReal(credentials);
        //res.send(200);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        console.log("Session destroyed!!");
        res.send(200);
    }

    function createUser(req, res) {
        var newUser = userModel.createUser(req.body);
        //Important
        req.session.currentUser = newUser;
        res.json(newUser);
    }

    function profile(req, res) {
        console.log("profile function");
        var userId = req.params.userId;
        console.log("In server user service: " + userId);
        var user = userModel.findUserByIdP(userId);
        console.log("Th user username: " + user.username);
        console.log(user);
        var startupIds = user.follows;
        var startups = startupModel.findStartupsByStartupIds(startupIds);
        user.followsStartups = startups;
        res.json(user);
    }
};