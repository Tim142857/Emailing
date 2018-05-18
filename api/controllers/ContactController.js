/**
* ContactController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

var ContactController = {

  getContacts: function(req, res) {
    var type= req.param("type");
    console.log(type);
    Contact.find({
      where: {
        typeContact: type,
        email: { '!=': '' }
      },
      limit: 5000
    }).exec(function(err, contacts) {
      if(err)console.log(err);
      res.send({contacts})
    })
  },
  addNewContacts: function(req, res){
    console.log('ici');
    var contactsToadd=[
      {
        email: 'gladyspoupin@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'rcom@alexandre-sa.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'richard.ducros86@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'agritp@bbox,fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'raoul-lecaer@orange,fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'rcom@alexandre-sa.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'gerardpayen.26@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'fayet.chantal@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'guicherd.ta.tp@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'cathala.travaux@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'bertrand35@hotmail,fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'gildas-odic@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'marlene.berges@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'cathala.travaux@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'jerome.albouy77@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'matthieuberthet@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'regisdelmas81990@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'thuriaud.sarl@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'f.poirier@dubourg.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'sarlbouvardfreres@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'apv.redon@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'francis.avignon@wanadoo.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'daniel.chantal.redoules@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'patrice.barre@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'duveau.francois@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'gilles.mathivet@club-internet.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'montespannaise@terre.net.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'gaecdeslandes@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'aubrycedri35@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'tropee.sarl@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 't.a.cartillier@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'anne-marie.maraval@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'leo.pyraud@hotmail.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'eatp31@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'tormo.angelique@club-internet.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'earl.carat@orange.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'jonath-38@hotmail.fr',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'joel.robert.eta@orange.fr',
        typeContact: 'COUPE REPLIABLE'


      },
      {
        email: 'pagessebastien@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'satptransport35@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      },
      {
        email: 'michel.thuriaud@gmail.com',
        typeContact: 'COUPE REPLIABLE'
      }
    ]

    Contact.createEach(contactsToadd).exec(function(err, newContacts){
      if(err) console.log(err);
      res.send('ok');
      // res.view('pages/dashboard/sendMail', { contacts: newContacts })
    })
  }
}

module.exports = ContactController
