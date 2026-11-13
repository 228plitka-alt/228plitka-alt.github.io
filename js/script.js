document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. FAQ ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('active');
        });
    });

    // --- 2. ТАБЫ (Подробно о продукте) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 3. ТАБЫ (Настройте защиту под себя - ГРУППЫ) ---
    const customTabs = document.querySelectorAll('.customize-tab');
    const customContents = document.querySelectorAll('.customize-grid');

    customTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Убираем active со всех табов и блоков
            customTabs.forEach(t => t.classList.remove('active'));
            customContents.forEach(c => c.classList.remove('active'));

            // 2. Добавляем active текущему табу
            tab.classList.add('active');

            // 3. Показываем нужный блок
            const targetId = tab.getAttribute('data-custom');
            const targetGrid = document.getElementById(targetId);
            if (targetGrid) {
                targetGrid.classList.add('active');
            }
        });
    });

    // --- 4. ЧАТ ---
    window.toggleChat = function() {
        const w = document.getElementById('chatWindow');
        w.style.display = (w.style.display === 'flex') ? 'none' : 'flex';
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => botReply(text), 800);
    };

    window.sendQuickMessage = function(text) {
        addMessage(text, 'user');
        setTimeout(() => botReply(text), 800);
    };

    function addMessage(text, sender) {
        const container = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = 'message ' + sender;
        div.textContent = text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    function botReply(text) {
        const t = text.toLowerCase();
        let r = '';
        if (t.includes('цена') || t.includes('стоит') || t.includes('сколько')) {
            r = 'Пакет стоит 350 ₽/мес. Первые 30 дней — бесплатно! А по отдельности все сервисы стоили бы 446 ₽. Выгода 21,5%!';
        } else if (t.includes('что входит') || t.includes('состав')) {
            r = 'В пакет входят: защита звонков, мониторинг утечек, фильтр сайтов и антивирус PRO32. Всё для безопасности вашей семьи!';
        } else {
            r = 'Я пока только учусь. Но точно знаю, что пакет «Для спокойствия» защитит вашу семью! Если нужна помощь человека, позвоните: 8 800 100 0 800.';
        }
        addMessage(r, 'bot');
    }
});