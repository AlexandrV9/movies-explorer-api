# Бэкэнд проекта movies-explorer 

## Краткий обзор по данному API

Данный сервер умеет работать со следующими запросами:

1. GET-запрос по маршруту /users/me - возращает информацию о пользователе (email и имя)
2. PATCH-запрос по маршруту /users/me - обновляет информацию о пользователе (email и имя)
3. GET-запрос по маршруту /movies - возвращает все сохранённые пользователем фильмы
4. POST-запрос по маршруту /movies - создаёт фильм с переданными в теле полями (country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId)
5. DELETE-запрос по маршрут /movies/movieId - удаляет сохранённый фильм по id фильма (movieId)

Все вышеперечисленные маршруту защищены!
Для того, чтобы использовать все эти запросы вам необходимо зарегистрироваться и авторизоваться на сервере. Поэтому на сервер присутсвует ещё два маршрута:

* /signup - на который нужно отправить POST-запрос с переданными в теле полями (email, password и name) - для регистрации
* /signin - на который нужно отправить POST-запрос с переданными в теле полями (email и password) - для авторизации

Если вы успешно прошли авторизацию, то можете воспользоваться всеми методами данного сервера.

## Ссылка на API:
https://api.movies.explorer.alexv.nomoredomains.club

