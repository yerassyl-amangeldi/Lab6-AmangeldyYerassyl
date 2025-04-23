import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // Увеличиваем таймаут до 10 секунд
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Превышено время ожидания. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.');
    }
    if (error.response) {
      throw new Error(`Ошибка API: ${error.response.status} - ${error.response.statusText}`);
    }
    throw new Error('Не удалось подключиться к серверу. Проверьте ваше соединение.');
  }
);

export default api;