const { IncomingForm } = require('formidable');
const { fileTypeFromFile } = require('file-type');
const path = require('path');

function handleUpload(req, res, next) {
	if (req.method !== 'POST' || !req.headers['content-type']?.includes('multipart/form-data')) {
		return next();
	}

	const form = new IncomingForm({
		uploadDir: path.join(__dirname, '../uploads'),
		keepExtensions: true,
		multiples: false,
	});

	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(400).json({ error: 'File upload failed' });
		}

		// Formidable v3 - файлы приходят как массив
		const imageFile = files.imageFile?.[0];
		if (!imageFile) {
			return res.status(400).json({ error: 'No image file provided' });
		}

		// Проверка типа файла
		const fileType = await fileTypeFromFile(imageFile.filepath);
		if (!fileType || !fileType.mime.startsWith('image/')) {
			return res.status(400).json({ error: 'Uploaded file is not an image' });
		}

		// Сохраняем данные
		req.uploadedFile = {
			path: imageFile.filepath,
			originalName: imageFile.originalFilename,
		};
		req.body = fields;

		next();
	});
}

module.exports = handleUpload;
