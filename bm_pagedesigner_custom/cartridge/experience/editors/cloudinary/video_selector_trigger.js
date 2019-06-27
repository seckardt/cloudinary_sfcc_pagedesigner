'use strict';

var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');
var cloudinaryApi = require('~/cartridge/scripts/cloudinary/cloudinary_api');

module.exports.init = function (editor) {
	var jsonString = JSON.stringify(cloudinaryApi.getVideoJSON());
	editor.configuration.put('fileData', jsonString);

	var videoSelector = PageMgr.getCustomEditor('cloudinary.video_selector', new HashMap());
	editor.dependencies.put('breakout', videoSelector);
};
