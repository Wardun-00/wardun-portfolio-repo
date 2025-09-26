document.addEventListener('DOMContentLoaded', () => {

    // --- কাস্টম কার্সার ইফেক্ট ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });
    
    // --- 3D ব্যাকগ্রাউন্ড সিন ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-container').appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry;
    const particlesCnt = 5000;
    const posArray = new Float32Array(particlesCnt * 3);

    for(let i = 0; i < particlesCnt * 3; i++) {
        // একটু ছড়ানো-ছিটানো এবং গভীরতার অনুভূতি দিতে x, y, z এর মান পরিবর্তন করা হলো
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x3b82f6 // primary-color
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 1.5; // ক্যামেরা একটু কাছে আনা হলো

    // মাউস মুভমেন্টের সাথে ইন্টারঅ্যাকশন
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        particlesMesh.rotation.y = mouseX * 0.2;
        particlesMesh.rotation.x = mouseY * 0.2;
    });

    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });


    // --- স্ক্রল অ্যানিমেশন ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-anim');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden-anim');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- রেজিউমে ট্যাব কার্যকারিতা ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
        });
    });

});