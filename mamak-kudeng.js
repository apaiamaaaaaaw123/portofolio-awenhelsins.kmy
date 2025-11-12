// Ambil semua anak elemen langsung dari <main> (h2, img, a)
const mainChildren = document.querySelectorAll('main > *');
const mainContainer = document.querySelector('main');
const imageElement = document.querySelector('.ketot');

// --- 1. Animasi Unique Load-In untuk Konten Main ---
if (mainContainer) {
    mainContainer.style.perspective = '1000px'; // Mengaktifkan konteks 3D

    mainChildren.forEach((child, index) => {
        // Atur posisi awal dan transisi untuk semua elemen
        child.style.transition = 'all 1.2s ease-out';
        child.style.transformStyle = 'preserve-3d';
        
        // Atur posisi awal tersembunyi dengan rotasi 3D dan blur
        child.style.opacity = '0';
        child.style.transform = `rotateX(180deg) translateY(100px) scale(0.8)`;
        child.style.filter = 'blur(10px)';

        // Terapkan efek kemunculan setelah penundaan berurutan (staggered)
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'rotateX(0deg) translateY(0px) scale(1)';
            child.style.filter = 'blur(0)';
        }, 1000 + (index * 250)); // Penundaan dimulai 1 detik setelah dimuat
    });
}

// --- 2. Animasi "Breathe" Berulang pada Gambar ---
if (imageElement) {
    // Terapkan transformasi yang berulang (Breathe/Pulse)
    let isGrowing = true;
    
    // Memberikan bayangan dinamis
    imageElement.style.transition = 'all 1.5s ease-in-out';
    imageElement.style.boxShadow = '0 0 20px #00ff15';

    setInterval(() => {
        if (isGrowing) {
            imageElement.style.transform = 'scale(1.03) rotate(1deg)'; // Membesar sedikit
            imageElement.style.boxShadow = '0 0 30px #ff00ff'; // Shadow ungu
        } else {
            imageElement.style.transform = 'scale(1) rotate(-1deg)'; // Mengecil sedikit
            imageElement.style.boxShadow = '0 0 20px #00ff15'; // Shadow hijau
        }
        isGrowing = !isGrowing;
    }, 2000); // Berganti setiap 2 detik
}