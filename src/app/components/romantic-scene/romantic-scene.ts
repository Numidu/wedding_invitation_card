import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-romantic-scene',
  imports: [],
  templateUrl: './romantic-scene.html',
  styleUrl: './romantic-scene.css',
})
export class RomanticScene implements AfterViewInit, OnDestroy {
  @Input()
  mode: 'hero' | 'scroll' = 'hero';

  @HostBinding('class.scroll-mode')
  get isScrollMode(): boolean {
    return this.mode === 'scroll';
  }

  @ViewChild('sceneHost', { static: true })
  private sceneHost!: ElementRef<HTMLDivElement>;

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private rings?: THREE.Group;
  private heartBody?: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhysicalMaterial>;
  private heartGlow?: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;
  private animationId = 0;
  private resizeObserver?: ResizeObserver;
  private scrollProgress = 0;
  private readonly handleScroll = (): void => this.updateScrollProgress();

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.createScene());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('scroll', this.handleScroll);
    this.resizeObserver?.disconnect();
    this.renderer?.dispose();
    this.scene?.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();

      const material = mesh.material;
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
      } else {
        material?.dispose();
      }
    });
  }

  private createScene(): void {
    const host = this.sceneHost.nativeElement;

    try {
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.warn('WebGL is not supported or failed to initialize on this device:', e);
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    this.camera.position.set(0, 0.15, 7.2);

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    host.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xfff2d6, 1.45));

    const keyLight = new THREE.PointLight(0xffddb3, 8, 12);
    keyLight.position.set(-3.4, 3.5, 4.4);
    this.scene.add(keyLight);

    const blushLight = new THREE.PointLight(0xff7f9f, 4.6, 10);
    blushLight.position.set(2.8, -1.8, 3);
    this.scene.add(blushLight);

    this.rings = this.createRings();
    this.scene.add(this.rings);

    this.heartBody = this.createHeartBody();
    this.scene.add(this.heartBody);

    this.heartGlow = this.createHeartParticles();
    this.scene.add(this.heartGlow);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.resize();
    this.updateScrollProgress();
    this.animate();
  }

  private createRings(): THREE.Group {
    const group = new THREE.Group();
    const ringGeometry = new THREE.TorusGeometry(1.08, 0.085, 32, 128);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4c979,
      emissive: 0x5e3513,
      emissiveIntensity: 0.18,
      metalness: 0.92,
      roughness: 0.18,
    });

    const leftRing = new THREE.Mesh(ringGeometry, ringMaterial);
    leftRing.position.set(-0.64, -0.03, 0);
    leftRing.rotation.set(0.28, 0.58, 0.28);
    group.add(leftRing);

    const rightRing = new THREE.Mesh(ringGeometry.clone(), ringMaterial.clone());
    rightRing.position.set(0.64, -0.03, 0);
    rightRing.rotation.set(0.28, -0.58, -0.28);
    group.add(rightRing);

    const gemGeometry = new THREE.OctahedronGeometry(0.25, 1);
    const gemMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff8e8,
      emissive: 0xffd6e2,
      emissiveIntensity: 0.36,
      metalness: 0.2,
      roughness: 0.06,
      transparent: true,
      opacity: 0.94,
    });

    const gem = new THREE.Mesh(gemGeometry, gemMaterial);
    gem.position.set(0, 0.78, 0.06);
    gem.rotation.set(0.6, 0.2, 0.75);
    group.add(gem);

    group.position.set(0, -0.22, 0.24);
    group.scale.setScalar(0.86);

    return group;
  }

  private createHeartBody(): THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhysicalMaterial> {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.72);
    shape.bezierCurveTo(-0.92, 0.15, -1.08, -0.62, -0.5, -0.95);
    shape.bezierCurveTo(-0.18, -1.13, 0.02, -0.9, 0, -0.58);
    shape.bezierCurveTo(-0.02, -0.9, 0.18, -1.13, 0.5, -0.95);
    shape.bezierCurveTo(1.08, -0.62, 0.92, 0.15, 0, 0.72);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 16,
      bevelSize: 0.08,
      bevelThickness: 0.09,
      curveSegments: 36,
      steps: 2,
    });
    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xdb3d63,
      emissive: 0x6f092b,
      emissiveIntensity: 0.26,
      metalness: 0.08,
      roughness: 0.22,
      clearcoat: 0.92,
      clearcoatRoughness: 0.12,
      transparent: true,
      opacity: 0.92,
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.position.set(0, 0.38, 0.14);
    heart.rotation.set(0.06, 0, Math.PI);
    heart.scale.setScalar(0.88);

    return heart;
  }

  private createHeartParticles(): THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let index = 0; index < count; index++) {
      const t = (index / count) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.8;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      positions[index * 3] = (x / 18) * radius;
      positions[index * 3 + 1] = (y / 18) * radius + 0.38;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 1.65;

      color.setHSL(0.94 + Math.random() * 0.05, 0.78, 0.68 + Math.random() * 0.2);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.043,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particles.scale.set(1.42, 1.42, 1.42);

    return particles;
  }

  private updateScrollProgress(): void {
    if (this.mode !== 'scroll') {
      this.scrollProgress = 1;
      return;
    }

    const rect = this.sceneHost.nativeElement.getBoundingClientRect();
    const viewportHeight = Math.max(window.innerHeight, 1);
    const enterPoint = viewportHeight * 0.82;
    const travel = viewportHeight * 0.9;
    const progress = (enterPoint - rect.top) / travel;

    this.scrollProgress = THREE.MathUtils.clamp(progress, 0, 1);
  }

  private resize(): void {
    if (!this.renderer || !this.camera) {
      return;
    }

    const host = this.sceneHost.nativeElement;
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera) {
      return;
    }

    const time = performance.now() * 0.001;
    const progress = this.mode === 'scroll' ? this.scrollProgress : 1;
    const ease = progress * progress * (3 - 2 * progress);

    if (this.rings) {
      this.rings.rotation.y = Math.sin(time * 0.55) * 0.28 + (ease - 0.5) * 0.42;
      this.rings.rotation.x = Math.sin(time * 0.38) * 0.08;
      this.rings.position.y = -0.22 + Math.sin(time * 1.2) * 0.08;
      this.rings.scale.setScalar(0.76 + ease * 0.18);
    }

    if (this.heartBody) {
      const pulse = 1 + Math.sin(time * 2.4) * 0.025;
      this.heartBody.rotation.y = time * 0.26 + ease * 1.15;
      this.heartBody.rotation.z = Math.PI + Math.sin(time * 0.34) * 0.08;
      this.heartBody.position.y = 0.12 + ease * 0.32 + Math.sin(time * 1.3) * 0.035;
      this.heartBody.scale.setScalar((0.42 + ease * 0.72) * pulse);
      this.heartBody.material.opacity = this.mode === 'scroll' ? 0.22 + ease * 0.72 : 0.92;
    }

    if (this.heartGlow) {
      this.heartGlow.rotation.z = Math.sin(time * 0.25) * 0.06;
      this.heartGlow.rotation.y = time * 0.12 + ease * 0.75;
      this.heartGlow.scale.setScalar(1.08 + ease * 0.52 + Math.sin(time * 1.1) * 0.04);
      this.heartGlow.material.opacity = this.mode === 'scroll' ? 0.16 + ease * 0.62 : 0.72;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };
}
