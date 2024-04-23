const branddashboard = document.querySelector(".brand-dashboard");
const nav = document.querySelector(".navigation")

// Animation Astra icon on BEGINING
document.querySelector('.start-btn').addEventListener('click', function() {
  gsap.to('.btn-text', { yPercent: -100, opacity: 0 })
  gsap.to('.logo-mask', 1, { scale: 200, yPercent: -800, delay: 0.3, ease: "power2.in" });
  gsap.to('.logo-mask', { delay:0.8, display: 'none' });
  gsap.to('.bg-overlay', { opacity: 0, delay: 0.8 });
  gsap.to('.navy-overlay', { delay: 1, visibility: 'visible', opacity: 1, ease: "power2.out" });
  gsap.to(nav, { delay:0.8, opacity: 1, display: 'flex' });

  // show Navigation after button clicked
  gsap.to('.logo-home', { autoAlpha: 1, delay: 1.3 });
  gsap.to('.cta-button', { autoAlpha: 1, delay: 1.3 });
  gsap.to('.next-prev-wrapper', { autoAlpha: 1, delay: 1.4 });
  gsap.to('.brand-wrapper', { display: 'block', autoAlpha: 1, delay: 1.4 } );
  gsap.to('.line-divider', { display: 'block', autoAlpha: 1, delay: 1.4 } );
  branddashboard.classList.add("isActive");
}) 

// Hide Navigation on first load
// Redirect to Home
document.querySelector('.logo-home').addEventListener('click', function() {
  window.location.reload()
})

// Toggle Menu to view Astra and Hongkongland
const brands = document.querySelectorAll('.opt-btn');
const btnback = document.querySelector('.prev-nav');
const btnnext = document.querySelector('.next-nav');

for (let i = 0; i < brands.length; i++) {
  brands[i].addEventListener('click', function() {
    const isActive = this.classList.contains('active');
    
    // Remove 'active' class from all elements if none are active
    if (!isActive) {
      for (let j = 0; j < brands.length; j++) {
        brands[j].classList.remove('active');
      }
    }
    
    // Toggle 'active' class on the clicked element
    this.classList.toggle('active');
    
    // Determine animation direction based on toggle state
    const direction = isActive ? -1 : 1;
    const opacity = isActive ? 1 : 0;
    const xGreyscale = isActive ? "100%" : "50%"

    
    if (this.id === 'hongkong') {
      gsap.to('.navy-overlay', 1, { delay: 0.5, xPercent: isActive ? 0 : 50, ease: "power2.out" });
      gsap.to('.left-content-wrapper', 1, {
        delay: isActive ? 1.3 : 0,
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "flex",
      })
      gsap.to('.left-content', 0.5, { y: isActive ? "0%" : "-50%", delay: isActive ? 1 : 0, opacity: opacity, display: isActive ? 'block' : 'none' })
      gsap.to('.left-greyscale', { x: isActive ? "-100%" : "-50%", delay: 0.3 })
      
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
      })

    } else {
      gsap.to('.navy-overlay', 1, { delay: 0.5, xPercent: isActive ? 0 : -50, ease: "power2.out" });
      gsap.to('.right-content-wrapper', 1, {
        delay: isActive ? 1.3 : 0,
        opacity: direction === 1 ? 0 : 1,
        display: direction === 1 ? "none" : "flex"
      })
      gsap.to('.right-content', 0.5, { y: isActive ? "0%" : "-50%", delay: isActive ? 1 : 0, opacity: opacity, display: isActive === 1 ? 'none' : 'block' }) 
      gsap.to('.right-greyscale', { x: xGreyscale, delay: 0.3 })
      
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
      })
    }
    
    // console.log("Clicked element index:", i);
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
  }, { threshold: 0.5 }); // Gunakan threshold 0.5 untuk memicu saat setengah slide masuk dalam viewport

  // List of slides class
  const slides = document.querySelectorAll('.slides');

  // Loop the slides
  slides.forEach(slide => {
    observer.observe(slide);
  });

  // const loader = document.querySelector('.loader');
  // gsap.to(loader, { opacity: 0, duration: 2, display: 'none' })
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
      gsap.to(item.querySelector('.link-to-project'), 0.3, { opacity: 0, display: 'none' });
    });

    // Highlight the clicked picker item
    pickerItem.classList.add('highlight');
    gsap.to(moreBtn, 0.3, { opacity: 1, display: 'flex' })

    const correspondingLogoItem = document.querySelector(`.logo-items-wrapper[data-img="${selectedImg}"]`);
    if (correspondingLogoItem) {
      correspondingLogoItem.classList.add('highlight');
    }

    // Determine the index of the clicked picker item
    const selectedIndex = index + 3; // Offset by 3 to account for the first three sections (mainpage, about, milestone)
    const anyPickerHighlighted = Array.from(document.querySelectorAll('.picker-items')).some(item => item.classList.contains('highlight'));

    // If no picker item is highlighted, disable the next button
    // if (!anyPickerHighlighted) {
    //   btnnext.classList.add('nav-disabled');
    // } else {
    //   btnnext.classList.remove('nav-disabled');
    // }

    // Show the corresponding section
    // showSection(selectedIndex);

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
      gsap.to(element.querySelector('.link-to-project'), 0.3, { opacity: 0, display: 'none' });
    });

    // Highlight the clicked logo item
    item.classList.add('highlight');
    gsap.to(moreBtn, 0.3, { opacity: 1, display: 'flex' })


    if (correspondingPickerItem) {
      correspondingPickerItem.classList.add('highlight');
    }

    // Determine the index of the clicked picker item
    const selectedIndex = index + 3; // Offset by 3 to account for the first three sections (mainpage, about, milestone)

    // Show the corresponding section
    // showSection(selectedIndex);
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

const breadCrumps = document.querySelectorAll('.breadcrump-items');
const contents = document.querySelectorAll('.content');

// Function untuk menampilkan section berdasarkan indeks
function showSection(index) {
  // Semua section dimatikan
  sections.forEach(function(section) {
    section.style.display = 'none';
  });
  // Section yang ditunjukkan sesuai dengan indeks ditampilkan
  sections[index].style.display = 'block';

  const slideItems = sections[index].querySelectorAll('.slides-items');
  let activeIndex = 0;
  
  slideItems.forEach((item, i) => {
    if (i === 0) {
      item.style.display = 'block'; // Menampilkan .slides-items pertama
      item.classList.add('active'); 
    } else {
      item.style.display = 'none'; // Menyembunyikan .slides-items lainnya
      item.classList.remove('active');

      const breadCrump = item.querySelector('.breadcrump-items'); // Get the first breadcrumb element within the current slide item
      const contents = item.querySelector('.content');
      // console.log('Found breadcrumb:', breadCrump); // Debugging: Check if breadcrumb is found
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

  // Tambahkan event listener untuk tombol "next" di dalam setiap section
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


  // Animasi menggunakan GSAP untuk setiap transisi
  gsap.from(sections[index], { opacity: 0, duration: 0.3 });

  currentIndex = index;
  hideNavigation();
  showNavigationItems();
  hidePrevButton();
  hideMilestoneNav();

  console.log("Current section ID:", sections[index].id);
  const numSlideItems = slideItems.length;
  // console.log("Jumlah slides-items pada currentIndex:", numSlideItems);

  // Memperbarui navigasi setelah menambahkan atau mengurangi index aktif
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
  // Nonaktifkan tombol "prev" jika sudah berada di indeks pertama
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

  // Nonaktifkan tombol "next" jika sudah berada di indeks terakhir
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
    // Dapatkan id dari elemen picker-item terkait
    const pickerItemId = this.closest('.picker-items').id;
    // Temukan index dari elemen dengan id yang sesuai di dalam array sections
    const targetIndex = Array.from(sections).findIndex(section => section.id === pickerItemId);
    // Tampilkan bagian terkait
    showSection(targetIndex);
  });
});


// Event listener untuk tombol "next"
btnnext.addEventListener('click', function() {
  // console.log(currentIndex)
  
  // Periksa apakah sudah mencapai akhir daftar elemen
  if (currentIndex < sections.length - 1) {
    // Jika saat ini pada indeks pertama, terapkan transisi sebelum pindah ke indeks selanjutnya
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
    // else if (currentIndex === 2 && document.querySelector('.picker-items.highlight')) {
    //   const selectedIndex = document.querySelector('.picker-items.highlight').id;
    //   const targetIndex = Array.from(sections).findIndex(section => section.id === selectedIndex);
    //   showSection(targetIndex);
    // }
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
  // Periksa apakah sudah mencapai awal daftar elemen
  if (currentIndex > 0) {
    currentIndex--;
    showSection(currentIndex);
  }
});
hideNavigation();

// Tampilkan section pertama saat halaman dimuat
showSection(currentIndex);

const accessbg = document.getElementById('access-content');
const accessbg2 = document.getElementById('access-content-asya');
const bgcluster = document.querySelector('.bg-cluster');


breadCrumps.forEach((breadCrump, i) => {
  breadCrump.addEventListener('click', function() {
    // Hapus 'is-Active' class dari semua breadCrump items
    breadCrumps.forEach((item) => {
      item.classList.remove('is-Active');
    });

    // Tambahkan 'is-Active' class hanya pada breadCrump item yang diklik
    this.classList.add('is-Active');

    // Perbarui currentIndex berdasarkan indeks breadCrump yang diklik
    currentIndex = i;
    console.log('breadcrump index', i)
    // Perbarui konten dan perilaku berdasarkan currentIndex
    updateContentAndBehavior();
  });
});

// CTA to Milestone
document.querySelector('.cta-button').addEventListener('click', function(event) {
  event.preventDefault();
  showSection(2);
  
  breadCrumps.forEach((item) => {
    item.classList.remove('is-Active');
  });
});

const navlinks = document.querySelectorAll('.nav-slide');
document.querySelector('.ammaia').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'lavatera-type-6'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })
    // itemsNav.style.display = 'none'

    // Tambahkan event listener untuk tombol close di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.ammaia2').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'lavatera-type-7'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })
    const closeButton = modal.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.ammaia3').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'lavatera-type-8'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.arumaya1').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'arumaya-1'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.arumaya2').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'arumaya-2'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.arumaya3').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'arumaya-3'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.arumaya4').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'arumaya-4'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.kelimutu7').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'kalimutu-type-7'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.kelimutu9').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'kalimutu-type-9'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.asya-maninjau').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'maninjau'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.ananda-penthouse').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'anandamaya-penthouse'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.sentarum6').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'sentarum-type-6'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.sentarum8').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'sentarum-type-8'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});

document.querySelector('.tobalake').addEventListener('click', function(event) {
  event.preventDefault(); // Mencegah perilaku default dari tautan
  const sectionId = 'toba-lake'; // Ganti dengan ID modal yang ingin Anda buka
  const modal = document.getElementById(sectionId);
  if (modal) {
    modal.style.display = 'block'; // Tampilkan modal
    nav.style.display = 'none';
    navlinks.forEach((navlink,i) => {
      navlink.style.opacity = 0;
    })    // Tambahkan event listener untuk tombol close   di dalam modal
    const closeButton = modal.querySelector('.close');
    if (closeButton) {  
      closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        nav.style.display = 'flex';
        navlinks.forEach((navlink,i) => {
          navlink.style.opacity = 1;
        })
      });
    } else {
      console.error(`Tombol close tidak ditemukan di dalam modal dengan ID ${targetId}.`);
    }
  } else {
    console.error(`Modal dengan ID ${targetId} tidak ditemukan.`);
  }
});



// Fungsi untuk memperbarui konten dan perilaku berdasarkan currentIndex
function updateContentAndBehavior() {
  // Tentukan konten yang sesuai dengan currentIndex
  const currentContent = contents[currentIndex];

  // Semua konten diubah menjadi display: none
  contents.forEach((content) => {
    content.classList.remove('d-block');
  });

  // Konten yang sesuai dengan currentIndex ditampilkan
  currentContent.classList.add('d-block');

  // Setel sumber gambar berdasarkan kondisi tertentu
  // if (accessbg && bgcluster) {
  //   if (accessbg.classList.contains('d-block')) {
  //     // Jika accessbg terlihat, ubah sumber gambar sesuai
  //     bgcluster.querySelector('img').src = './src/assets/maps/Anandamaya.png';
  //   } else {
  //     console.log('ganti gambar lagi')
  //     // Jika accessbg tidak terlihat, ubah sumber gambar ke nilai lain
  //     bgcluster.querySelector('img').src = './src/assets/asya/kalimutu/Copy-of-Facade-Front-(Night).jpg';
  //   }
  // }
  sections.forEach((section, index) => {
    // Dapatkan elemen accessbg dan bgcluster di dalam section saat ini
    const accessbg = section.querySelector('.content#access-content');
    const bgCluster = section.querySelector('.bg-cluster img');

    // Cek jika kedua elemen tersebut ditemukan
    if (accessbg && bgCluster) {
        // Periksa apakah accessbg terlihat atau tidak
        if (accessbg.classList.contains('d-block')) {
            // Jika accessbg terlihat, ubah sumber gambar sesuai
            bgCluster.src = `./src/assets/maps/map-${index + 1}.png`; // Ganti dengan sumber gambar yang sesuai
        } else {
            // Jika accessbg tidak terlihat, ubah sumber gambar ke nilai lain
            bgCluster.src = `./src/assets/hero-images/${index + 1}.jpg`; // Ganti dengan sumber gambar yang sesuai
        }
    }
});

}

// Pembaruan awal konten dan perilaku berdasarkan currentIndex saat ini
updateContentAndBehavior();


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

// function initSwiper() {
//   var swiper = new Swiper('.swiper-container', {
//     // Optional parameters
//     observer: true, // https://stackoverflow.com/questions/43770106/swiper-slider-not-working-unless-page-is-resized
//     observeParents: true,
//     centeredSlides: true,
//     effect: 'coverflow',
//     loop: true,
//     grabCursor: true,
//     slidesPerView: 2,
//     spaceBetween: -50,
//     speed: 1000,
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false
//     },
//     coverflowEffect: {
//       rotate: 20,
//       stretch: 0,
//       depth: 400,
//       modifier: 2,
//       slideShadows : true
//     },
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true
//     },
//   });
// };

// initSwiper();

function initSwipers() {
  // Select all elements with class 'swiper-container'
  const swiperContainers = document.querySelectorAll('.swiper-container');

  // Loop through each swiper container element
  swiperContainers.forEach(container => {
    var swiper = new Swiper(container, {
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

initSwipers();


const maps = document.querySelectorAll('.openmap');
const lightbox = document.querySelectorAll('.lightbox');

maps.forEach((map) => {
  map.addEventListener('click', function() {
    console.log('buka');
    lightbox.forEach((light) => {
      gsap.to(light, { opacity: 1, display: 'flex' });
    })
  });
});

const mapClose = document.querySelectorAll('.tutup');
mapClose.forEach((item) => {
  item.addEventListener('click', function() {
    lightbox.forEach((light) => {
      gsap.to(light, { opacity: 0, display: 'none' });
    })
  });
});



// Language Redirect

document.getElementById('ind').addEventListener('click', function() {
  window.location.href = "index.html"; // Mengarahkan pengguna ke URL "/"
});

document.getElementById('en').addEventListener('click', function() {
  window.location.href = "english.html"; // Mengarahkan pengguna ke URL "/"
});

