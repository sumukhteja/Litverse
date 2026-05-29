function toggleSearch() {
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');

  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block';
    searchBar.style.overflow = 'hidden';
    searchBar.style.width = '0px';
    searchBar.style.opacity = '1';
    searchBar.style.transition = 'none';
    setTimeout(() => {
      searchBar.style.transition = 'width 0.7s cubic-bezier(.77,0,.18,1)';
      searchBar.style.width = '260px';
    }, 10);
    setTimeout(() => {
      searchInput.focus();
    }, 750);
  } else {
    searchBar.style.transition = 'width 0.5s cubic-bezier(.77,0,.18,1)';
    searchBar.style.width = '0px';
    setTimeout(() => {
      searchBar.style.display = 'none';
    }, 500);
  }
}

function hideSearch() {
  setTimeout(() => {
    const searchBar = document.getElementById('searchBar');
    searchBar.style.transition = 'width 0.5s cubic-bezier(.77,0,.18,1)';
    searchBar.style.width = '0px';
    setTimeout(() => {
      searchBar.style.display = 'none';
    }, 500);
  }, 150);
}

function showSearchResults(results, searchTerm) {
  let resultBox = document.getElementById('searchResultsBox');
  if (!resultBox) {
    resultBox = document.createElement('div');
    resultBox.id = 'searchResultsBox';
    resultBox.style.position = 'fixed';
    resultBox.style.top = '50%';
    resultBox.style.left = '50%';
    resultBox.style.transform = 'translate(-50%, -50%)';
    resultBox.style.background = 'rgba(42,42,42,0.98)';
    resultBox.style.border = '1px solid #d0d0d0';
    resultBox.style.borderRadius = '16px';
    resultBox.style.padding = '32px 48px';
    resultBox.style.color = '#e8e8e8';
    resultBox.style.fontWeight = '200'; // Even lighter font weight for all text in the search result box
    resultBox.style.fontFamily = "'Josefin Sans', sans-serif";
    resultBox.style.zIndex = 1001;
    resultBox.style.minWidth = '780px';
    resultBox.style.maxWidth = '900px';
    resultBox.style.boxShadow = '0 8px 48px 0 #111a';
    document.body.appendChild(resultBox);
  } else {
    resultBox.style.position = 'fixed';
    resultBox.style.top = '50%';
    resultBox.style.left = '50%';
    resultBox.style.transform = 'translate(-50%, -50%)';
    resultBox.style.minWidth = '780px';
    resultBox.style.maxWidth = '900px';
    resultBox.style.padding = '32px 48px';
  }
  // Add overlay for click-to-close
  let overlay = document.getElementById('searchOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.01)';
    overlay.style.zIndex = 1000;
    overlay.onclick = function(e) {
      if (e.target === overlay) {
        document.getElementById('searchResultsBox').remove();
        overlay.remove();
      }
    };
    document.body.appendChild(overlay);
  }
  let html = '';
  if (results.length > 0) {
    html += `<div style='font-size:1.3em;margin-bottom:18px;'>Found ${results.length} result${results.length>1?'s':''} for '<b>${searchTerm}</b>':</div>`;
    html += '<ul style="list-style:none;padding:0;margin:0;">';
    results.forEach(result => {
      // Use correct relative URLs for each result based on current page location
      const isNested = window.location.pathname.includes('/content/');
      let url = result.url;
      if (isNested) {
        if (url.startsWith('content/')) {
          url = url.replace('content/', '');
        } else {
          url = '../' + url;
        }
      }
      html += `<li style='margin-bottom:18px;'><a href='${url}' style='color:#e8e8e8;text-decoration:underline;font-weight:bold;font-size:1.15em;'>${result.title}</a><br><span style='font-size:1em;color:#bbb;'>by ${result.author} (${result.type})</span></li>`;
    });
    html += '</ul>';
  } else {
    html += `<div style='color:#aaa;'>No results found for '<b>${searchTerm}</b>'</div>`;
  }
  html += `<div style='text-align:right;margin-top:18px;'><button onclick='var box=document.getElementById("searchResultsBox");if(box)box.style.display="none";var o=document.getElementById("searchOverlay");if(o)o.remove();' style='background:#444;border:none;color:#eee;padding:10px 28px;border-radius:8px;cursor:pointer;font-size:1em;'>Close</button></div>`;
  resultBox.innerHTML = html;
  resultBox.style.display = 'block';
}

function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  if (searchTerm.length < 2) {
    let box = document.getElementById('searchResultsBox');
    if (box) box.style.display = 'none';
    return;
  }
  const searchData = [
    { title: "The Dusk Sings", author: "Ananya Roy", type: "Poetry", url: "content/poem1.html", content: "dusk sings colors school hush rooftops birds shadows ink city blink throat sky humming lullabies windows amber warmth story streetlight starlight dialect shadows" },
    { title: "The Thirteenth Window", author: "Arun Dev", type: "Fiction", url: "content/story1.html", content: "thirteenth window architect tower impossible reality perception architecture building windows glass steel city" },
    { title: "A City of Fog", author: "Keerthana V", type: "Fiction", url: "content/book1.html", content: "city fog spire towers mist maya streets shadows maps stone glass origami harbor" },
    { title: "City Rain", author: "Manav Lal", type: "Poetry", url: "content/poem2.html", content: "city rain sky silver hair neon roofs streetlit air cars trails crimson gold wet asphalt" },
    { title: "Letters to Time", author: "Esha Kapoor", type: "Poetry", url: "content/poem3.html", content: "letters time paper thin leaves clock mantle softly grieves busy streets asleep gray dust" },
    { title: "Ghost Hours", author: "Sameer Rao", type: "Poetry", url: "content/poem4.html", content: "ghost hours suspended web-like silence hum lonely clock breaths stretch floor boards truths gray light" },
    { title: "Digital Pastoral", author: "Jayesh Chaudhari", type: "Poetry", url: "content/poem5.html", content: "digital pastoral dew silicone leaves copper roots deep fiber-optic forests servers pixels autumn glowworms data river" },
    { title: "Underwater Dreams", author: "Rohan Mehta", type: "Poetry", url: "content/poem6.html", content: "underwater dreams sink surface green sea-moss pane coral spires ocean floor currents float liquid space gravity" },
    { title: "The Quiet Path", author: "Krish", type: "Poetry", url: "content/krish.html", content: "quiet path road bends shadow elm streetlights stars reign realm midnight wind stone waters" },
    { title: "The Librarian's Rebellion", author: "Nisha Singh", type: "Fiction", url: "content/story2.html", content: "librarian rebellion book shifting text library quiet archives dusting volume history dates altered" },
    { title: "Echoes of the City", author: "Nandini", type: "Fiction", url: "content/nandini.html", content: "echoes city speaks whispers early morning traffic spires concrete peace avenue streetlights reflection street sweeper stillness" }
  ];
  const results = searchData.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.author.toLowerCase().includes(searchTerm) ||
    item.content.toLowerCase().includes(searchTerm) ||
    item.type.toLowerCase().includes(searchTerm)
  );
  showSearchResults(results, searchTerm);
}

// Filter function for read.html page
function filterContent() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const articles = document.querySelectorAll('article, .content-item');
  
  articles.forEach(article => {
    const text = article.textContent.toLowerCase();
    if (searchTerm === '' || text.includes(searchTerm)) {
      article.style.display = 'block';
    } else {
      article.style.display = 'none';
    }
  });
}

// Alternative name for compatibility with read.html 
function searchPage() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const articles = document.querySelectorAll('article');
  
  if (searchTerm.length < 2) {
    // Show all articles if search is too short
    articles.forEach(article => {
      article.parentElement.parentElement.parentElement.style.display = '';
    });
    return;
  }

  articles.forEach(article => {
    const text = article.textContent.toLowerCase();
    const container = article.parentElement.parentElement.parentElement; // Get the table container
    
    if (text.includes(searchTerm)) {
      container.style.display = '';
    } else {
      container.style.display = 'none';
    }
  });
}
