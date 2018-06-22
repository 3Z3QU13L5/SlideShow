/*------ M O D A L ------*/
var modal = {
  currentSlide: null;
  slides: [
    {
      title: 'A stormy sky and ocean',
      imgSrc: 'https://images.unsplash.com/photo-1523977843538-0650e8cb2e7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a43d0d3984b7a6e57716c15ee6fe5797&auto=format&fit=crop&w=1050&q=80" alt="Fort Ebey State Park, Coupeville, United States by Patrick Fore.',
      description: 'Fort Ebey State Park is a 649-acre camping park on Whidbey Island.',
      reference: 'Fort Ebey State Park, Coupeville, United States by Patrick Fore.'
    },
    {
      title: 'Dachstein Mountains',
      imgSrc: 'https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b201ea4f1683a8e092ff153c1b423e78&auto=format&fit=crop&w=1189&q=80" alt="Dachstein Mountains, Obertraun, Austria by Kaidi Guo',
      description: 'The Dachstein Mountains are a mountain range in the Northern Limestone Alps. The term is used by the Austrian Alpine Club in its classification of the Eastern Alps as one of the 24 sub-ranges of the Northern Limestone Alps.',
      reference: 'Dachstein Mountains, Obertraun, Austria by Kaidi Guo'
    },
    {
      title: '',
      imgSrc: 'https://images.unsplash.com/photo-1516524609276-3cb95aa22190?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3d79a0b6dc9683effb116d7e9763bfa2&auto=format&fit=crop&w=1225&q=80" alt="Tõrva, Estonia by Jaak Horn',
      description: '',
      reference: 'Tõrva, Estonia by Jaak Horn'
    },
    {
      title: 'Lutry, Switzerland',
      imgSrc: 'https://images.unsplash.com/photo-1517483141275-296bb15890b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f6fb898eac03ab9abd1137fa691ebe82&auto=format&fit=crop&w=1051&q=80" alt="Lutry, Switzerland by Olivier Fahrni',
      description: 'Lutry is a municipality in the Swiss canton of Vaud, located in the Lavaux-Oron.',
      reference: 'Lutry, Switzerland by Olivier Fahrni'
    },
    {
      title: 'Mirror Lake Trail - Tosemite National Park',
      imgSrc: 'https://images.unsplash.com/photo-1480499484268-a85a2414da81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6d765c5039bd6d36022739e3a6552c44&auto=format&fit=crop&w=1055&q=80" alt="Mirror Lake, Yosemite Valley, United States by Quentin Dr',
      description: 'From the shuttle stop (#17), a paved trail leads directly to Mirror Lake. Which is in the Adirondack Mountains in northern New York in the United States. The lake is approximately 124 acres, with a watershed area of 741 acres.',
      reference: 'Mirror Lake, Yosemite Valley, United States by Quentin Dr'
    },
  ]
}