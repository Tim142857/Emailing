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
}

module.exports = ContactController
