class Vector2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  multiplyScalar(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }
}

class Time {
  delta: number;
  elapsed: number;
  start: number;
  previous: number;

  constructor() {
    const now = Time.now();

    this.delta = 0;
    this.elapsed = 0;
    this.start = now;
    this.previous = now;
  }

  update() {
    const now = Time.now();

    this.delta = now - this.previous;
    this.elapsed = now - this.start;
    this.previous = now;
  }

  static now() {
    return Date.now() / 1000;
  }
}

class Particle {
  position: Vector2;
  velocity: Vector2;
  color: string;
  radius: number;
  lifetime: number;
  mass: number;
  isInCanvas: boolean;
  createdOn: number;
  static GRAVITATION: Vector2;

  constructor(
    position: Vector2,
    velocity: Vector2 = new Vector2(),
    color: string = "white",
    radius: number = 1,
    lifetime: number = 1,
    mass: number = 1,
  ) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.radius = radius;
    this.lifetime = lifetime;
    this.mass = mass;

    this.isInCanvas = true;
    this.createdOn = Time.now();
  }

  update(time: Time) {
    if (!this.getRemainingLifetime()) {
      return;
    }

    this.velocity.add(Particle.GRAVITATION.clone().multiplyScalar(this.mass));
    this.position.add(this.velocity.clone().multiplyScalar(time.delta));
  }

  render(_canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const remainingLifetime = this.getRemainingLifetime();

    if (!remainingLifetime) return;

    const radius = this.radius * remainingLifetime;

    context.globalAlpha = remainingLifetime;
    context.globalCompositeOperation = "lighter";
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
    context.fill();
  }

  getRemainingLifetime() {
    const elapsedLifetime = Time.now() - this.createdOn;
    return Math.max(0, this.lifetime - elapsedLifetime) / this.lifetime;
  }
}

Particle.GRAVITATION = new Vector2(0, 9.81);

class Trail extends Particle {
  childFactory: (parent: Trail) => Particle;
  children: Particle[];
  isAlive: boolean;

  constructor(
    childFactory: (parent: Trail) => Particle,
    position: Vector2,
    velocity: Vector2 = new Vector2(),
    lifetime: number = 1,
    mass: number = 1,
  ) {
    super(position, velocity);

    this.childFactory = childFactory;
    this.children = [];
    this.lifetime = lifetime;
    this.mass = mass;

    this.isAlive = true;
  }

  update(time: Time) {
    super.update(time);

    if (this.isAlive && this.getRemainingLifetime()) {
      this.children.push(this.childFactory(this));
    }

    this.children = this.children.filter(function (child: Particle) {
      if (child instanceof Trail) {
        return child.isAlive;
      }

      return child.getRemainingLifetime();
    });

    if (!this.children.length) {
      this.isAlive = false;
    }

    this.children.forEach(function (child: Particle) {
      child.update(time);
    });
  }

  render(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.children.forEach(function (child: Particle) {
      child.render(canvas, context);
    });
  }
}

class Rocket extends Trail {
  explosionFactory: (parent: Rocket) => void;

  constructor(
    childFactory: (parent: Trail) => Particle,
    explosionFactory: (parent: Rocket) => void,
    position: Vector2,
    velocity: Vector2 = new Vector2(),
    lifetime: number = 10,
  ) {
    super(childFactory, position, velocity);

    this.explosionFactory = explosionFactory;
    this.lifetime = lifetime;
  }

  update(time: Time) {
    if (this.getRemainingLifetime() && this.velocity.y > 0) {
      this.explosionFactory(this);
      this.lifetime = 0;
    }

    super.update(time);
  }
}

const getTrustParticleFactory = function () {
  function getColor() {
    const hue = Math.floor(Math.random() * 15 + 30);
    return `hsl(${hue}, 100%, 75%`;
  }

  return function (this: Trail) {
    const position = this.position.clone();
    const velocity = this.velocity.clone().multiplyScalar(-0.1);
    velocity.x += (Math.random() - 0.5) * 8;
    const color = getColor();
    const radius = 1 + Math.random();
    const lifetime = 0.5 + Math.random() * 0.5;
    const mass = 0.01;

    return new Particle(position, velocity, color, radius, lifetime, mass);
  };
};

const getExplosionFactory = function (baseHue: number) {
  function getColor() {
    const hue = Math.floor(baseHue + Math.random() * 15) % 360;
    const lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
    return `hsl(${hue}, 100%, ${lightness}%`;
  }

  function getChildFactory() {
    return function (parent: Trail) {
      const direction = Math.random() * Math.PI * 2;
      const force = 8;
      const velocity = new Vector2(
        Math.cos(direction) * force,
        Math.sin(direction) * force,
      );
      const color = getColor();
      const radius = 1 + Math.random();
      const lifetime = 1;
      const mass = 0.1;

      return new Particle(
        parent.position.clone(),
        velocity,
        color,
        radius,
        lifetime,
        mass,
      );
    };
  }

  function getTrail(position: Vector2) {
    const direction = Math.random() * Math.PI * 2;
    const force = Math.random() * 128;
    const velocity = new Vector2(
      Math.cos(direction) * force,
      Math.sin(direction) * force,
    );
    const lifetime = 0.5 + Math.random();
    const mass = 0.075;

    return new Trail(getChildFactory(), position, velocity, lifetime, mass);
  }

  return function (this: Rocket, parent: Rocket): void {
    let trails = 32;
    while (trails--) {
      parent.children.push(getTrail(parent.position.clone()));
    }
  };
};

const addRocket = function () {
  const trustParticleFactory = getTrustParticleFactory();
  const explosionFactory = getExplosionFactory(Math.random() * 360);

  const position = new Vector2(Math.random() * canvas.width, canvas.height);
  const thrust = window.innerHeight * 0.75;
  const angle = Math.PI / -2 + ((Math.random() - 0.5) * Math.PI) / 8;
  const velocity = new Vector2(
    Math.cos(angle) * thrust,
    Math.sin(angle) * thrust,
  );
  const lifetime = 3;

  rockets.push(
    new Rocket(
      trustParticleFactory,
      explosionFactory,
      position,
      velocity,
      lifetime,
    ),
  );

  rockets = rockets.filter(function (rocket: Rocket) {
    return rocket.isAlive;
  });
};

const render = function () {
  requestAnimationFrame(render);

  time.update();
  context.clearRect(0, 0, canvas.width, canvas.height);

  rockets.forEach(function (rocket: Rocket) {
    rocket.update(time);
    rocket.render(canvas, context);
  });
};

const resize = function () {
  const { width } = getComputedStyle(document.body);
  canvas.height = document.documentElement.clientHeight;
  canvas.width = parseFloat(width);
};

const canvas = document.querySelector(".fireworks") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;
const time = new Time();
let rockets: Rocket[] = [];

const currentDate = new Date();
if (currentDate.getDate() === 23 && currentDate.getMonth() === 10) {
  canvas.style.display = "block";

  canvas.onclick = addRocket;
  document.body.appendChild(canvas);

  window.onresize = resize;
  resize();

  setInterval(addRocket, 2000);
  render();
}
