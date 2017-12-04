myApp.service('FilestackService', function () {

  let self = this;

  self.fsClient = filestack.init('A3FwoHPYqSIGg7A3LeJowz');

  self.openPicker = () => {
    return self.fsClient.pick({
      fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "dropbox"],
      accept: ["image/*"],
      maxFiles: 1,
      minFiles: 1
    }).then(function (response) {
      // declare this function to handle response
      return response.filesUploaded[0].url;
    });
  };

});