document.addEventListener('DOMContentLoaded', () => {
    // Cinematic Intro - Only runs on index.html
    const intro = document.getElementById('intro-overlay');
    if (intro &&!sessionStorage.getItem('introPlayed')) {
        document.getElementById('logo-svg').innerHTML = `
            <circle cx="50" cy="50" r="40" stroke="#D4AF37" stroke-width="3" fill="none" 
                    stroke-dasharray="251" stroke-dashoffset="251">
                <animate attributeName="stroke-dashoffset" from="251" to="0" dur="2s" fill="freeze" />
            </circle>
            <text x="50" y="58" text-anchor="middle" font-size="24" fill="#D4AF37" 
                  font-family="Playfair Display" opacity="0">
                BB
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.5s" fill="freeze" />
            </text>`;
        
        const introText = document.getElementById('intro-text');
        const tagline = document.getElementById('intro-tagline');
        setTimeout(() => {
            let text = "Beauty Bakery";
            let i = 0;
            const type = setInterval(() => {
                introText.textContent += text[i];
                i++;
                if (i === text.length) {
                    clearInterval(type);
                    tagline.style.opacity = '1';
                }
            }, 100);
        }, 2000);
        
        setTimeout(() => {
            intro.style.opacity = '0';
            setTimeout(() => intro.style.display = 'none', 1000);
            sessionStorage.setItem('introPlayed', 'true');
        }, 6500);
        
        document.getElementById('skip-intro').onclick = () => {
            intro.style.display = 'none';
            sessionStorage.setItem('introPlayed', 'true');
        };
    } else if (intro) {
        intro.style.display = 'none';
    }

    // WhatsApp Order Form - Only runs on order.html
    const form = document.getElementById('order-form');
    const btn = document.getElementById('whatsapp-btn');
    
    if (form && btn) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        const checkValid = () => {
            btn.disabled =!Array.from(inputs).every(i => i.value.trim());
        };
        inputs.forEach(input => input.addEventListener('input', checkValid));
        checkValid();

        form.onsubmit = (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                area: document.getElementById('area').value,
                size: document.getElementById('size').value,
                flavors: document.getElementById('flavors').value,
                date: document.getElementById('date').value,
                desc: document.getElementById('description').value
            };
            
            const msg = `*New Cake Order - Beauty Bakery*%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*Delivery Area:* ${data.area}, Lagos%0A*Cake Size:* ${data.size}%0A*Flavors:* ${data.flavors}%0A*Date Needed:* ${data.date}%0A%0A*Details:*%0A${data.desc}`;
            
            window.open(`https://wa.me/2349058095782?text=${msg}`, '_blank');
        };
    }

    // Menu Page Logic - Only runs on menu.html
    const menuItems = document.getElementById('menu-items');
    if (menuItems) {
        const cakes = {
            birthday: [
                {name: 'Pink Rosette Dream', price: '₦15,000', img: 'images/image_512ec4.jpeg'},
                {name: 'Royal Gold Queen', price: '₦18,000', img: 'images/image_badfa4.jpeg'},
                {name: 'Sprinkle Celebration', price: '₦16,000', img: 'images/image_e4e643.jpeg'}
            ],
            wedding: [
                {name: 'Elegant 2-Tier', price: '₦80,000', img: 'images/image_817050.jpeg'},
                {name: 'Classic White Tier', price: '₦95,000', img: 'images/image_512ec4.jpeg'}
            ],
            cupcakes: [
                {name: 'Box of 6', price: '₦7,000', img: 'images/image_e4e643.jpeg'},
                {name: 'Box of 12', price: '₦12,000', img: 'images/image_badfa4.jpeg'}
            ],
            custom: [
                {name: 'Your Design', price: 'From ₦20,000', img: 'images/image_512ec4.jpeg'}
            ]
        };

        const renderMenu = (cat) => {
            menuItems.innerHTML = cakes[cat].map(cake => `
                <div class="menu-card">
                    <img src="${cake.img}" alt="${cake.name}">
                    <div class="menu-info">
                        <h3>${cake.name}</h3>
                        <p class="price">${cake.price}</p>
                        <button class="cta-btn" onclick="window.open('https://wa.me/2349058095782?text=Hi! I want to order: ${cake.name} - ${cake.price}', '_blank')">Order via WhatsApp</button>
                    </div>
                </div>
            `).join('');
        };

        renderMenu('birthday');
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderMenu(btn.dataset.cat);
            };
        });
    }
});
