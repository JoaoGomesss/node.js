const crypto = require('crypto');

module.exports = (io) => {
  io.on('connection', (client) => {
    const session = client.handshake.session;
    const usuario = session.usuario;

    
    client.email = usuario.email;
    
    
    const onlines = Array.from(io.sockets.sockets.values());
    onlines.forEach((onlineClient) => {
      const email = onlineClient.email;
      if (email) {
        client.emit('notify-onlines', email);
        client.broadcast.emit('notify-onlines', email);
      }
    });

    client.on('send-server', (msg) => {
      const message = `<b>${usuario.nome}:</b> ${msg}<br>`;
      const sala = client.sala;

      if (sala) {
        const data = { email: usuario.email, sala: sala };
        client.broadcast.emit('new-message', data);
        io.in(sala).emit('send-client', message);
      }
    });

    
    client.on('join', (sala) => {
      if (!sala) {
        const timestamp = new Date().toString();
        sala = crypto.createHash('md5').update(timestamp).digest('hex');
      } else {
        sala = sala.replace('?', '');
      }

      client.sala = sala;
      client.join(sala);
    });

    
    client.on('disconnect', () => {
      const sala = client.sala;
      if (sala) {
        const msg = `<b>${usuario.nome}:</b> saiu.<br>`;
        client.broadcast.emit('notify-offline', usuario.email);
        io.in(sala).emit('send-client', msg);
        client.leave(sala);
      }
    });
  });
};

// module.exports = (io) =>{
//   let crypto = require('crypto')
// , md5 = crypto.createHash('md5')
// , sockets = io.sockets;
//   sockets.on('connection',  (client)=> {
//   let session = client.handshake.session
//   , usuario = session.usuario;
//   client.on('send-server',  (msg)  => {
//     let msg = "<b>"+ usuario.nome +":</b> "+ msg +"<br>";
//     client.get('sala', (erro, sala) =>  {
//     let data = {email: usuario.email, sala: sala};
//     client.broadcast.emit('new-message', data);
//     sockets.in(sala).emit('send-client', msg);
//     });
//     });
    
//   client.on('join', (sala) => {
//     if(sala) {
//     sala = sala.replace('?','');
//     } else {
//     let timestamp = new Date().toString();
//     let md5 = crypto.createHash('md5');
//     sala = md5.update(timestamp).digest('hex');
//     }
//     client.set('sala', sala);
//     client.join(sala);
//     });
//     client.on('disconnect',  () => {
//       client.get('sala', (erro, sala) => {
//       client.leave(sala);
//       });
//       });
      
  
//   });
//   }