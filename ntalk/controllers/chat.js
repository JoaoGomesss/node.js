module.exports = (app) => {
    let ChatController = {
    index: function(req, res){
    let params = {email: req.params.email};
    res.render('chat/index', params);
    }
    };
    return ChatController;
    };
    