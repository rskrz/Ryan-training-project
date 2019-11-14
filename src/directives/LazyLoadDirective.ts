import {DirectiveOptions} from 'vue'

const directive: DirectiveOptions = {
  inserted: el => {
    function loadImage() {
      var imageElement = Array.from(el.children).find(
        el => el.nodeName === "IMG"
      ) as HTMLEmbedElement;
      if (imageElement) {
        imageElement.addEventListener("load", () => {
          setTimeout(() => el.classList.add("loaded"), 100);
        });
        imageElement.addEventListener("error", () => {
          el.classList.add("error");
        });
        imageElement.src = imageElement.dataset.url!;
      }
    }

    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    };

    function createObserver() {
      const options: IntersectionObserverInit = {
        root: null,
        threshold: 0
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      loadImage();
    }
  }
};

export default directive;
