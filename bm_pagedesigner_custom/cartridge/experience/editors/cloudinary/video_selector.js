'use strict';

var cloudinaryApi = require('~/cartridge/scripts/cloudinary/cloudinary_api');

module.exports.init = function (editor) {
	var jsonString = JSON.stringify(cloudinaryApi.getVideoJSON());
	editor.configuration.put('fileData', jsonString);
};
