(() => {
	const SECRET_CLOUD_NAME = 'xxx';
	const SECRET_API_KEY = 'xxx';
	const SECRET_USER_NAME = 'xxx@xxx';
	const SECRET_TIMESTAMP = Date.now();

	// Page Designer ready event
	subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale, viewport }) => {
		console.log('cloudinary.video_selector::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config, viewport);

		const template = obtainTemplate(viewport);
		const clone = document.importNode(template.content, true);
		document.body.appendChild(clone);

		window.ml = cloudinary.openMediaLibrary({
			cloud_name: SECRET_CLOUD_NAME,
			api_key: SECRET_API_KEY,
			username: SECRET_USER_NAME,
			timestamp: SECRET_TIMESTAMP,
			signature: sha256(`cloud_name=${SECRET_CLOUD_NAME}&timestamp=${SECRET_TIMESTAMP}&username=${SECRET_USER_NAME}`),
			inline_container: 'div.sfcc-ml-root',
			remove_header: true,
			max_files: 8
		}, {
			insertHandler: (data) => {
				data.assets.forEach(asset => {
					console.log('Inserted asset:', JSON.stringify(asset, null, 2));
				});
			}
		})

	});

	function obtainTemplate(viewport) {
		const template = document.createElement('template');
		const height = viewport.height - 16; // 16px = padding top + padding bottom
		template.innerHTML = `<div class="sfcc-ml-root" style="height: ${height}px; max-height: ${height}px;"></div>`;
		return template;
	}
})();
