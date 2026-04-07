/**
 * 害鳥レスキュー侍 - FAQアコーディオン制御
 */
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((button, index) => {
        const faqItem = button.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const answerId = `faq-answer-${index + 1}`;

        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', answerId);
        faqAnswer.setAttribute('id', answerId);
        faqAnswer.setAttribute('aria-hidden', 'true');

        button.addEventListener('click', () => {
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
                faqAnswer.setAttribute('aria-hidden', 'false');
            } else {
                // 閉じる処理
                faqItem.classList.remove('is-open');
                faqAnswer.style.display = 'none';
                button.setAttribute('aria-expanded', 'false');
                faqAnswer.setAttribute('aria-hidden', 'true');
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
        // 初期状態で非表示に設定
        extraCases.forEach(el => el.style.display = 'none');

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
 * レビューの表示・非表示切り替え
 */
document.addEventListener('DOMContentLoaded', () => {
    const reviewBtn = document.getElementById('toggle-reviews-btn');
    const extraReviews = document.querySelectorAll('.extra-review');
    const reviewsSection = document.querySelector('.reviews-section');

    if (reviewBtn && extraReviews.length > 0) {
        // 初期状態で非表示に設定
        extraReviews.forEach(el => el.style.display = 'none');

        reviewBtn.addEventListener('click', () => {
            const isHidden = extraReviews[0].style.display === 'none' || extraReviews[0].style.display === '';
            if (isHidden) {
                extraReviews.forEach(el => el.style.display = 'block');
                reviewBtn.textContent = '閉じる';
            } else {
                extraReviews.forEach(el => el.style.display = 'none');
                reviewBtn.textContent = 'もっとお客様の声を見る';
                reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    document.body.classList.toggle('menu-open');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.sp-nav a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});