import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './home.css';
import img1 from './assets/homeBackground.jpg';
import img2 from './assets/portfolioImg.png';
import img3 from './assets/skillBackGround.png';
import img4 from './assets/linkdin.png';
import img5 from './assets/github.png';
import img6 from './assets/google.png';

// Custom hook without TypeScript annotations
const useTypewriter = (texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && currentText === texts[currentTextIndex]) {
      // Finished typing - pause then start deleting
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === '') {
      // Finished deleting - move to next text
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        setCurrentText(texts[currentTextIndex].slice(0, currentText.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime]);

  return currentText;
};



function Home() {
  const [count, setCount] = useState(0);
  const aboutSectionRef = useRef(null);
  const downloadLinkRef = useRef(null); 
  const contactSectionRef = useRef(null); 
  const skillsSectionRef = useRef(null); 
  const introSectionRef = useRef(null); 
  const portfolioSectionRef = useRef(null); 
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToportfolio = () => {
    if (portfolioSectionRef.current) {
      portfolioSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToSkills = () => {
    if (skillsSectionRef.current) {
      skillsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToIntro = () => {
    if (introSectionRef.current) {
      introSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Use the typewriter hook
  const typedText = useTypewriter([
    'im a full stack developer', 
    "Im a backend developer", 
    'i love javascript & typescript', 
    'i love React & node.js', 
    'i love React native'
  ], 100, 50, 2000);

  // Download CV function
  const handleDownload = () => {
    downloadLinkRef.current?.click();
  };

  // Intersection Observer for About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Mohammed Adham Portfolio</title>
        <meta name="description" content="Portfolio work experience about me" />
      </Helmet>

      <main className='body'>
        {/* Hidden download link - place this at the top level */}
        <a 
          ref={downloadLinkRef}
          href="/cv.png"
          download="Mohammed-Adham-CV.png"
          style={{ display: 'none' }}
        />

        {/* Intro Section */}
        <div className="intro-body-homepage">
          <header className='header' itemScope itemType="https://schema.org/WPHeader">
            <span id="logo" className='tags' itemProp="name">Mohammed</span>
            <Link to="/" className='tags' itemProp="url"  onClick={scrollToIntro}>Home</Link>
            <Link to="/" className='tags' itemProp="url" onClick={scrollToAbout}>About</Link>
            <Link to="/" className='tags' itemProp="url"  onClick={scrollToSkills}>Skills</Link>
            <Link to="/" className='tags' itemProp="url " onClick={scrollToportfolio}>Portfolio</Link>
            
            <Link to="/" className='tags' itemProp="url" onClick={scrollToContact}>Contact</Link>
          </header>
          
          <div className="home-image-container">
            <img 
              className='home-image-background' 
              src={img1} 
              alt="Home background"
            />
          </div>

          <div className='intro-body-homepage-titlesContainer'>
            <h2 className='intro-body-homepage-titles-one'>Hello,</h2>
            <h2 className='intro-body-homepage-titles-two'>I'm mohammed adham</h2>
            <h2 className='intro-body-homepage-titles-three'>Mahmoud</h2>
            <div className="typewriter-container">
              <h2 className='intro-body-homepage-typed-text'>{typedText}</h2>
            </div>

            {/* FIXED: Move the button container here and remove duplicate about section */}
            <div className='intro-body-homepage-buttonContainer'>
            <button className='about-button' onClick={scrollToContact}>
  Contact Me
</button>
  <button className='download-button' onClick={handleDownload}>
    Download CV
  </button>
</div>
          </div>

          <div className='home-image-portfolio-div'>
            <img className='image-portfolio-intro' src={img2} alt="portfolio image" />
          </div>
        </div>

        {/* About Section with Animation */}
        <div 
          ref={aboutSectionRef}
          className={`about-section-body-homepage ${isAboutVisible ? 'fade-in-visible' : ''}`}
        >
          <div className="about-section-body-homepage-title-container">
            <p className="about-section-body-homepage-title">About Me</p>
          </div>

          <div className="about-section-body-homepage-imgText-container">
            <div className="about-section-body-homepage-img-container">
              <img className='image-portfolio-about' src={img2} alt="portfolio image" />
            </div>

            <div className='about-section-body-description-div'>
              <p className='about-section-body-descriptions'>
                I'm a full stack developer with 3 years of experience in software 
                engineering in multiple full stack projects.
              </p>
              
              <p className='about-section-body-descriptions'>
                I have worked with the company Outlier.ai and built several full 
                stack websites using React, React Native, JavaScript, Node.js, 
                MySQL, MongoDB, HTML, CSS, Python, and WordPress, and ensured best
                practices. I'm an experienced full stack developer with multiple 
                projects worked on, including the website{" "}
                <a 
                  href="https://www.buildurpc.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline', textDecoration: 'underline' }}
                >
                  buildurpc.org
                </a>{" "}
                and its <a    
                  href="https://github.com/rily1243/buildurpc-react-native-version" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline', textDecoration: 'underline' }} 
                >
                  React Native version
                </a>, and a multi-vendor bicycle website created
                using WordPress, and many more. I will make sure this company gets
                the website developer it deserves by meeting deadlines, creating 
                professional applications, and ensuring best practices both back end 
                and front end.
              </p>

              <p className='about-section-body-descriptions'>
                Are you looking for a professional software developer? Look no further,
                I'm at your service.
              </p>

              <div className='about-body-homepage-buttonContainer'>
                <button className='about-button' onClick={scrollToContact}>Contact Me</button>
                <button className='download-button' onClick={handleDownload}>Download CV</button>
              </div>
            </div>
          </div>
        </div>




        <div className='skill-section-homePage' ref={skillsSectionRef}>
    {/* Same structure as intro section */}
    <div className="skill-image-container">
        <img 
            className='home-image-background-skills' 
            src={img3} 
            alt="Skills background"
        />
    </div>






    <div className='skill-body-homepage-titlesContainer'>
        <h2 className='skills-section-titles-one'>My Skills & Tech Stacks</h2>
        <p className='skills-section-titles-two'>Below are some of the tech stacks I can work with perfectly.</p>
    </div>

    <div className='skill-section-homePage-container'>



        <div className='skills-list'>





        <div className='skills-list-items'>


        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">1</h2>
            
              <p className='skills-list-text'>JavaScript</p>
           
        </section>


        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">2</h2>
            
              <p className='skills-list-text'>React.js</p>
           
        </section>


        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">3</h2>
            
              <p className='skills-list-text'>React Native</p>
           
        </section>


        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">4</h2>
            
              <p className='skills-list-text'>Typescript</p>
           
        </section>




        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">5</h2>
            
              <p className='skills-list-text'>Node.js</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">6</h2>
            
              <p className='skills-list-text'>Python</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">7</h2>
            
              <p className='skills-list-text'>MySql</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">8</h2>
            
              <p className='skills-list-text'>MongoDB</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">9</h2>
            
              <p className='skills-list-text'>HTML & CSS</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">10</h2>
            
              <p className='skills-list-text'>Git & GitHub</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">11</h2>
            
              <p className='skills-list-text'>API Design</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">12</h2>
            
              <p className='skills-list-text'>Responsive Web Design</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">13</h2>
            
              <p className='skills-list-text'>SEO & Digital Marketing</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">14</h2>
            
              <p className='skills-list-text'>Google Cloud Platform</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">15</h2>
            
              <p className='skills-list-text'>Test-driven development (TDD)</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">16</h2>
            
              <p className='skills-list-text'>Webpack & Babel</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">17</h2>
            
              <p className='skills-list-text'>WordPress</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">18</h2>
            
              <p className='skills-list-text'>React Testing library</p>
           
        </section>

        <section className='skills-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">19</h2>
            
              <p className='skills-list-text'>Google AppEngine & Computer Engine</p>
           
        </section>

        <section className='skills-list-sections'  itemScope itemType="https://schema.org/BlogPosting">    
              
             
              <h2 className='skills-list-numbers' itemProp="headline">20</h2>
            
              <p className='skills-list-text'>Material UI</p>
           
        </section>

       </div>





       </div>





    
</div>
</div>



<div className='speciality-section-container' ref={portfolioSectionRef}>
  <div className="speciality-section-header">
    <div className="speciality-section-line left-line"></div>
    <div className="speciality-section-title-container">
      <p className="speciality-section-title" onClick={handleDownload}>My CV</p>
    </div>
    <div className="speciality-section-line right-line"></div>
  </div>

  <div className='speciality-section-detail-container'>
    <div className="speciality-image-container">
      <img 
        className='home-image-background-speciality' 
        src={img3} 
        alt="Skills background"
      />
    </div>

    <p className='speciality-section-titles-one'>My Specialties</p>

    <div className='speciality-list'>
      <div className='speciality-list-items'>
        <section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
          <h2 className='speciality-list-numbers' itemProp="headline">1</h2>
          <h2 className='speciality-list-titles'>Backend Development</h2>
          <p className='speciality-list-text'>Building, maintaining web applications and managing hosting environments.</p>
        
        </section>

        <section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
          <h2 className='speciality-list-numbers' itemProp="headline">2</h2>
          <h2 className='speciality-list-titles'>Frontend Development</h2>
          <p className='speciality-list-text'>Design and development of clean and maintainable interactive user interfaces using modern libraries and frameworks such as React JS & React Native.</p>
          
        </section>

        <section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
          <h2 className='speciality-list-numbers' itemProp="headline">3</h2>
          <h2 className='speciality-list-titles'>Responsive Design</h2>
          <p className='speciality-list-text'>Design and development of mobile-friendly responsive designs that work seamlessly on mobile devices.</p>
        </section>

        <section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
          <h2 className='speciality-list-numbers' itemProp="headline">4</h2>
          <h2 className='speciality-list-titles'>Api Integration & Development</h2>
          <p className='speciality-list-text'>Developing & integrating Backend functionality to communicate easily between servers and applications or websites.</p>
          
        </section>

        

      </div>

    </div>

    
    <div className="speciality-section-line-workHistory"></div>

      <div className='work-history-container'>

      <p className='work-history-title'>My Work History</p>
      
         <section className='work-history-sections'>


        <h2 className='work-list-titles'>AI Training Engineer(Remote)</h2>

          <p className='work-list-text'>USA</p>

          <p className='work-list-text'>Training AI models to write code and fix software problems. Developing backend and frontend functionality using technologies such as React.js, MySQL, MongoDB, Node.js, Python, etc., 
          with the company Outlier.</p>

         </section>



         <section className='work-history-sections'>


<h2 className='work-list-titles'>Full Stack Developer</h2>

  <p className='work-list-text'>Egypt Cairo</p>

  <p className='work-list-text'>Full stack developer for the website buildurpc.org, including front end and backend functionality and blog structure optimization for SEO.</p>

 </section>



         <section className='work-history-sections'>

         <h2 className='work-list-titles'>Full Stack Developer</h2>

<p className='work-list-text'>Egypt Cairo</p>

<p className='work-list-text'>Full stack developer for a WordPress website Bicycle Bazaar, including front end and backend functionality and blog structure optimization for SEO and plugin integration.</p>

         </section>



        



      </div>

      <div className="speciality-section-line-workHistory"></div>

      <p className='work-history-title'>Education</p>

      <section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
          
          <h2 className='speciality-list-titles-education'>High School diploma Glory International School</h2>
          
        
        </section>

        <div className="speciality-section-line-workHistory"></div>

        <p className='work-history-title'>My CV</p>

<section className='speciality-list-sections' itemScope itemType="https://schema.org/BlogPosting">    
    
<button className='download-button-workHistory-section' onClick={handleDownload}>Download CV</button>

  
  </section>
    
  </div>
  




</div>









<div 
  ref={contactSectionRef} // ADD THIS LINE
  className='contact-container'
>

  

<div className="Contact-section-body-homepage-title-container">
  
            <p className="Contact-section-body-homepage-title">Contact me bellow</p>
          </div>



          <div className='socials-contact-container'>

          <p className='socials-contact-title'>Thank you for coming this far. You can find me on social media below.</p>


          <div className='socials-contact-sections-container'> 



            <section className='linkdin-section-socials'>


            <img 
              className='linkdin-logo-contact' 
              src={img4} 
              alt="Skills background"
              
              />

<p className='linkdin-section-text' > <a target='blank' href='https://www.linkedin.com/in/mohammed-adham-0457ab273/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BmIadNP6ETIC%2ByvDw8ofs1g%3D%3D'>LINKDIN</a> </p>

            </section>



            <section className='git-section-socials'>

            <img 
              className='git-logo-contact' 
              src={img5} 
              alt="Skills background"
              />

<p className='git-section-text'>
<a target='blank' href='https://github.com/rily1243'>GITHUB</a> </p>

            </section>



            <section className='email-section-socials'>

<img 
  className='email-logo-contact' 
  src={img6} 
  alt="Skills background"
  />

<p className='email-section-text'>
rily1243@gmail.com
</p>

</section>







          </div>

          

          </div>



</div>













      </main>
    </>
  );
}

export default Home;