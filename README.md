# RangeSlider (jQuery plugin)

[Просмотр](https://dywork.github.io/range-slider/)

## Установка

```
$ git clone https://github.com/dywork/range-slider.git
$ cd range-slider
$ npm install
$ npm run build
```

## Команды

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
```html
<div id="defaultSlider"></div>
```
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
