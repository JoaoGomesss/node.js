module.exports = (app) => {
    let ContatoController = {
    index: (req, res) => {
    let usuario = req.session.usuario
    , contatos = usuario.contatos
    , params = {usuario: usuario, contatos: contatos};
    res.render('contatos/index', params);
    },
    create: (req, res) => {
        let contato = req.body.contato
        , usuario = req.session.usuario;
        usuario.contatos.push(contato);
        res.redirect('/contatos');
    },
    show: (req, res) => {
        let id = req.params.id
        , contato = req.session.usuario.contatos[id]
        , params = {contato: contato, id: id};
        res.render('contatos/show', params);
    },
    edit: (req, res)  => {
        let id = req.params.id
        , usuario = req.session.usuario
        , contato = usuario.contatos[id]
        , params = {usuario: usuario
        , contato: contato
        , id: id};
        res.render('contatos/edit', params);
    },
    update: (req, res)  => {
        let contato = req.body.contato
        , usuario = req.session.usuario;
        usuario.contatos[req.params.id] = contato;
        res.redirect('/contatos');
    },   
    destroy: (req, res) =>  {
        let usuario = req.session.usuario
        , id = req.params.id;
        usuario.contatos.splice(id, 1);
        res.redirect('/contatos');
        }   
    }
    return ContatoController;
    };