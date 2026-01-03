

const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


module.exports.signup = async (req, res, next) => {
    try {
        // ... registration logic
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); // 'return' stops the function here
            }
            req.flash("success", "Welcome to Wanderlust");
            return res.redirect("/listings"); // 'return' ensures no other response is sent
        });
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup"); 
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};
