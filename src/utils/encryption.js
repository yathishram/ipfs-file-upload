import CryptoJS from 'crypto-js';
import { saveAs } from 'file-saver';

export const encrypt = (arra) => {
	const key = '1234567887654321';

	const wordArray = CryptoJS.lib.WordArray.create(arra); // Convert: ArrayBuffer -> WordArray
	const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
	const fileEnc = new Blob([encrypted]); // Create blob from string
	//console.log(fileEnc);
	//const fileENC = new File([encrypted], file, { type: file.mimetype }); // Create file from blob
	// const a = document.createElement('a');
	// const url = window.URL.createObjectURL(fileEnc);
	// const filename = file.name + '.enc';
	// a.href = url;
	// a.download = filename;
	// a.click();
	// window.URL.revokeObjectURL(url);
	return encrypted;
};

function convertWordArrayToUint8Array(wordArray) {
	var arrayOfWords = wordArray.hasOwnProperty('words') ? wordArray.words : [];
	var length = wordArray.hasOwnProperty('sigBytes') ? wordArray.sigBytes : arrayOfWords.length * 4;
	var uInt8Array = new Uint8Array(length),
		index = 0,
		word,
		i;
	for (i = 0; i < length; i++) {
		word = arrayOfWords[i];
		uInt8Array[index++] = word >> 24;
		uInt8Array[index++] = (word >> 16) & 0xff;
		uInt8Array[index++] = (word >> 8) & 0xff;
		uInt8Array[index++] = word & 0xff;
	}
	return uInt8Array;
}

export const decrypt = (file) => {
	const reader = new FileReader();
	reader.onload = () => {
		const key = '1234567887654321';
		const encrypted = reader.result; // Convert: ArrayBuffer -> String
		const decrypted = CryptoJS.AES.decrypt(encrypted, key); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
		console.log(decrypted);
		var typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array
		console.log(typedArray);
		const fileDec = new Blob([typedArray]); // Create blob from ArrayBuffer

		const a = document.createElement('a');
		const url = window.URL.createObjectURL(fileDec);
		const filename = file.name.replace('.enc', '');
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
	};
	reader.readAsText(file);
};

// export const saveEncFile = (encrypted, file) => {
// 	const fileEnc = new Blob([encrypted]); // Create blob from string
// 	const fileName = 'encrypted_' + file.name;
// 	saveAs(fileEnc, fileName);
// };

// export const saveDecFile = (decrypted, file) => {
// 	const fileDec = new Blob([decrypted]); // Create blob from ArrayBuffer

// 	const a = document.createElement('a');
// 	const url = window.URL.createObjectURL(fileDec);
// 	const filename = file.name.replace('.enc', '');
// 	a.href = url;
// 	a.download = filename;
// 	a.click();
// 	window.URL.revokeObjectURL(url);
// };
