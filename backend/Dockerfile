# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Создаем папку для хранения загруженных файлов
RUN mkdir -p uploads

# Открываем порт
EXPOSE 3000

# Запуск приложения
CMD ["node", "app.js"]