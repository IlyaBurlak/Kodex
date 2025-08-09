#!/usr/bin/env node
const setupMenu = require('./menu');

console.log('=== Конфигуратор валидации ===');
const showMainMenu = setupMenu();
showMainMenu();