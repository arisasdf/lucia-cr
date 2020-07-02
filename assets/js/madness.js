const DISABLED_CLASS = 'viewer__nav--disabled',
      LAST_PAGE = 22;

let currentPage = -1,
  lastVisitedPage = 0,
  isFirstPage = false,
  isLastPage = false,

  findByClass = function(className) {
    return document.getElementsByClassName(className)[0];
  },

  $viewerImage = findByClass('viewer__image'),
  $prevClickable = findByClass('viewer__nav--prev'),
  $nextClickable = findByClass('viewer__nav--next'),

  imageSrc = function(page) {
    let padding = page < 10 ? '0' : '';

    return `../assets/img/madness/wttm_${padding}${page}.png`;
  },

  goToPage = function(page) {
    document.querySelector('.viewer__image img').setAttribute('src', imageSrc(page));

    isFirstPage = page === 0;
    isLastPage = page === LAST_PAGE;

    findByClass('viewer__nav').classList.remove(DISABLED_CLASS);
    if (isFirstPage) findByClass('viewer__nav--prev').classList.add(DISABLED_CLASS);
    if (isLastPage) findByClass('viewer__nav--next').classList.add(DISABLED_CLASS);

    if (page > lastVisitedPage) lastVisitedPage = page;
    
    findByClass('viewer__current-page').innerText = (currentPage + 1)
  },

  nextPage = function() {
    if (isLastPage) return;
    currentPage++;
    goToPage(currentPage);

    $nextClickable.classList.add('viewer__nav--next--activated');
    window.setTimeout(() => {
      $nextClickable.classList.remove('viewer__nav--next--activated');
    }, 150);
  },

  prevPage = function() {
    if (isFirstPage) return;
    currentPage--;
    goToPage(currentPage);

    $prevClickable.classList.add('viewer__nav--prev--activated');
    window.setTimeout(() => {
      $prevClickable.classList.remove('viewer__nav--prev--activated');
    }, 150);
  };

$viewerImage.addEventListener('click', (event) => {
  $viewerImage.classList.toggle('viewer__image--contain');
});

$prevClickable.addEventListener('click', (event) => {
  if ($prevClickable.classList.contains(DISABLED_CLASS)) return;

  prevPage();
});

$nextClickable.addEventListener('click', (event) => {
  if ($nextClickable.classList.contains(DISABLED_CLASS)) return;

  nextPage();
});

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowRight':
      nextPage();
      break;
    case 'ArrowLeft':
      prevPage();
  }
});

let fragment = window.location.hash.substr(1);

if (fragment.length && !isNaN(fragment)) {
  goToPage(fragment);
} else {
  nextPage();
}

findByClass('viewer__total-pages').innerText = (LAST_PAGE + 1);
