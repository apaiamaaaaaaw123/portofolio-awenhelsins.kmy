// Mendapatkan elemen penting dari HTML
const humbergerToggle = document.getElementById('humberger-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');
const header = document.querySelector('.balee');
const body = document.body;

// --- 1. Persiapan Awal Menu (Inline Styling untuk Z-Index) ---

if (navMenu) {
    // KUNCI PERBAIKAN Z-INDEX: Memastikan menu berada di atas semua konten
    navMenu.style.position = 'fixed'; // Posisi relatif terhadap viewport
    navMenu.style.zIndex = '9999';    // Z-Index tertinggi
    navMenu.style.top = `${header ? header.offsetHeight : 60}px`; // Mulai di bawah header
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.height = '100vh';  // Tinggi penuh viewport
    navMenu.style.padding = '0';
    navMenu.style.margin = '0';
    navMenu.style.overflowY = 'auto'; // Agar menu bisa di-scroll jika isinya panjang
    navMenu.style.backgroundColor = 'rgba(2, 149, 255, 0.48)'; // Background semi-transparan (sesuai CSS)
    
    // Animasi Awal: Sembunyikan dan atur transisi
    navMenu.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    navMenu.style.transform = 'translateY(-100%)';
    navMenu.style.opacity = '0';
}

// --- 2. Fungsionalitas Toggle Hamburger Menu ---

humbergerToggle.addEventListener('click', () => {
    humbergerToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
        // Menu terbuka: Tampilkan menu dan kunci scroll pada body
        navMenu.style.transform = 'translateY(0)';
        navMenu.style.opacity = '1';
        body.style.overflow = 'hidden'; // Mencegah scrolling konten belakang
        
        // Animasi tombol (agar terlihat sebagai 'X' jika ada CSS-nya)
        humbergerToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
        humbergerToggle.querySelector('.bar:nth-child(1)').style.transform = 'translateY(8px) rotate(45deg)';
        humbergerToggle.querySelector('.bar:nth-child(3)').style.transform = 'translateY(-8px) rotate(-45deg)';
        

    } else {
        // Menu tertutup: Sembunyikan menu dan buka kembali scroll body
        navMenu.style.transform = 'translateY(-100%)';
        navMenu.style.opacity = '0';
        body.style.overflow = ''; 
        
        // Kembalikan tombol ke tampilan baris
        humbergerToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
        humbergerToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
        humbergerToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
    }
});

// --- 3. Tutup menu saat link diklik ---
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        humbergerToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.transform = 'translateY(-100%)';
        navMenu.style.opacity = '0';
        body.style.overflow = '';
        
        // Kembalikan tombol ke tampilan baris
        humbergerToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
        humbergerToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
        humbergerToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
    });
});