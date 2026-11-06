/**
 * Three.js 3D Interactive Abstract Technology Composition
 * Ann Maria Sunil Portfolio
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('three-canvas');
  const fallback = document.querySelector('.canvas-fallback');

  if (!canvas || prefersReducedMotion) {
    if (fallback) fallback.style.display = 'flex';
    if (canvas) canvas.style.display = 'none';
    return;
  }

  // Verify Three.js library loaded
  if (typeof THREE === 'undefined') {
    console.info('Three.js CDN not loaded or offline; displaying graceful CSS fallback.');
    if (fallback) fallback.style.display = 'flex';
    if (canvas) canvas.style.display = 'none';
    return;
  }

  try {
    const container = canvas.parentElement;
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Hide fallback if Three initialized successfully
    if (fallback) fallback.style.display = 'none';

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Geodesic Icosahedron Wireframe
    const icosaGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0x22D3EE,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    mainGroup.add(icosaMesh);

    // 2. Vertex Points on outer mesh
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.05,
      transparent: true,
      opacity: 0.85
    });
    const pointsMesh = new THREE.Points(icosaGeometry, pointsMaterial);
    mainGroup.add(pointsMesh);

    // 3. Inner Core Sphere
    const coreGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0B1F35,
      emissive: 0x0891B2,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 4. Orbital Tech Rings
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x22D3EE,
      transparent: true,
      opacity: 0.55
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.3, 0.012, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      transparent: true,
      opacity: 0.35
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Material);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0x071426, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x22D3EE, 3, 20);
    cyanPointLight.position.set(3, 3, 4);
    scene.add(cyanPointLight);

    const skyPointLight = new THREE.PointLight(0x38BDF8, 2, 20);
    skyPointLight.position.set(-3, -2, 2);
    scene.add(skyPointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = (x / rect.width) * 0.8;
      targetY = (y / rect.height) * 0.8;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        mainGroup.rotation.y += deltaX * 0.01;
        mainGroup.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = normX * 0.45;
      targetY = normY * 0.45;
    }, { passive: true });

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let isVisible = true;

    // Pause when offscreen
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const animate = () => {
      requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();

      // Gentle auto-rotation
      if (!isDragging) {
        mainGroup.rotation.y += delta * 0.25;
        mainGroup.rotation.x += delta * 0.12;

        // Smooth ease towards mouse pointer
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        camera.position.x = mouseX * 0.8;
        camera.position.y = mouseY * 0.8;
        camera.lookAt(scene.position);
      }

      // Counter-rotating rings
      ring1.rotation.z += delta * 0.35;
      ring2.rotation.z -= delta * 0.25;

      renderer.render(scene, camera);
    };

    animate();
  } catch (err) {
    console.warn('Three.js initialization notice:', err);
    if (fallback) fallback.style.display = 'flex';
    if (canvas) canvas.style.display = 'none';
  }
})();

