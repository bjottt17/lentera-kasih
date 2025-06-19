    // Navigation functionality
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');

        // Page navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                
                // Remove active class from all links and pages
                navLinks.forEach(l => l.classList.remove('active'));
                pages.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked link and target page
                this.classList.add('active');
                document.getElementById(targetPage).classList.add('active');
                
                // Close mobile menu if open
                navMenu.classList.remove('active');

                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // CTA button navigation
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                if (targetPage) {
                    // Remove active class from all links and pages
                    navLinks.forEach(l => l.classList.remove('active'));
                    pages.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to target page and corresponding nav link
                    document.getElementById(targetPage).classList.add('active');
                    document.querySelector(`[data-page="${targetPage}"]`).classList.add('active');
                }
            });
        });

        // Mobile menu toggle
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Gallery slider functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const sliderContainer = document.getElementById('slider-container');
        const dotsContainer = document.getElementById('slider-dots');

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        // Auto slide
        setInterval(nextSlide, 5000);


     function openZoom(src) {
    const zoomContainer = document.getElementById("zoom");
    document.getElementById("zoomedImg").src = src;
    zoomContainer.classList.add("active");
}
function closeZoom(e) {
    e?.stopPropagation(); // agar klik tombol tidak ikut men-trigger close dari background
    document.getElementById("zoom").classList.remove("active");
}

        // FAQ functionality
        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('i');
            
            answer.classList.toggle('active');
            icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }

        // Form submissions
        document.getElementById('order-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create WhatsApp message
            let message = `*PEMESANAN BARU - Lentera Kasih*\n\n`;
            message += `Nama: ${data.nama}\n`;
            message += `Telepon: ${data.telepon}\n`;
            message += `Email: ${data.email || 'Tidak diisi'}\n`;
            message += `Alamat: ${data.alamat}\n`;
            message += `Layanan: ${data.layanan}\n`;
            message += `Durasi: ${data.durasi}\n`;
            message += `Mulai: ${data.mulai || 'Segera'}\n`;
            message += `Catatan: ${data.catatan || 'Tidak ada'}`;
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/6281310150505?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan pemesanan.');
        });

        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            let message = `*PESAN BARU - HomeCare Plus*\n\n`;
            message += `Nama: ${data.nama}\n`;
            message += `Email: ${data.email}\n`;
            message += `Subjek: ${data.subject || 'Umum'}\n`;
            message += `Pesan: ${data.message}`;
            
            const whatsappUrl = `https://wa.me/6281310150505?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            alert('Terima kasih! Pesan Anda akan dikirim melalui WhatsApp.');
        });

        function showNewsDetail(title, date, content) {
    document.getElementById('news-title').innerText = title;
    document.getElementById('news-date').innerText = date;
    document.getElementById('news-content').innerHTML = content;
    document.getElementById('news-detail').style.display = 'block';
    document.getElementById('news-detail').scrollIntoView({ behavior: 'smooth' });
}

function closeNewsDetail() {
    document.getElementById('news-detail').style.display = 'none';
}

        // Smooth animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and service cards
        document.querySelectorAll('.card, .service-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';