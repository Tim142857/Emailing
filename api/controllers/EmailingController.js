var EmailingController =
{
  sendMails: function(req, res) {
    var body = req.param('mail-body');
    var contacts=JSON.parse(req.param('contacts'));
    console.log(contacts);
    if(contacts.length > 100){
      res.send('Ceci est une version bêta non fonctionnelle. Vous ne pouvez pas envoyer a plus de 100 destinataires simultanément. Cliquez <a href="/sendMail">ici</a> pour revenir à la page précédente');
    }else{
      var time = 0;
      var stepTime = 86400000;
      contacts = EmailingController.divideContacts(contacts, 500);
      var message = "Mail bien envoyé!";
      var type="success";
      contacts.forEach(function(contact, index){
        setTimeout(function(){
          console.log('Envoi!')
          EmailingController.testSend(contact, body, function(err){
            if(err){
              message = err;
              type="failure";
            }
          })
        },time);
        time += stepTime;
      });
      res.view('pages/dashboard/sendMail', {contacts: [], me: req.me, info: {message, type}});
    }
  },
  testSendMails: function(req, res){
    var body = "Test de l'envoi de mail en prod";
    contacts=['timothyleroch@gmail.com','timothyleroch@gmail.com', 'timothyleroch@gmail.com', 'timothyleroch@gmail.com','timothyleroch@gmail.com','timothyleroch@gmail.com', 'timothyleroch@gmail.com', 'timothyleroch@gmail.com'];
    var stepTime = 300000;
    contacts = EmailingController.divideContacts(contacts, 2);
    var message = "Mail bien envoyé!";
    var type="success";
    contacts.forEach(function(contact, index){
      setTimeout(function(){
        console.log('Envoi!')
        EmailingController.testSend(contact, body, function(err){
          if(err){
            message = err;
            type="failure";
          }
        })
      },stepTime);
      stepTime += stepTime;
    });
    res.view('pages/dashboard/sendMail', {contacts: [], me: req.me, info: {message, type}});
  },

  divideContacts: function(contacts, limit){
    var arr = [];
    do{
      arr.push(contacts.splice(0,limit-1));
      if(contacts.length < limit){
        arr.push(contacts);
        contacts = [];
        return arr;
      }
    }while(contacts.length !== 0)
  },

  testSend: function(contacts, text, cb){

    var send = require('gmail-send')({
      // user: 'timothyleroch@gmail.com',
      // pass: '#Google142857',
      // to:   'timothyleroch@gmail.com',
      user: 'paul@leroch-distribution.fr',
      pass: 'leroch1793',
      to:   'paul@leroch-distribution.fr',
      subject: 'test final',
      text:    'gmail-send example 1',
    });

    send({ // Overriding default parameters
      bcc: contacts,
      subject: 'test final',         // Override value set as default
      text: text
      // html: '<html></html>'
      // files: [ filepath ],
    }, function (err, res) {
      cb(err);
    });
  },

  sendMailPage: function(req, res) {
    Contact.find({
      where: {
        email: { '!=': '' },
        typeContact: "ETA"
      },
      sort: 'name'
    }).exec(function(err, contacts){
      if(err)console.log(err);
      res.view('pages/dashboard/sendMail', {contacts: [], info: null});
    })
  },

  loadContacts: async function(req, res) {
    var fs = require('fs');
    const parse = require('csv-parse')


    Contact.destroy({}).exec(function(err, records){
      if(err) console.log(err);
      Contact.find().exec(function(err, noContacts){
        if(err) console.log(err);
        console.log(noContacts);
      });
      var contacts = [];
      fs.readFile('eta.csv','utf-8', (err, content) => {
        if(err) res.serverError(err);
        var items=content.split("\n");
        items.shift();
        var index=0;
        items.forEach(function(item){
          index++;
          var contact = {};
          contact.denomination = item.split(";")[3];
          contact.name=item.split(";")[4];
          contact.firstName=item.split(";")[5];
          contact.zipCode=item.split(";")[10];
          contact.email=item.split(";")[16];
          contact.typeContact="ETA";
          contacts.push(contact);
          if(index==items.length){
            // Contact.createEach(contacts).exec(function(err, records){
            if(err)console.log(err);
            console.log('1er fichier fini');

            fs.readFile('concess.csv','utf-8', (err2, content2) => {
              if(err2) res.serverError(err2);
              var items2=content2.split("\n");
              items2.shift();
              var index2=0;
              items2.forEach(function(item2){
                index2++;
                var contact2 = {};
                var data = item2.split(";");
                contact2.denomination = data[4];
                contact2.name=data[5];
                contact2.firstName=data[6];
                contact2.zipCode=data[11];
                contact2.email=data[16];
                contact2.typeContact="CONCESSION";
                // console.log(contact2)
                // console.log('----------------------------------------------------------');
                contacts.push(contact2);
                if(index2==items2.length){
                  console.log('sauvegarde contacts');
                  Contact.createEach(contacts).exec(function(err, newContacts){
                    if(err) console.log(err);
                    res.view('pages/dashboard/sendMail', { contacts: newContacts })
                  })
                }
              })
            })
            // })
          }
        })
      })
    });

  }
}

module.exports= EmailingController;
