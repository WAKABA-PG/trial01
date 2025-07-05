// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // ヒーローボタンのクリックイベント
    const heroBtn = document.getElementById('heroBtn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            alert('詳しい情報はAboutページをご覧ください！');
            // 実際のプロジェクトでは、ここでAboutページに遷移させることも可能
            // window.location.href = 'about.html';
        });
    }

    // コンタクトフォームの送信処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // 簡単なバリデーション
            if (!name || !email || !subject || !message) {
                alert('すべてのフィールドを入力してください。');
                return;
            }

            if (!isValidEmail(email)) {
                alert('正しいメールアドレスを入力してください。');
                return;
            }

            // フォーム送信の擬似処理（実際のプロジェクトではサーバーに送信）
            showSubmissionMessage(name);
            contactForm.reset();
        });
    }

    // スムーズスクロール機能
    addSmoothScrolling();
    
    // ページローダー
    addPageLoader();
    
    // スクロール時のアニメーション
    addScrollAnimations();
});

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// フォーム送信完了メッセージ
function showSubmissionMessage(name) {
    const message = `${name}様、お問い合わせありがとうございます！\n\n内容を確認後、24時間以内にご返信いたします。`;
    alert(message);
    
    // より洗練されたメッセージ表示も可能
    // showCustomModal(message);
}

// カスタムモーダルの表示（オプション）
function showCustomModal(message) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>送信完了</h3>
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // モーダルのスタイル（動的に追加）
    const style = document.createElement('style');
    style.textContent = `
        .custom-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
        }
        .modal-content button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

// スムーズスクロール機能
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ページローダー
function addPageLoader() {
    // ページ読み込み時のローディング効果
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);
        
        // ローダーのスタイル
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255,255,255,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease;
            }
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // ローダーを非表示にする
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// スクロール時のアニメーション
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.feature-card, .team-member, .about-text, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // アニメーション用のスタイル
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .team-member, .about-text, .contact-info {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ユーティリティ関数
const utils = {
    // 現在のページを取得
    getCurrentPage: function() {
        return window.location.pathname.split('/').pop() || 'index.html';
    },
    
    // ローカルストレージに訪問回数を保存
    trackVisit: function() {
        const visits = parseInt(localStorage.getItem('siteVisits') || '0') + 1;
        localStorage.setItem('siteVisits', visits.toString());
        console.log(`サイト訪問回数: ${visits}`);
    },
    
    // 現在の時刻を取得
    getCurrentTime: function() {
        return new Date().toLocaleString('ja-JP');
    }
};

// 訪問トラッキング
utils.trackVisit();

// コンソールにウェルカムメッセージを表示
console.log('🎉 Sample Websiteへようこそ！');
console.log('📅 現在の時刻:', utils.getCurrentTime());
console.log('📄 現在のページ:', utils.getCurrentPage());

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
});

// レスポンシブメニューの実装（モバイル対応）
function addMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav && window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
        nav.appendChild(menuToggle);
    }
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', function() {
    addMobileMenu();
});

// 初期化時にモバイルメニューを追加
addMobileMenu();
