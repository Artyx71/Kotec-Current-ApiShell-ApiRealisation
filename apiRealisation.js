const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// подключаем парсеры
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// обработчик запросов GET
app.get('/images', (req, res) => {
  const { id, width, height } = req.query;

  // сохраняем запрос в лог
  saveLog({ id, width, height });

  // формируем ссылку на картинку
  const imageUrl = `https://picsum.photos/id/${id}/${width}/${height}`;

  // отправляем ответ с ссылкой на картинку
  res.json({ image: imageUrl });
});

// функция для сохранения запросов в лог
function saveLog(data) {
  fs.appendFile('log.txt', JSON.stringify(data) + '\n', (err) => {
    if (err) throw err;
  });
}

// запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('API is running on port 3000');
});