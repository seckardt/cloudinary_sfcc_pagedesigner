(() => {
	// Page Designer ready event
	subscribe('sfcc:ready', async ({ value, config, isDisabled, isRequired, dataLocale, displayLocale }) => {
		console.log('cloudinary.video_selector::sfcc:ready', dataLocale, displayLocale, isDisabled, isRequired, value, config);

		const template = obtainTemplate(config, value);
		const clone = document.importNode(template.content, true);
		document.body.appendChild(clone);

		// Apply `click` listeners to all selector items
		const selectorContainerEl = document.querySelector('.video_selector__container');
		const selectorItemEls = selectorContainerEl.querySelectorAll('.video_selector__item');
		selectorItemEls.forEach(selectorItemEl => {
			selectorItemEl.addEventListener('click', () => {
				// Update `selected` class
				selectorContainerEl.querySelectorAll('.selected').forEach(itemEl => itemEl.classList.remove('selected'));
				selectorItemEl.classList.add('selected');

				// Apply the selected value into the breakout sandbox container
				emit({
					type: 'sfcc:value',
					payload: {
						video_id: selectorItemEl.dataset.value
					}
				});
			});
		});
	});

	// Create an image URL with formatting options for thumbnails
	function imageTransform(option) {
		const { version, secure_url, format } = option;
		const arr = secure_url.split('v' + version); // Remove version number
		arr.splice(1, 0, 'c_lpad,h_50,w_50'); // Inject settings
		return arr.join('').replace('.' + format, '.jpg');
	}

	function obtainItemMarkup(option, isSelected) {
		const url = imageTransform(option);
		return `<div class="video_selector__item${isSelected ? ' selected' : ''}" data-value="${option.public_id}">
  <div class="video_selector__image">
    <img src="${url}" />
  </div>
  <div class="video_selector__data">
    <span class="video_selector__data__id">${option.public_id}</span><br />
    <span class="video_selector__data__type">${option.resource_type}</span> - 
    <span class="video_selector__data__format">${option.format}</span> - 
    <span class="video_selector__data__size">${option.width} x ${option.height}</span>
  </div>
</div>`;
	}

	// Output HTML for video selector interface
	function obtainTemplate(config, value) {
		const selectedVideoId = typeof value === 'object' && value !== null && typeof value.video_id === 'string' ? value.video_id : null;
		const fileData = JSON.parse(config.fileData);
		const itemsMarkup = fileData.resources.reduce((acc, option) => {
			acc += obtainItemMarkup(option, selectedVideoId === option.public_id);
			return acc;
		}, '');

		const template = document.createElement('template');
		template.innerHTML = `
<div class="video_selector__header">
  <div class="video_selector__header__icon"></div>
  <div class="video_selector__header__text">Powered by Cloudinary</div>
</div>

<div class="video_selector__container">
${itemsMarkup}
</div>`.trim();

		return template;
	}
})();
