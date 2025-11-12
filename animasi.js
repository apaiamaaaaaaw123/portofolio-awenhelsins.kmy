// Ambil elemen yang diperlukan
const header = document.querySelector('.balee');
const heroSection = document.querySelector('.chaunima'); // Section latar belakang
const heroHeading = heroSection ? heroSection.querySelector('h2') : null; // "Hai saya Awen"
const mainContent = document.querySelector('main');
const colpek = document.querySelector('.colpek');
const allButtons = document.querySelectorAll('a[class]'); // Semua link/tombol

// --- 1. Animasi Parallax Scrolling pada Section Utama ---

// Fungsi yang dipanggil setiap kali jendela di-scroll
function applyParallax() {
    if (heroSection) {
        // Hitung posisi scroll
        const scrolled = window.scrollY;
        
        // Terapkan translasi Y negatif pada latar belakang section (Parallax)
        // Kecepatan Parallax: 0.5 (bergerak setengah kecepatan scroll)
        const speed = 0.5;
        heroSection.style.backgroundPositionY = -(scrolled * speed) + 'px';
        
        // Memberi efek 3D sederhana pada judul
        if (heroHeading) {
            heroHeading.style.transform = `scale(1 + ${scrolled * 0.0005})`; // Sedikit membesar saat scroll
            heroHeading.style.textShadow = `${-scrolled * 0.05}px ${-scrolled * 0.05}px 10px #000`;
        }
    }
}

// Tambahkan event listener untuk scrolling
window.addEventListener('scroll', applyParallax);


// --- 2. Animasi Keyframe CSS Dinamis (Fade-in dan Fly-in) ---

// Fungsi untuk menyuntikkan keyframes ke dalam dokumen melalui JS
function injectKeyframesCSS() {
    // Definisi Keyframes untuk animasi fly-in/rotate
    const keyframesCSS = `
        /* Definisi Keyframe untuk Animasi Fade-In & Rotate */
        @keyframes dynamic-fly-in {
            0% {
                opacity: 0;
                transform: translateY(50px) rotateX(-90deg);
                filter: blur(5px);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
                filter: blur(0);
            }
        }
        
        /* Definisi Keyframe untuk Animasi Header Sticky Jiggle */
        @keyframes jiggle-header {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(0.98); }
            100% { transform: scaleY(1); }
        }
    `;

    // Buat elemen style dan masukkan keyframes
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = keyframesCSS;
    document.head.appendChild(styleSheet);
}

// Panggil fungsi untuk menyuntikkan keyframes saat script dimuat
injectKeyframesCSS();

// Fungsi untuk menerapkan animasi saat halaman dimuat
window.addEventListener('load', () => {
    // Terapkan animasi fly-in pada konten utama
    if (colpek) {
        colpek.style.opacity = 0; // Pastikan awal tersembunyi
        colpek.style.animation = 'dynamic-fly-in 1.5s ease-out 0.5s forwards'; 
    }
    
    // Terapkan animasi jiggle/sticky pada header
    if (header) {
        header.style.animation = 'jiggle-header 4s ease-in-out infinite';
    }
});


// --- 3. Animasi pada Semua Tombol (Hover 3D Flip) ---

// Fungsi untuk menerapkan efek 3D Flip saat tombol di-hover
allButtons.forEach(button => {
    // Atur properti transisi dasar pada semua tombol
    button.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    
    button.addEventListener('mouseover', () => {
        // Animasi Flip dan Shadow yang dinamis
        button.style.transform = 'translateY(-5px) rotateX(10deg) scale(1.05)';
        button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
        button.style.border = '2px solid #ff00ff'; // Efek border
    });

    button.addEventListener('mouseout', () => {
        // Kembali ke keadaan normal
        button.style.transform = 'none';
        button.style.boxShadow = 'none'; // Kembali ke shadow CSS asli
        button.style.border = 'none';
    });
});