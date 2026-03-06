/**
 * 害鳥レスキュー侍 - FAQアコーディオン制御
 */
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isOpen = faqItem.classList.contains('is-open');

            // --- 他の開いている項目を閉じたい場合はここから ---
            /*
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('is-open');
                    item.querySelector('.faq-answer').style.display = 'none';
                }
            });
            */
            // --- ここまで ---

            if (!isOpen) {
                // 開く処理
                faqItem.classList.add('is-open');
                faqAnswer.style.display = 'block';
                button.setAttribute('aria-expanded', 'true');
            } else {
                // 閉じる処理
                faqItem.classList.remove('is-open');
                faqAnswer.style.display = 'none';
                button.setAttribute('aria-expanded', 'false');
            }
        });
    });
});

/**
 * 施工事例の表示・非表示切り替え
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-cases-btn');
    const extraCases = document.querySelectorAll('.extra-case');
    const casesSection = document.querySelector('.cases-section'); // 戻る位置

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = extraCases[0].style.display === 'none' || extraCases[0].style.display === '';

            if (isHidden) {
                extraCases.forEach(el => el.style.display = 'block');
                toggleBtn.textContent = '施工事例を閉じる';
            } else {
                extraCases.forEach(el => el.style.display = 'none');
                toggleBtn.textContent = 'もっと施工事例を見る';

                casesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

/**
 * ハンバーガーメニュー
 */
const menuBtn = document.getElementById('menu-btn');
const spNav = document.getElementById('sp-nav');
const overlay = document.getElementById('nav-overlay');

function toggleMenu() {
    menuBtn.classList.toggle('open');
    spNav.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.sp-nav a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});