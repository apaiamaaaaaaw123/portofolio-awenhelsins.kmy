// Mengambil container div terluar
const outerDiv = document.querySelector('.colpek'); 

// Mengambil semua elemen yang berada di dalam div (h2, img, a)
const innerElements = document.querySelectorAll('.colpek > *');

// --- Animasi Staggered Flip-In (Elegan dan Tidak Norak) ---

if (outerDiv && innerElements.length > 0) {
    // 1. Mengaktifkan konteks 3D pada container luar
    outerDiv.style.perspective = '1000px'; 

    // 2. Fungsi untuk menjalankan animasi setelah penundaan
    function runNestedAnimation() {
        innerElements.forEach((element, index) => {
            // Memberikan properti transisi dasar
            element.style.transition = 'all 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Kurva "Ease Out Expo"

            // Mengatur posisi awal (tersembunyi, dirotasi, dan bergeser)
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) rotateX(-90deg)'; // Efek Slide up & Flip 3D

            // Menerapkan animasi dengan penundaan berurutan (staggered)
            const delay = index * 200 + 100; // Penundaan 100ms + 200ms per elemen

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) rotateX(0deg)'; // Kembali ke posisi normal
            }, delay);
        });
    }
    
    // 3. Menggunakan Intersection Observer untuk memicu animasi saat kotak masuk viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runNestedAnimation();
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
            }
        });
    }, {
        threshold: 0.2 // Pemicu saat 20% elemen terlihat
    });

    // Atur elemen untuk diamati
    observer.observe(outerDiv);
}