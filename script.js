/*------ M O D A L ------*/
var modal = {
  currentSlide: null,
  autoPlay: false,
  SLIDE_TIMEOUT: 2000,
  slides: [
    {
      idx: 0,
      title: 'A stormy sky and ocean',
      imgSrc: "img1.jpg",
      description: 'Fort Ebey State Park is a 649-acre camping park on Whidbey Island.',
      reference: 'Fort Ebey State Park, Coupeville, United States by Patrick Fore.'
    },
    {
      idx: 1,
      title: 'Dachstein Mountains',
      imgSrc: "img2.jpg",
      description: 'The Dachstein Mountains are a mountain range in the Northern Limestone Alps. The term is used by the Austrian Alpine Club in its classification of the Eastern Alps as one of the 24 sub-ranges of the Northern Limestone Alps.',
      reference: 'Dachstein Mountains, Obertraun, Austria by Kaidi Guo'
    },
    {
      idx: 2,
      title: '',
      imgSrc: "img3.jpg",
      description: '',
      reference: 'Tõrva, Estonia by Jaak Horn'
    },
    {
      idx: 3,
      title: 'Lutry, Switzerland',
      imgSrc: "img4.jpg",
      description: 'Lutry is a municipality in the Swiss canton of Vaud, located in the Lavaux-Oron.',
      reference: 'Lutry, Switzerland by Olivier Fahrni'
    },
    {
      idx: 4,
      title: 'Mirror Lake Trail - Tosemite National Park',
      imgSrc: "img5.jpg",
      description: 'From the shuttle stop (#17), a paved trail leads directly to Mirror Lake. Which is in the Adirondack Mountains in northern New York in the United States. The lake is approximately 124 acres, with a watershed area of 741 acres.',
      reference: 'Mirror Lake, Yosemite Valley, United States by Quentin Dr'
    },
  ]
}

/*------ C O N T R O L E R ------*/
 var controler = {
    init: function () {
      modal.currentSlide = modal.slides[0];
      
      viewSlide.init();
      viewThumbnail.init();
      viewOptionBar.init();
    },

    getCurrentSlide: function () {
      return modal.currentSlide;
    },

    setCurrentSlide: function (slide) {
      modal.currentSlide = slide;
    },

    getSlides: function () {
      return modal.slides;
    },

    getNextSlide: function () {
      var nextIdx = modal.currentSlide.idx;
      nextIdx++;

      if(nextIdx >= modal.slides.length){
        nextIdx = 0;
      }

      return modal.slides[nextIdx];
    },

    getPrevSlide: function () {
      var prevIdx = modal.currentSlide.idx;
      prevIdx--;
      if(prevIdx < 0){
        prevIdx = (modal.slides.length-1);
      }

      return modal.slides[prevIdx];
    },

    getCurrentSlideIndex: function () {
      return modal.currentSlide.idx;
    },
    
    getAutoPlay: function () {
      return modal.autoPlay;
    },

    setAutoPlay: function (bool) {
      modal.autoPlay = bool;
    },

    getSLIDE_TIMEOUT: function () {
      return  modal.SLIDE_TIMEOUT;
    }
 };

 /*------ V I E W ------*/
 var viewSlide = {
    init: function () {

      this.slideElem = document.querySelector('.slideshow__slide');
      this.slideTitleElem = document.querySelector('.slideshow__title');
      this.slideImgElem = document.querySelector('#slideshow__img');
      this.slideDescriptionElem = document.querySelector('.slideshow__paragraph');
      this.slideReferenceElem = document.querySelector('.slideshow__reference');

      this.slideTitleElem.addEventListener('click', function () {
        viewSlide.slideReferenceElem.style.display = 
              viewSlide.slideReferenceElem.style.display === 'none'? 'block' : 'none';
      })

      this.render();
    },

    render: function () {
      var currentSlide = controler.getCurrentSlide;
      this.slideTitleElem.firstElementChild.textContent = modal.currentSlide.title;
      this.slideImgElem.src = modal.currentSlide.imgSrc;
      this.slideDescriptionElem.firstElementChild.textContent = modal.currentSlide.description;
      this.slideReferenceElem.textContent = modal.currentSlide.reference;
      this.slideImgElem.alt = modal.currentSlide.reference;
    },

    autoRender: function () {
      var slide = controler.getNextSlide();
      controler.setCurrentSlide(slide);
      viewSlide.render();
      viewOptionBar.render();
    }
 };

 var viewThumbnail = {
  init: function () {
    this.elemThumbnails = document.querySelector('.slideshow__thumbnails');

    this.render();
  },

  render: function () {
    var slides = controler.getSlides();

    for(var i = 0; i < slides.length; i++){
      slide = slides[i];

      elemDiv = document.createElement('div');
      elemDiv.classList.add('slideshow__thumbnail-imgs');

      elemImg = document.createElement('img');
      elemImg.src = slide.imgSrc;
      elemDiv.appendChild(elemImg);

      elemDiv.addEventListener('click', (function (fakeSlide) {
        return function () {
          controler.setCurrentSlide(fakeSlide);
          viewSlide.render();
        }
      })(slide));

      this.elemThumbnails.appendChild(elemDiv);
    }
  }

 };

 var viewOptionBar = {
    init: function () {
      this.elemButtonInfo = document.querySelector('.slideshow__button--info');
      this.elemButtonThumbnails = document.querySelector('.slideshow__button--thumbnails');
      this.elemCounter = document.querySelector('.slideshow__counter');
      this.elemButtonPrev = document.querySelector('.slideshow__button--prev');
      this.elemButtonPlay = document.querySelector('#slideshow__playBtn');
      this.elemButtonNext = document.querySelector('.slideshow__button--next');
      var intervalSlides;

      this.elemButtonNext.addEventListener('click', function () {
        var slide = controler.getNextSlide();
        controler.setCurrentSlide(slide);
        viewSlide.render();
        viewOptionBar.render();
      });

      this.elemButtonPrev.addEventListener('click', function () {
        var slide = controler.getPrevSlide();
        controler.setCurrentSlide(slide);
        viewSlide.render();
        viewOptionBar.render();
      });

      this.elemButtonInfo.addEventListener('click', function () {
        if (viewThumbnail.elemThumbnails.style.display === 'block'){
          viewThumbnail.elemThumbnails.style.display = 'none';
        }
        viewSlide.slideDescriptionElem.style.display = 
          viewSlide.slideDescriptionElem.style.display === 'none'? 'block' : 'none';
      });

      this.elemButtonThumbnails.addEventListener('click', function () {
        if (viewSlide.slideDescriptionElem.style.display === 'block'){
          viewSlide.slideDescriptionElem.style.display = 'none';
        }
        viewThumbnail.elemThumbnails.style.display = 
          viewThumbnail.elemThumbnails.style.display === 'none'? 'block' : 'none';
      });

      this.elemButtonPlay.addEventListener('click', function () {
        viewOptionBar.elemButtonPlay.classList.toggle('slideshow__button--play');
        viewOptionBar.elemButtonPlay.classList.toggle('slideshow__button--pause');
        controler.setAutoPlay(!controler.getAutoPlay());
        if(controler.getAutoPlay()){
          viewSlide.autoRender();
          intervalSlides = setInterval(viewSlide.autoRender, controler.getSLIDE_TIMEOUT());  
        } else {
          clearInterval(intervalSlides);
        }
        
      });

      this.render();
    },

    render: function () {
      var counter = modal.currentSlide.idx + 1;
      this.elemCounter.textContent = counter + "/" + modal.slides.length;
    }
 }

 controler.init();