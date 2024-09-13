const branddashboard = document.querySelector(".brand-dashboard");
const nav = document.querySelector(".navigation")

// Animation Astra icon on BEGINING
function buttonOnStated() {
  document.querySelector('.start-btn').addEventListener('click', function() {
    gsap.to('.btn-text', { yPercent: -100, opacity: 0 })
    gsap.to('.logo-mask', 1, { scale: 200, yPercent: -800, delay: 0.3, ease: "power2.in" });
    gsap.to('.logo-mask', { delay:0.8, display: 'none' });
    gsap.to(this, { autoAlpha: 0, display: "none", delay: 1 })
    gsap.to('.bg-overlay', { opacity: 0, delay: 0.8 });
    gsap.to('.navy-overlay', { delay: 1, visibility: 'visible', opacity: 1, ease: "power2.out" });
    gsap.to(nav, { delay:0.8, opacity: 1, display: 'flex' });
  
    // show Navigation after button clicked
    gsap.to('.logo-home', { autoAlpha: 1, delay: 1.3 });
    gsap.to('.cta-button', { autoAlpha: 1, delay: 1.3 });
    gsap.to('.next-prev-wrapper', { autoAlpha: 1, delay: 1.4 });
    gsap.to('.brand-wrapper', { display: 'block', autoAlpha: 1, delay: 1.4 } );
    gsap.to('.line-divider', { display: 'block', autoAlpha: 1, delay: 1.4 } );
    // branddashboard.classList.add("isActive");
  }) 
}

// Toggle Menu to view Astra and Hongkongland
const brands = document.querySelectorAll('.opt-btn');
const btnback = document.querySelector('.prev-nav');
const btnnext = document.querySelector('.next-nav');

// Function to disable buttons
function disableButtons() {
  brands.forEach(brand => {
    brand.disabled = true;
  });
}

// Function to enable buttons
function enableButtons() {
  brands.forEach(brand => {
    brand.disabled = false;
  });
}


for (let i = 0; i < brands.length; i++) {
  brands[i].addEventListener('click', function() {
    const isActive = this.classList.contains('active');
    
    // Remove 'active' class from all elements if none are active
    if (!isActive) {
      for (let j = 0; j < brands.length; j++) {
        brands[j].classList.remove('active');
      }
    }
    
    // Disable buttons during transition
    disableButtons();

    // Toggle 'active' class on the clicked element
    this.classList.toggle('active');
    
    // Determine animation direction based on toggle state
    const direction = isActive ? -1 : 1;
    const opacity = isActive ? 1 : 0;
    const xGreyscale = isActive ? "100%" : "50%"

    
    if (this.id === 'hongkong') {
      gsap.to('.navy-overlay', {
        duration: 1,
        delay: 0.5,
        xPercent: isActive ? 0 : 50,
        ease: "power2.out",
        onComplete: enableButtons  // Enable buttons after animation finishes
      });

      gsap.to('.left-content-wrapper', {
        duration: 1,
        delay: isActive ? 1.3 : 0,
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "flex",
      });

      gsap.to('.left-content', {
        duration: 0.5,
        y: isActive ? "0%" : "-50%",
        delay: isActive ? 1 : 0,
        opacity: opacity,
        display: isActive ? 'block' : 'none'
      });

      gsap.to('.left-greyscale', {
        duration: 0.3,
        x: isActive ? "-100%" : "-50%"
      });

      gsap.fromTo('.brand-content-left', {
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "block",
        y: direction === 1 ? '-100px' : '0px',
        duration: isActive ? 0.5 : 1,
      }, {
        delay: isActive ? 0 : 0.75,
        duration: isActive ? 0.5 : 1,
        opacity: direction === 1 ? 1 : 0,
        display: direction === 1 ? "block" : "none",
        y: direction === 1 ? '0px' : '-100px'
      });

    } else {
      gsap.to('.navy-overlay', {
        duration: 1,
        delay: 0.5,
        xPercent: isActive ? 0 : -50,
        ease: "power2.out",
        onComplete: enableButtons  // Enable buttons after animation finishes
      });

      gsap.to('.right-content-wrapper', {
        duration: 1,
        delay: isActive ? 1.3 : 0,
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "flex"
      });

      gsap.to('.right-content', {
        duration: 0.5,
        y: isActive ? "0%" : "-50%",
        delay: isActive ? 1 : 0,
        opacity: opacity,
        display: isActive === 1 ? 'none' : 'block'
      });

      gsap.to('.right-greyscale', {
        duration: 0.3,
        x: xGreyscale
      });

      gsap.fromTo('.brand-content-right', {
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "block",
        y: direction === 1 ? '-100px' : '0px'
      }, {
        delay: isActive ? 0 : 0.75,
        duration: isActive ? 0.5 : 1,
        opacity: direction === 1 ? 1 : 0,
        display: direction === 1 ? "block" : "none",
        y: direction === 1 ? '0px' : '-100px'
      });
    }

  });
}

// Play video on each slides
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If slide go to the viewport, play the video
      if (entry.isIntersecting) {
        const video = entry.target.querySelector('video');
        if (video) {
          video.play();
          video.muted = false
        }
      } else {
        // If exit slide, pause the video
        const video = entry.target.querySelector('video');
        if (video) {
          video.pause();
          video.muted = true
        }
      }
    });
  }, { threshold: 0.5 }); 

  // List of slides class
  const slides = document.querySelectorAll('.slides');

  // Loop the slides
  slides.forEach(slide => {
    observer.observe(slide);
  });
});

document.querySelectorAll('video.clustervideo, #starterVideo').forEach((video) => {
  const fadeDuration = 1; // Duration in seconds for audio fade-in/out
  const fadeOutTime = 2; // Time in seconds before the end to start fading out

  // Function to gradually increase the volume (fade-in)
  function fadeIn(video) {
    video.classList.add('fade-in');
    video.classList.remove('fade-out');
    video.volume = 0;

    const volumeInterval = setInterval(() => {
      if (video.volume < 1) {
        video.volume = Math.min(video.volume + 0.1, 1);
      } else {
        clearInterval(volumeInterval);
      }
    }, fadeDuration * 100); // Adjust this to match the desired fade-in duration
  }

  // Function to gradually decrease the volume (fade-out)
  function fadeOut(video) {
    const volumeInterval = setInterval(() => {
      if (video.volume > 0) {
        video.volume = Math.max(video.volume - 0.1, 0);
      } else {
        clearInterval(volumeInterval);
      }
    }, fadeDuration * 100); // Adjust this to match the desired fade-out duration
  }

  // Fade in when the video starts
  video.addEventListener('play', () => {
    fadeIn(video);
  });

  // Fade out when the video is about to end
  video.addEventListener('timeupdate', () => {
    if (video.duration - video.currentTime <= fadeOutTime) {
      video.classList.add('fade-out');
      fadeOut(video);
    } else {
      video.classList.remove('fade-out');
    }
  });

  // Reset volume and fade in again when the video loops
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play(); // Automatically restart the video if it's looping
    fadeIn(video);
  });

  // Ensure the video starts with fade-in if it's auto-playing or triggered programmatically
  if (!video.paused && video.readyState >= 2) {
    fadeIn(video);
  }
});


gsap.to(".ring", {
  scale: 1.75,
  opacity: 0,
  duration: 3,
  stagger: {
    each: 0.5,
    repeat: -1
  }
});

// Click events on Milestone Section
document.querySelectorAll('.picker-items').forEach((pickerItem, index) => {
  pickerItem.addEventListener('click', function() {
    const selectedImg = pickerItem.getAttribute('data-img');
    const moreBtn = pickerItem.querySelector('.link-to-project');

    // Remove highlight from all previously highlighted elements
    document.querySelectorAll('.picker-items, .logo-items-wrapper').forEach(item => {
      item.classList.remove('highlight');
      const linkToProject = item.querySelector('.link-to-project');
      if (linkToProject) {
        gsap.to(linkToProject, 0.5, { y: 100, opacity: 0, display: 'none' });
      }
    });

    // Highlight the clicked picker item
    pickerItem.classList.add('highlight');
    if (moreBtn) {
      gsap.to(moreBtn, 0.5, { y: 0, opacity: 1, display: 'flex', ease: "elastic.out(1,0.5)" });
    }

    const correspondingLogoItem = document.querySelector(`.logo-items-wrapper[data-img="${selectedImg}"]`);
    if (correspondingLogoItem) {
      correspondingLogoItem.classList.add('highlight');
    }

    // Determine the index of the clicked picker item
    const selectedIndex = index + 3; // Offset by 3 to account for the first three sections (mainpage, about, milestone)
    const anyPickerHighlighted = Array.from(document.querySelectorAll('.picker-items')).some(item => item.classList.contains('highlight'));
  });
});

document.querySelectorAll('.logo-items-wrapper').forEach((item, index) => {
  item.addEventListener('click', function() {
    const selectedImg = item.getAttribute('data-img');
    const correspondingPickerItem = document.querySelector(`.picker-items[data-img="${selectedImg}"]`);
    const moreBtn = correspondingPickerItem.querySelector('.link-to-project');

    // Remove highlight from all previously highlighted elements
    document.querySelectorAll('.picker-items, .logo-items-wrapper').forEach(element => {
      element.classList.remove('highlight');
      const linkToProject = element.querySelector('.link-to-project');
      if (linkToProject) {
        gsap.to(linkToProject, 0.5, { y: 100, opacity: 0, display: 'none' });
      }
    });

    // Highlight the clicked logo item
    item.classList.add('highlight');
    if (moreBtn) {
      gsap.to(moreBtn, 0.5, { y: 0, opacity: 1, display: 'flex', ease: "elastic.out(1,0.5)" });
    }

    if (correspondingPickerItem) {
      correspondingPickerItem.classList.add('highlight');
    }

    // Determine the index of the clicked picker item
    const selectedIndex = index + 3; // Offset by 3 to account for the first three sections (mainpage, about, milestone)
  });
});


// Main Slide Navigator
let currentIndex = 0;
let sections = document.querySelectorAll('section.slides');

function hideNavigation() {
  if (currentIndex >= 3) {
    document.querySelector('.next-prev-wrapper').style.display = 'none';
  } else {
    document.querySelector('.next-prev-wrapper').style.display = 'flex';
  }
}

const itemsNav = document.querySelectorAll('.nav-slide');

function showNavigationItems() {
  itemsNav.forEach((itemNav, i) => {
    itemNav.style.display = 'none'
    
    if (currentIndex >= 3) {
      itemNav.style.display = 'flex';
    } else {
      itemNav.style.display = 'none';
    }
  })
}

function hidePrevButton() {
  if (currentIndex === 0) {
    btnback.classList.add('nav-disabled')
    document.querySelector('.translate-switch').style.display = 'flex'
  } else {
    btnback.classList.remove('nav-disabled')
    document.querySelector('.translate-switch').style.display = 'none'
  }
}

function hideMilestoneNav() {
  if (currentIndex === 2) {
    document.querySelector('.cta-button').style.visibility = 'hidden'
    btnnext.classList.add('nav-disabled')
  } else {
    document.querySelector('.cta-button').style.visibility = 'visible'
    btnnext.classList.remove('nav-disabled')
  }
}


// Show each sections based on Index
function showSection(index) {
  // Hide All Sections
  sections.forEach(function(section) {
    section.style.display = 'none';
  });
  // Show Current sections index
  sections[index].style.display = 'block';

  const slideItems = sections[index].querySelectorAll('.slides-items');
  let activeIndex = 0;
  
  slideItems.forEach((item, i) => {
    if (i === 0) {
      item.style.display = 'block'; // Show the first slide items
      item.classList.add('active'); 
    } else {
      item.style.display = 'none'; // Hide the rest of slide items
      item.classList.remove('active');

      const breadCrump = item.querySelector('.breadcrump-items'); // Get the first breadcrumb element within the current slide item
      const contents = item.querySelector('.content');

      if (breadCrump) {
        breadCrump.classList.add('is-Active'); // Add the class 'is-Active' to the first breadcrumb element
        // console.log('Added is-Active class to breadcrumb:', breadCrump); // Debugging: Check if class is added
      }

      if (contents) {
        contents.classList.add('d-block'); // Add the class 'is-Active' to the first breadcrumb element
        // console.log('Added is-Active class to breadcrumb:', contents); // Debugging: Check if class is added
      }
    }
  });

  const prevBtns = sections[index].querySelectorAll('.prev-slide');
  prevBtns.forEach(prevBtn => {
    prevBtn.addEventListener('click', function() {
      console.log('currentIndex',currentIndex)
      console.log('activeIndex',activeIndex)
      if (activeIndex > 0) {
        slideItems[activeIndex].style.display = 'none';
        slideItems[activeIndex].classList.remove('active');
        activeIndex--;
        slideItems[activeIndex].style.display = 'block';
        slideItems[activeIndex].classList.add('active');
      }
      updateNavigation(prevBtns, nextBtns, activeIndex, slideItems.length);
      playVideoOnSlideChange(slideItems, activeIndex);
    });
  });

  const nextBtns = sections[index].querySelectorAll('.next-slide');

  nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click', function() {
      console.log('currentIndex',currentIndex)
      console.log('activeIndex',activeIndex)
      if (activeIndex < slideItems.length - 1) {
        slideItems[activeIndex].style.display = 'none';
        slideItems[activeIndex].classList.remove('active');
        activeIndex++;
        slideItems[activeIndex].style.display = 'block';
        slideItems[activeIndex].classList.add('active');
      }
      
      updateNavigation(prevBtns, nextBtns, activeIndex, slideItems.length);
      stopVideosOnSlideChange(slideItems);
      playVideoOnSlideChange(slideItems, activeIndex);
    });
  });

  gsap.from(sections[index], { opacity: 0, duration: 0.3 });

  currentIndex = index;
  hideNavigation();
  showNavigationItems();
  hidePrevButton();
  hideMilestoneNav();

  console.log("Current section ID:", sections[index].id);
  console.log('currentt index:', currentIndex)
  const numSlideItems = slideItems.length;
  // console.log("Jumlah slides-items pada currentIndex:", numSlideItems);

  // Update navigasi setelah menambahkan atau mengurangi index aktif
  updateNavigation(prevBtns, nextBtns, activeIndex, numSlideItems);
  stopVideosOnSlideChange(slideItems);
  playVideoOnSlideChange(slideItems, activeIndex);
}

function playVideoOnSlideChange(slideItems, activeIndex) {
  if (slideItems[activeIndex]) {
    const video = slideItems[activeIndex].querySelector('video');
    if (video) {
      video.play();
    }
  }
}

function stopVideosOnSlideChange(slideItems) {
  slideItems.forEach(item => {
    const video = item.querySelector('video');
    if (video) {
      video.pause();
      // video.currentTime = 0;
    }
  });
}

function updateNavigation(prevBtns, nextBtns, activeIndex, numSlideItems) {
  // disabled button "prev" if in first index
  if (activeIndex === 0) {
    prevBtns.forEach(prevBtn => {
      // prevBtn.disabled = true;
      prevBtn.classList.add('nav-disabled')
      // console.log('min slide items')
    });
  } else {
    prevBtns.forEach(prevBtn => {
      // prevBtn.disabled = false;
      prevBtn.classList.remove('nav-disabled')
    });
  }

  // disabled button "next" if in last index
  if (activeIndex === numSlideItems - 1) {
    nextBtns.forEach(nextBtn => {
      // nextBtn.disabled = true;
      nextBtn.classList.add('nav-disabled')
      // console.log('max slide items')
    });
  } else {
    nextBtns.forEach(nextBtn => {
      nextBtn.classList.remove('nav-disabled')
      // nextBtn.disabled = false;
    });
  }
}

// Add click funtion link to project
document.querySelectorAll('.link-to-project').forEach(link => {
  link.addEventListener('click', function() {
    const pickerItemId = this.closest('.picker-items').id;
    const targetIndex = Array.from(sections).findIndex(section => section.id === pickerItemId);
    showSection(targetIndex);
  });
});


// Event listener untuk tombol "next"
btnnext.addEventListener('click', function() {
  // console.log(currentIndex)
  
  if (currentIndex < sections.length - 1) {
    if (currentIndex === 0) {
      gsap.to('.brand-wrapper:nth-child(1)', { y:-100, opacity: 0 })
      gsap.to('.brand-wrapper:nth-child(2)', { y: 100, opacity: 0 })
      gsap.to('.navy-overlay', 0.5, { y: "100%", ease: "circ.in" })
      gsap.to('.right-greyscale', 0.5, { y: "-100%", ease: "circ.in" })
      gsap.to('.left-greyscale', 0.5, { y: "-100%", ease: "circ.in" })
      gsap.to('.line-divider', 1, { opacity: 0 })
      btnback.classList.remove('ishongkong')
      btnback.classList.remove('is-astraland')    
      gsap.to(sections[currentIndex], { opacity: 1, duration: 1, onComplete: function() {
        currentIndex++;
        showSection(currentIndex);
      }});
    } 
     else {
      currentIndex++;
      showSection(currentIndex);
    }
  }
});

// Event listener untuk tombol "prev"
btnback.addEventListener('click', function() {
  if(currentIndex > 0) {
    gsap.to('.brand-wrapper:nth-child(1)', { y: 0, opacity: 1 })
    gsap.to('.brand-wrapper:nth-child(2)', { y: 0, opacity: 1 })
    gsap.to('.navy-overlay', 0.5, { y: 0, x: 0, ease: "circ.in" })
    gsap.to('.right-greyscale', 0.5, { y: 0, ease: "circ.in" })
    gsap.to('.left-greyscale', 0.5, { y: 0, ease: "circ.in" })
    gsap.to('.line-divider', 1, { opacity: 1 })
  }

  if (currentIndex > 0) {
    currentIndex--;
    showSection(currentIndex);
  }
});

hideNavigation();

showSection(currentIndex);

const breadCrumps = document.querySelectorAll('.breadcrump-items');
const contents = document.querySelectorAll('.content');
const accessbg = document.getElementById('access-content');
const bgcluster = document.querySelector('.bg-cluster');

// CTA to Milestone
document.querySelector('.cta-button').addEventListener('click', function(event) {
  event.preventDefault();
  showSection(2);
  
  // Make Sure each class 'is-Active' and 'd-block' in slide items remove
  breadCrumps.forEach((item) => {
    item.classList.remove('is-Active');
  });

  contents.forEach((item) => {
    item.classList.remove('d-block');
  });

});

// Hide Navigation on first load
// Redirect to Home
document.querySelector('.logo-home').addEventListener('click', function(e) {

  // Return animation when button home clicked
  e.preventDefault();
  showSection(0);
  // Make Sure each class 'is-Active' and 'd-block' in slide items remove
  breadCrumps.forEach((item) => {
    item.classList.remove('is-Active');
  });

  contents.forEach((item) => {
    item.classList.remove('d-block');
  })

  var onStart = gsap.timeline();
  onStart.to('.bg-overlay', { opacity: 1 });
  onStart.to('.logo-mask', 1, { display: 'block', scale: 1, yPercent: 0, ease: "power2.out" });
  onStart.to('.btn-text', { yPercent: 0, opacity: 1 })
  
  gsap.to(nav, { opacity: 0, display: 'flex' });
  gsap.to(".start-btn", { display: "block", autoAlpha: 1 })
  gsap.set('.navy-overlay', { visibility: 'visible', opacity: 0, x: '0px', y: '0px', xPercent: 0, yPercent: 0 });
  gsap.set('.brand-wrapper', { opacity: 0, display: 'block', x: '0px', y: '0px' });

  gsap.set('.left-content-wrapper', { opacity: 1, display: 'flex' });
  gsap.set('.left-content', { y: "0%", opacity: 1, display: 'block' });
  gsap.set('.left-greyscale', { x: "-100%", y: 0 });
  gsap.set('.brand-content-left', { opacity: 1, display: 'block', y: '0px' });

  gsap.set('.right-content-wrapper', { opacity: 1, display: 'flex' });
  gsap.set('.right-content', { y: "0%", opacity: 1, display: 'block' });
  gsap.set('.right-greyscale', { x: "100%", y: 0 });
  gsap.set('.brand-content-right', { opacity: 1, display: 'block', y: '0px' });
  gsap.set('.line-divider', { display: 'none', autoAlpha: 0 } );

  // window.location.reload()
})

breadCrumps.forEach((breadCrump, i) => {
  breadCrump.addEventListener('click', function() {
    // remove 'is-Active' class from all breadCrump items
    breadCrumps.forEach((item) => {
      item.classList.remove('is-Active');
    });

    // Add 'is-Active' class only on each breadCrump items when clicked
    this.classList.add('is-Active');

    // Update currentIndex based on breadCrump index onclick
    currentIndex = i;
    console.log('breadcrump index', i)
    // Update content based on index
    updateContentAndBehavior();
  });
});

const navlinks = document.querySelectorAll('.nav-slide');

// Function for content update and used based on currentIndex
function updateContentAndBehavior() {
  const currentContent = contents[currentIndex];

  contents.forEach((content) => {
    content.classList.remove('d-block');
  });

  currentContent.classList.add('d-block');

  sections.forEach((section, index) => {
    const accessbg = section.querySelector('.content#access-content');
    const bgCluster = section.querySelector('.bg-cluster img');

    if (accessbg && bgCluster) {
      if (accessbg.classList.contains('d-block')) {
        bgCluster.classList.add('fade-out');
        setTimeout(() => {
          bgCluster.src = `./src/assets/maps/map-${index + 1}.png`;

          bgCluster.onload = () => {
            bgCluster.classList.remove('fade-out');
          };
        }, 100);
      } else {
        bgCluster.src = `./src/assets/hero-images/${index + 1}.jpg`;
      }
    }
  });
}

// Toggle Cluster Items
const clusters = document.querySelectorAll('.cluster-items-wrapper');

clusters.forEach((item, i) => {
  item.addEventListener('click', function() {
    // Toggle the visibility of the next sibling with class 'subitems'
    const subitems = this.nextElementSibling;
    if (subitems) {
      subitems.classList.toggle('collapsed');
    }
  });
});


let collapsibleHeaders = document.querySelectorAll('.collapsible-header') || [];
for (let h = 0; h < collapsibleHeaders.length; h++) {
  collapsibleHeaders[h].addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('expanded');
  });
}

function toggleModal(sectionId) {
  const modal = document.getElementById(sectionId);
  if (!modal) {
    console.error(`Modal dengan ID ${sectionId} tidak ditemukan.`);
    return;
  }

  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    
  if (!nav) {
    console.error(`Elemen navigasi dengan ID 'nav' tidak ditemukan.`);
    return;
  }
  
  nav.style.display = modal.style.display === 'block' ? 'none' : 'flex';
  navlinks.forEach(navlink => {
    navlink.style.opacity = modal.style.display === 'block' ? 0 : 1;
  });

  const closeButton = modal.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      toggleModal(sectionId);
    });
  } else {
    console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${sectionId}.`);
  }
}



const virtuals = [
  // '.ammaia',
  '.ammaia2',
  '.ammaia3',
  '.arumaya1',
  '.arumaya2',
  '.arumaya3',
  '.arumaya4',
  '.kelimutu7',
  '.kelimutu9',
  '.asya-maninjau',
  '.ananda-penthouse',
  '.sentarum6',
  '.sentarum8',
  '.tobalake'
];

const modalIds = [
  // 'lavatera-type-6',
  'lavatera-type-7',
  'lavatera-type-8',
  'arumaya-1',
  'arumaya-2',
  'arumaya-3',
  'arumaya-4',
  'kalimutu-type-7',
  'kalimutu-type-9',
  'maninjau',
  'anandamaya-penthouse',
  'sentarum-type-6',
  'sentarum-type-8',
  'toba-lake'
];

virtuals.forEach((virtual, index) => {
  const virtualElement = document.querySelector(virtual);
  if (virtualElement) {
    virtualElement.addEventListener('click', function(event) {
      event.preventDefault();
      toggleModal(modalIds[index]);
    });
  } else {
    console.error(`Element Virtual ${virtual} not finded.`);
  }
});


function initSwipers() {
  // Select all elements with class 'swiper-container'
  const swiperContainers = document.querySelectorAll('.swiper-container');

  // Loop through each swiper container element
  swiperContainers.forEach(container => {
    const swiper = new Swiper(container, {
      // Optional parameters
      observer: true,
      observeParents: true,
      centeredSlides: true,
      effect: 'coverflow',
      loop: true,
      grabCursor: true,
      slidesPerView: 2,
      spaceBetween: -50,
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 400,
        modifier: 2,
        slideShadows : true
      },
      // If we need pagination
      pagination: {
        el: container.querySelector('.swiper-pagination'), // Use pagination inside the current container
        clickable: true
      },
    });

    function updateCaption() {
      var activeSlide = swiper.slides[swiper.activeIndex];
      var captionText = activeSlide.dataset.text;
      const captions = container.querySelectorAll('.caption');
      captions.forEach(caption => {
        caption.innerText = captionText;
      });
    }

    updateCaption();

    // Add slide change event listener
    swiper.on('slideChange', function () {
      updateCaption();
    });
  });
}

const menuBody = TweenLite.to(".menu-block", 0.3, {
  y: 0,
  rotate: 0,
  opacity: 1,
  display: 'block',
  paused: true,
  reversed: true
});

const burger = TweenLite.to(".toggle-menu", 0.3, {
  rotate: 90,
  paused: true,
  reversed: true
})

document.querySelector(".toggle-menu").addEventListener("click", isNavMenu);

function isNavMenu() {
  menuBody.reversed() ? menuBody.play() : menuBody.reverse();
  burger.reversed() ? burger.play() : burger.reverse();
}

document.body.addEventListener("click", function(event) {
  // Check if the click target is not inside the menu block or the toggle menu button
  if (!event.target.closest(".menu-block") && !event.target.classList.contains("toggle-menu")) {
    // Reverse the menu and burger animations if they're not already reversed
    if (!menuBody.reversed()) {
      menuBody.reverse();
    }
    if (!burger.reversed()) {
      burger.reverse();
    }
  }
});

// Language Redirect

document.getElementById('en').addEventListener('click', function() {
  window.location.href = "index.html"; 
});

document.getElementById('ind').addEventListener('click', function() {
  window.location.href = "lang-in.html";
});

// Toggle Fullscreen

var fullscreenButton = document.getElementById("fullScreen");
fullscreenButton.addEventListener("click", toggleFullScreen, false);

function toggleFullScreen() {
  // fullscreenButton.innerHTML = "Exit Fullscreen";
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    // fullscreenButton.innerHTML = "Fullscreen"
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}



// INIT
buttonOnStated()
initSwipers();
updateContentAndBehavior();
