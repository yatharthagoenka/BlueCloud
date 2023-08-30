import { useEffect } from 'react';

const scriptTags = [
  '/assets/vendor/aos/aos.js',
  '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/vendor/swiper/swiper-bundle.min.js',
  '/assets/vendor/purecounter/purecounter_vanilla.js',
  '/assets/vendor/glightbox/js/glightbox.min.js',
  '/assets/vendor/isotope-layout/isotope.pkgd.min.js',
  '/assets/js/main.js'
];

const useLandingScriptsLoader = () => {
  useEffect(() => {
    scriptTags.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false; 
      document.body.appendChild(script);
      return script;
    });

    return () => {
      scriptTags.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);
};

export default useLandingScriptsLoader;
