parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dashboardModalVisible: false,
    uploadModalVisible: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickOpenDashboardModalButton: async function(formName) {
      console.log(formName);
      if(formName === "dashboard") this.dashboardModalVisible = true;
      if(formName === "upload") this.uploadModalVisible = true;
    },

    closeDashboardModal: async function(formName) {
      console.log(formName);
      if(formName === "dashboard") this.dashboardModalVisible = false;
      if(formName === "upload") this.uploadModalVisible = false;
    },

    formUploadSubmit: function(event){
      event.preventDefault();
      var form = document.getElementById('uploadForm');
      var fileSelect = document.getElementById('uploadedFile');
      var uploadButton = document.getElementById('upload-btn');

      event.preventDefault();

      // Update button text.
      uploadButton.innerHTML = 'Uploading...';

      // Get the selected files from the input.
      var files = fileSelect.files;
      // Create a new FormData object.
      var formData = new FormData();
      // Loop through each of the selected files.
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Check the file type.
        // if (!file.type.match('image.*')) {
        //   continue;
        // }

        // Add the file to the request.
        formData.append('files[]', file, file.name);
        // Set up the request.
        var xhr = new XMLHttpRequest();
        // Open the connection.
        xhr.open('POST', 'upload', true);
        // Set up a handler for when the request finishes.
        xhr.onload = function () {
          if (xhr.status === 200) {
            // File(s) uploaded.
            uploadButton.innerHTML = 'Upload success';
          } else {
            alert('An error occurred!');
            console.log(xhr);
          }
        };
        // Send the Data.
        xhr.send(formData);


      }

    }

  }
});
