var EmailingController =
{
  sendMails: function(req, res) {
    var body = req.param('body');
    var contacts=req.param('contacts');
    // var contacts = JSON.decode(req.param('contacts'));
    console.log(contacts);
    EmailingController.testSend(contacts, body, function(){
      console.log('tout fini');
      res.send('ok');
    });
  },

  testSend: function(contacts, text, cb){

    var send = require('gmail-send')({
      user: 'timothyleroch@gmail.com',
      pass: '#Google142857',
      to:   'timothyleroch@gmail.com',
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
      console.log('success mail');
      console.log(cb);
      cb();
    });
  },

  sendMailPage: function(req, res) {
    Contact.find({
      limit: 10,
      sort: 'name'
    }).exec(function(err, contacts){
      if(err)console.log(err);
      res.view('pages/dashboard/sendMail', {contacts: contacts});
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
