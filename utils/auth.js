const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

const isMalcolm = (req, res, next) => {
    if(req.session.user_id == 10) {
        next();
    } else {
        res.redirect('/');
    }
} 

module.exports = isMalcolm;