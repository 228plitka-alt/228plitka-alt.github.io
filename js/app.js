(function () {
  const body = document.body;
  const buttons = document.querySelectorAll('.view-switch__btn');
  let isManualMode = false; // Флаг, чтобы автоматика не перебивала ручной выбор

  // Функция переключения состояния
  const setView = (view) => {
    // Включаем/выключаем классы на body
    body.classList.toggle('view-mobile', view === 'mobile');
    body.classList.toggle('view-desktop', view === 'desktop');

    // Подсвечиваем активную кнопку
    buttons.forEach((btn) => {
      btn.classList.toggle('view-switch__btn--active', btn.dataset.view === view);
    });
  };

  // 1. Обработка ручного клика по кнопкам PC / Mobile
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      isManualMode = true; // Пользователь вмешался, отключаем авто-режим
      setView(btn.dataset.view);
    });
  });

  // 2. Функция автоматического определения ширины экрана
  const handleAutoSwitch = () => {
    // Если пользователь сам выбрал режим, игнорируем ресайз
    if (isManualMode) return; 

    const isMobile = window.innerWidth < 768;
    setView(isMobile ? 'mobile' : 'desktop');
  };

  // 3. Слушатель изменения размера окна (ресайз)
  window.addEventListener('resize', handleAutoSwitch);

  // 4. Инициализация при первой загрузке страницы
  // Определяем, с какого устройства зашел пользователь
  const initialView = window.innerWidth < 768 ? 'mobile' : 'desktop';
  setView(initialView);

})();