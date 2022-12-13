function textAbstract(text, length) {
	if (text == null) {
		return ''
	}
	if (text.length <= length) {
		return text
	}

	return text.substring(0, length - 2) + '...'
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const singleString = str => {
	const cleanStr1 = str
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/&/g, ' and ')
		.replace(/₹/g, ' rupee')
		.replace(/₨/g, ' rupee')
		.replace(/\$/g, ' dollar')
		.replace(/€/g, ' euro')
		.replace(/£/g, ' pound')
		.replace(/¥/g, ' yen')
		.replace(/₩/g, ' won ')
		.replace(/₦/g, ' naira')
		.replace(/₱/g, ' peso')
		.replace(/₫/g, ' dong')
		.replace(/₭/g, ' kip')
		.replace(/₮/g, ' tugrik')
		.replace(/₺/g, ' lira')
		.replace(/₴/g, ' hryvnia')
		.replace(/₣/g, ' franc')
		.replace(/[^A-Za-z0-9,]/g, ' ')
		.trim()

	const strArr = cleanStr1.split(',')
	let cleanStr2 = strArr[0]

	if (strArr.length > 1) {
		for (let i = 0; i < strArr.length - 1; i++) {
			let digRe = /\d/
			let str1 = strArr[i]
			let str2 = strArr[i + 1]
			let lastIndex = str1.length - 1

			if (digRe.test(str1[lastIndex]) && digRe.test(str2[0])) {
				cleanStr2 = cleanStr2 + str2
			} else {
				cleanStr2 = cleanStr2 + ' ' + str2
			}
		}
	}

	return cleanStr2.replace(/\s+/g, '-')
}

export { textAbstract, numberWithCommas, singleString }
