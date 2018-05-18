$(document).ready(function(){

  var to = ['timothyleroch@gmail.com', 'df6680dd@emailna.co', 'titi2@gmail.com','255624ec@emailna.co', '0xqva@vmani.com','titi4@gmail.com','2kcri@vmani.com','df6680dd@emailna.co','dzez@yopmail.com'];
  // contacts alrdy defined in sendMail.ejs
  var contacts = [];

  $('#btn-submit').on('click', function(e){
    e.preventDefault();
    var to = [];
    $('.email').each(function(index, elm){
      to.push($(elm).text());
    })
    $("#input-contacts").val(JSON.stringify(to));
    $('#mail-form').submit();
  })

  $('#clear-list').on('click', function(){
    contacts = [];
    changeContactsListState('loading');
    updateContacts(contacts);
    changeContactsListState('ready');
  })

  $('#select-type').on('input',function(){
    var type=$('#select-type').val();
    if(type!=='') getContacts(type);
  });

  $('#load-file').on('change', function(e){
    readFile(e);
  });

  var onAddContact = function(mail){
    if(contacts.length===0) $('tbody').html('');;
    var newContact = {};
    newContact.typeContact = "";
    newContact.denomination = "";
    newContact.name = "";
    newContact.firstName = "";
    newContact.zipCode = "";
    newContact.email = mail ? mail : "";
    newContact.id = 0;
    contacts.push(newContact);
    $('tbody').prepend(getContactRow(newContact));
    contacts.push(newContact);
    addMenu($('.table'), $('tbody > tr').first());
    $("#container-contacts").animate({ scrollTop: 0 }, 500);
    if(!mail){
      $('#bEdit').first().click();
      var input = $('.email > .bootstable-edit').first();
      input.focus();
    }
    // input[0].selectionStart = 0;
    // input[0].selectionEnd = 0;
    // updateContacts(contacts);
  }

  function getBootstable(){
    $('table').SetEditable({
      onEdit: function() {},
      onDelete: function() {},
      onBeforeDelete: function() {},
      onAdd: onAddContact,
      $addButton: $('#add-contact')
    });
  }

  function getContacts(parameters) {
    $('tbody').html('');
    changeContactsListState('loading');
    $.ajax({
      method: "GET",
      url: "/getContacts",
      data: { type: parameters },
      // dataType: "text",
      success: function (data) {
        contacts = data.contacts;
        updateContacts(contacts);
        changeContactsListState('ready');
      },
      error: function (request, status, error) {
        var err = JSON.parse(request.responseText).message;
        console.log(err);
        changeContactsListState('ready');
      }
    })
  }

  function getContactRow(contact){
    var html = "<tr class='id' data-idContact='" + contact.id + "'>";
    html += "<td class='typeContact'>"+ contact.typeContact +"</td>";
    html += "<td class='denomination'>"+ contact.denomination +"</td>";
    html += "<td class='name'>"+ contact.name +"</td>";
    html += "<td class='firstName'>"+ contact.firstName +"</td>";
    html += "<td class='zipCode'>"+ contact.zipCode +"</td>";
    html += "<td class='email'>"+ contact.email +"</td>";
    html += "</tr>";
    return html;
  }

  function changeContactsListState(parameter) {
    switch (parameter) {
      case 'loading':
      $("#spinner").removeClass('invisible');
      break;
      case 'ready':
      $("#spinner").addClass('invisible');
      break;
      default:
      break;
    }
  }

  var updateContacts = function() {
    $('tbody').html('');
    if(contacts.length === 0){
      $('tbody').prepend('Aucun contact chargé, veuillez sélectionner un critère');
      return false;
    }
    contacts.forEach(function(item, index){
      $('tbody').prepend(getContactRow(item));
      if(index === contacts.length - 1) {
        addMenu($('.table'));
        $('.table').scrollTop();
      }
    })
  }

  var readFile = function(evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      var text= event.target.result;
      text.split("\n").forEach(function(elm){
        elm=elm.replace("\n", '');
        onAddContact(elm);
      })

    }
    reader.readAsText(file)
  }


  // getContacts('ETA');

  getBootstable();
  updateContacts(contacts)

  // document.getElementById('file').addEventListener('change', readFile, false);




})
