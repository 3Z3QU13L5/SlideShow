/*------ M O D E L ------*/
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
      if(modal.slides != null){
        modal.currentSlide = modal.slides[0];

        viewSlide.init();
        viewThumbnail.init();
        viewOptionBar.init();  
      }
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

    getSlideTime: function () {
      return  modal.SLIDE_TIMEOUT;
    }
 };

 /*------ V I E W ------*/
 var viewSlide = {
    init: function () {

      this.slideElem = document.querySelector('.slideshow__slide');
      this.slideTitle = document.querySelector('.slideshow__title');
      this.slideImg = document.querySelector('#slideshow__img');
      this.slideDescription = document.querySelector('.slideshow__paragraph');
      this.slideReference = document.querySelector('.slideshow__reference');

      this.slideTitle.addEventListener('click', function () {
        viewSlide.slideReference.style.display = 
              viewSlide.slideReference.style.display === 'none'? 'block' : 'none';
      })

      this.render();
    },

    render: function () {
      var currentSlide = controler.getCurrentSlide;
      this.slideTitle.firstElementChild.textContent = modal.currentSlide.title;
      this.slideImg.src = modal.currentSlide.imgSrc;
      this.slideDescription.firstElementChild.textContent = modal.currentSlide.description;
      this.slideReference.textContent = modal.currentSlide.reference;
      this.slideImg.alt = modal.currentSlide.reference;
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
      this.ButtonInfo = document.querySelector('.slideshow__button--info');
      this.ButtonThumbnails = document.querySelector('.slideshow__button--thumbnails');
      this.Counter = document.querySelector('.slideshow__counter');
      this.ButtonPrev = document.querySelector('.slideshow__button--prev');
      this.ButtonPlay = document.querySelector('#slideshow__playBtn');
      this.ButtonNext = document.querySelector('.slideshow__button--next');
      var intervalSlides;         
      
      this.setListeners();
      this.render();
    },

    render: function () {
      var counter = modal.currentSlide.idx + 1;
      this.Counter.textContent = counter + "/" + modal.slides.length;
    },

    setListeners: function () {

      this.ButtonThumbnails.addEventListener('click', function () {
        if (viewSlide.slideDescription.style.display === 'block'){
          viewSlide.slideDescription.style.display = 'none';
        }
        viewThumbnail.elemThumbnails.style.display = 
          viewThumbnail.elemThumbnails.style.display === 'none'? 'block' : 'none';
      });
      
      this.ButtonNext.addEventListener('click', function () {
        var slide = controler.getNextSlide();
        controler.setCurrentSlide(slide);
        viewSlide.render();
        viewOptionBar.render();
      });

      this.ButtonPrev.addEventListener('click', function () {
        var slide = controler.getPrevSlide();
        controler.setCurrentSlide(slide);
        viewSlide.render();
        viewOptionBar.render();
      });

      this.ButtonInfo.addEventListener('click', function () {
        if (viewThumbnail.elemThumbnails.style.display === 'block'){
          viewThumbnail.elemThumbnails.style.display = 'none';
        }
        viewSlide.slideDescription.style.display = 
          viewSlide.slideDescription.style.display === 'none'? 'block' : 'none';
      });

      this.ButtonPlay.addEventListener('click', function () {
        viewOptionBar.ButtonPlay.classList.toggle('slideshow__button--play');
        viewOptionBar.ButtonPlay.classList.toggle('slideshow__button--pause');
        controler.setAutoPlay(!controler.getAutoPlay());
        if(controler.getAutoPlay()){
          viewSlide.autoRender();
          intervalSlides = setInterval(viewSlide.autoRender, controler.getSlideTime());  
        } else {
          clearInterval(intervalSlides);
        }
        
      });
    }
 }

 controler.init();