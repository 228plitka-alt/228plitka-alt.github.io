document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку страницы
            
            // Показываем красивое зеленое уведомление из Bootstrap
            statusDiv.innerHTML = `
                <div class="alert alert-success d-flex align-items-center mb-0" role="alert">
                    <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div>Спасибо! Ваше сообщение отправлено (демонстрационный режим).</div>
                </div>
            `;
            
            form.reset(); // Очищаем поля
            
            // Убираем уведомление через 5 секунд
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        });
    }
});