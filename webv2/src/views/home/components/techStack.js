// import useLandingScriptsLoader from './scriptLoader';
import awsImage from 'src/assets/landing/img/techstack/aws.png';
import nestjsImage from 'src/assets/landing/img/techstack/nestjs.png';
import typescriptImage from 'src/assets/landing/img/techstack/typescript.png';
import dockerImage from 'src/assets/landing/img/techstack/docker.png';
import nginxImage from 'src/assets/landing/img/techstack/nginx.png';
import mongoImage from 'src/assets/landing/img/techstack/mongo.png';
import pythonImage from 'src/assets/landing/img/techstack/python.png';
import reactjsImage from 'src/assets/landing/img/techstack/reactjs.png';

export function TechStack() {
  return (
    <section id="tech_stack" className="techstack">

      <div className="container" data-aos="fade-up">

        <header className="section-header">
          <h2>Tech Stack</h2>
          <p>Technologies used by BlueCloud</p>
        </header>

        <div className="clients-slider swiper">
          <div className="swiper-wrapper align-items-center">
            <div className="swiper-slide"><img src={awsImage} className="img-fluid" alt="AWS" /></div>
            <div className="swiper-slide"><img src={nestjsImage} className="img-fluid" alt="NestJS" /></div>
            <div className="swiper-slide"><img src={typescriptImage} className="img-fluid" alt="TypeScript" /></div>
            <div className="swiper-slide"><img src={dockerImage} className="img-fluid" alt="Docker" /></div>
            <div className="swiper-slide"><img src={nginxImage} className="img-fluid" alt="NGINX" /></div>
            <div className="swiper-slide"><img src={mongoImage} className="img-fluid" alt="MongoDB" /></div>
            <div className="swiper-slide"><img src={pythonImage} className="img-fluid" alt="Python" /></div>
            <div className="swiper-slide"><img src={reactjsImage} className="img-fluid" alt="ReactJS" /></div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

    </section>
  );
}
