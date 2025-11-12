// Mengambil elemen yang akan dianimasikan
const heroSection = document.querySelector('.chaunima'); 

// --- Animasi Scroll Berbasis Opacity dan Transform ---

// Fungsi yang dipanggil setiap kali event scroll terjadi
function handleScrollAnimation() {
    if (heroSection) {
        // Mendapatkan posisi gulir (scroll) dari bagian atas halaman
        const scrollPosition = window.scrollY;

        // Mendefinisikan titik pemicu. Animasi akan selesai pada 300px guliran.
        const triggerPoint = 300; 

        // 1. Hitung Opacity (Fade Out)
        // Opacity akan berkurang dari 1 menjadi 0 saat scroll dari 0px hingga 300px
        let opacity = 1 - (scrollPosition / triggerPoint);
        
        // Memastikan opacity tidak kurang dari 0
        if (opacity < 0) {
            opacity = 0;
        }

        // Terapkan Opacity
        heroSection.style.opacity = opacity.toString();

        // 2. Hitung Transformasi Y (Slide Up 3D)
        // Elemen akan bergeser ke atas seiring guliran. Kecepatan 0.5 berarti
        // setiap 1px scroll, elemen bergeser 0.5px.
        const slideAmount = scrollPosition * 0.5;

        // Terapkan Transformasi
        // Gunakan translate3d untuk memanfaatkan akselerasi GPU (animasi lebih halus)
        heroSection.style.transform = `translate3d(0, ${-slideAmount}px, 0)`;
        
        // 3. Optional: Hapus event listener jika elemen sudah tidak terlihat
        // Ini menghemat sumber daya setelah animasi selesai
        if (scrollPosition > triggerPoint) {
            heroSection.style.display = 'none'; // Sembunyikan sepenuhnya
        } else {
            heroSection.style.display = 'block';
        }
    }
}

// Menambahkan event listener saat halaman dimuat
window.addEventListener('load', () => {
    // Memastikan elemen memiliki transisi yang halus
    if (heroSection) {
        heroSection.style.transition = 'none'; // Nonaktifkan transisi CSS agar JS bisa mengontrolnya
    }
    // Mendaftarkan event listener untuk guliran
    window.addEventListener('scroll', handleScrollAnimation);
});

// Jalankan sekali saat dimuat untuk mengatur posisi awal yang benar
handleScrollAnimation();