class canvasHelper {
  constructor(canvas) {
    this.canvas = canvas;
    this.three = require("three");
    this.renderer = null;
    this.scene = null;
    this.camera = null;
  }

  initRenderer(width, height) {
    this.renderer = new this.three.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(width, height);
  }

  initScene() {
    this.scene = new this.three.Scene();
  }

  addCamera(
    type = "perspective",
    opt = [75, window.innerWidth / window.innerHeight, 0.1, 1000]
  ) {
    let camera = null;
    switch (type) {
      case "perspective":
        camera = new this.three.PerspectiveCamera(...opt);
    }
    camera.updateProjectionMatrix();
    this.camera = camera;

    this.scene.add(camera);
  }

  makeGeometry() {}

  makeMaterial(type = "standard", opt = { color: "white" }) {
    let m = null;
    switch (type) {
      case "standard":
        m = new this.three.MeshStandardMaterial(opt);
        break;
    }
    return m;
  }

  makeMesh(geometry, material) {}

  loop() {
    const _func = () => {
      const elapsedTime = clock.getElapsedTime();

      this.renderer.render(this.scene, this.camera);
      this.renderer.setAnimationLoop(_func);
    };
  }

  addResizeEvent() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.scene, this.camera);
    });
  }
}

const runCanvas = function (canvas) {
  const helper = new canvasHelper(canvas);
  helper.initRenderer(window.innerWidth, window.innerHeight);
  helper.initScene();
  helper.addCamera();
  helper.addResizeEvent();
};

export default ({ app }, inject) => {
  inject("runCanvas", runCanvas);
};
