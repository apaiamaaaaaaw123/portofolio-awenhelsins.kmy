// Ambil semua elemen penting
const navItems = document.querySelectorAll('.nav-menu li'); // Semua item navigasi
const colpekBox = document.querySelector('.colpek'); // Kotak "GANTENG KAN?"

// --- 1. Animasi 3D Hover pada Navigasi ---
navItems.forEach((item, index) => {
    // Terapkan properti transform dan transisi awal
    item.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    item.style.transformStyle = 'preserve-3d'; // Penting untuk 3D

    item.addEventListener('mouseover', () => {
        // Animasi: Mendorong ke depan (translateZ), memutar sedikit, dan bayangan yang intens
        item.style.transform = `translateZ(20px) rotateY(${5 * (index % 2 === 0 ? 1 : -1)}deg) scale(1.1)`;
        item.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 255, 0, 0.5)';
        item.style.zIndex = '100'; // Pastikan di atas elemen lain saat di-hover
    });

    item.addEventListener('mouseout', () => {
        // Kembali ke keadaan normal
        item.style.transform = 'none';
        item.style.boxShadow = 'none';
        item.style.zIndex = 'auto';
    });
});

// --- 2. Animasi "3D Pop" pada Kotak Utama saat Scroll Masuk (Intersection Observer) ---
if (colpekBox) {
    // Atur properti transisi dan posisi awal (tersembunyi/rotasi)
    colpekBox.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Kurva animasi "pegas"
    colpekBox.style.opacity = '0';
    colpekBox.style.transform = 'scale(0.5) rotateX(90deg)';

    // Intersection Observer untuk mendeteksi kapan elemen masuk viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Terapkan animasi "3D Pop"
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1) rotateX(0deg)';
                observer.unobserve(entry.target); // Hentikan observasi setelah muncul
            }
        });
    }, {
        threshold: 0.1 // Pemicu saat 10% elemen terlihat
    });

    observer.observe(colpekBox);
}