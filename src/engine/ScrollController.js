export class ScrollController {
  constructor(sceneRegistry) {
    this.sceneRegistry = sceneRegistry;
    this.initObserver();
  }

  initObserver() {
    const options = { root: null, rootMargin: '0px', threshold: 0.3 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sceneId = entry.target.getAttribute('data-scene');
          if (sceneId) {
            // Lazy load the scene via registry, then activate it
            this.sceneRegistry.load(sceneId).then(scene => {
              if (scene && this.sceneRegistry.engine) {
                this.sceneRegistry.engine.sceneManager.activateScene(sceneId);
              }
            });
          }
        }
      });
    }, options);
    
    document.querySelectorAll('[data-scene]').forEach(el => {
      this.observer.observe(el);
    });
  }
}
