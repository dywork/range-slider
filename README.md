# RangeSlider (jQuery plugin)

[Просмотр](https://dywork.github.io/range-slider/)

## Установка

```
$ npm install
```

## Команды

Клонировать репозиторий: 
`git clone https://github.com/dywork/range-slider`

Запуск: 
`npm start`

Сборка: 
`npm run build`

Тесты: 
`npm run test`

Деплой на github page: 
`npm run deploy`

## Использование
Слайдер по умолчанию:
```javascript
const defaultSlider = $('#defaultSlider').rangeSlider();
```
 Настройки по умолчанию:
```javascript
const defaultOptions = {
  currentValue: 10,
  range: {
    min: 10,
    max: 30,
  },
  isThumb: true,
  isRuler: false,
  step: 1,
  decimal: 2,
  orientation: 'horizontal',
}
```
