$(document).ready(function(){
  $('table').SetEditable({
    onEdit: function() {alert('onEdit')},
    onDelete: function() {alert('onDelete')},
    onBeforeDelete: function() {alert('onBeforeDelete')},
    onAdd: function() {alert('onAdd')}
  });


  function getContacts(parameters) {
    changeContactsListState('loading');
    $.ajax({
      method: "GET",
      url: "/getContacts",
      data: { type: parameters },
      // dataType: "text",
      success: function (data) {
        updateContacts(data.contacts);
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
    var html = "<tr data-idContact='" + contact.id + "'>";
    html += "<td>"+ contact.typeContact +"</td>";
    html += "<td>"+ contact.denomination +"</td>";
    html += "<td>"+ contact.name +"</td>";
    html += "<td>"+ contact.firstName +"</td>";
    html += "<td>"+ contact.zipCode +"</td>";
    html += "<td>"+ contact.email +"</td>";
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

  function updateContacts(contacts) {
    $('tbody').html('');
    contacts.forEach(function(item, index){
      $('tbody').prepend(getContactRow(item));
      if(index === contacts.length - 1) {
        $('table').SetEditable({
          onEdit: function() {alert('onEdit')},
          onDelete: function() {alert('onDelete')},
          onBeforeDelete: function() {alert('onBeforeDelete')},
          onAdd: function() {alert('onAdd')}
        });
      }
    })
  }

  $('#select-type').on('input',function(){
    var type=$('#select-type').val();
    getContacts(type);
  });
})
