require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const chalk = require('chalk').default;
const path = require('path');

const port = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		const fs = require('fs');
		const uploadsDir = path.join(__dirname, 'uploads');
		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir, { recursive: true });
		}

		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port: ${port}...`));
		});
	})
	.catch(error => console.error(chalk.bgRed('Could not connect to MongoDB...'), error));
