import $ from 'jquery'

/**
 * Super simple wrapper around $.ajax
 * @param {String} url A URL that should be loaded
 * @param {Object} queryParams A map of query params and value
 * @returns {Promise} An ES6 Promise that can be then()d
 */
function fetch(url, queryParams = {}) {
	const request = {
		type: 'GET',
		dataType: 'json',
		url: `${url}?${$.param(queryParams)}`,
		ignoreErrors: true // avoids triggering the 500 page when a failure occurs (see: ajaxError.js)
	}
	const nativePromise = Promise.resolve($.ajax(request))
	return nativePromise.then(onSuccess, onError)
}

/**
 * Super simple wrapper around $.ajax
 * @param {String} url A URL that should be loaded
 * @param {Object} data The data payload
 * @returns {Promise} An ES6 Promise that can be then()d
 */
function post(url, data = {}) {
	const request = {
		type: 'POST',
		url,
		data,
		dataType: 'json',
		ignoreErrors: true // avoids triggering the 500 page when a failure occurs (see: ajaxError.js)
	}
	const nativePromise = Promise.resolve($.ajax(request))
	return nativePromise.then(onSuccess, onError)
 }

/**
 * handle the error scenario
 */
function onError(jqxhr = {}) {
	let err
	try {
		err = JSON.parse(jqxhr.responseText)
	} catch (e) {
		console.warn(e.message)
		err = jqxhr
	}
	return Promise.reject(err ? err.error : err)
}

/**
 * Read the error message off the 200 response and throw it.
 * If called within a Promise it will end up in the .catch() function.
 */
function onSuccess(response) {
	if (response && response.error && response.error.message) {
		return Promise.reject(response.error)
	}
	return response
}

export { fetch, post }
