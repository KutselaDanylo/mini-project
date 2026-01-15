const totalPostsContainer = { value: 37 };
const demoContainer = document.getElementById('demo-container');
const selectPerPage = document.getElementById('select-numb');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pagesContainer = document.getElementById('pages');
const foundP = document.getElementById('found-p');
const amountP = document.getElementById('amount-p');
const newPostBtn = document.querySelector('.new-b');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');
const cancelPopupBtn = document.getElementById('cancel-popup');
const createPostBtn = document.getElementById('create-post');
const postTitleInput = document.getElementById('post-title');
const postTextInput = document.getElementById('post-text');
const postTagsInput = document.getElementById('post-tags');
const detailsMenu = document.getElementById('details-menu');

let totalPosts = totalPostsContainer.value;
let currentPage = 1;
let perPage = parseInt(selectPerPage.value);

const demoPosts = [];
for (let i = 1; i <= totalPosts; i++) {
  const li = document.createElement('li');
  li.className = 'demo-post';
  li.innerHTML = `
    <div class="demo-posts">
      <ul class="numb-date">
        <li><h1 class="demo-number">Демо пост №${i}</h1></li>
        <li><p class="date">21.10.2025</p></li>
      </ul>
      <ul>
        <li>
          <p class="content" id="post-${i}">
            Це демо-контент. Замініть на ваші дані з бекенда. Інтерфейс показує пагінацію, пошук, CRUD та коментарі без перезавантаження сторінки.
          </p>
        </li>
      </ul>
      <ul class="ul-hashtags">
        <li><p class="hashtags">#backend</p></li>
        <li><p class="hashtags">#api</p></li>
      </ul>
      <ul class="ul-buttons">
        <li class="first-li"><button class="view-btn">Переглянути</button></li>
        <li class="second-li"><button class="edit-btn">Редагувати</button></li>
        <li class="third-li"><button class="delete-btn">Видалити</button></li>
      </ul>
    </div>
  `;
  demoPosts.push(li);
}

function renderPage() {
  demoContainer.innerHTML = '';
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  for (let j = start; j < end && j < demoPosts.length; j++) {
    const post = demoPosts[j];
    demoContainer.appendChild(post);
    const viewBtn = post.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => showPostDetails(post));
  }
  renderPagination();
}

function renderPagination() {
  pagesContainer.innerHTML = '';
  const totalPages = Math.ceil(totalPosts / perPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerHTML = i;
    if (i === currentPage) {
      btn.classList.add('active-page');
    }
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPage();
    });
    pagesContainer.appendChild(btn);
  }
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  foundP.textContent = `Знайдено: ${totalPosts}`;
  amountP.textContent = `• Сторінка ${currentPage} з ${totalPages}`;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(totalPosts / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

selectPerPage.addEventListener('change', () => {
  perPage = parseInt(selectPerPage.value);
  currentPage = 1;
  renderPage();
});

newPostBtn.addEventListener('click', () => {
  popup.style.display = 'block';
});

function closePopup() {
  popup.style.display = 'none';
  postTitleInput.value = '';
  postTextInput.value = '';
  postTagsInput.value = '';
}

closePopupBtn.addEventListener('click', closePopup);
cancelPopupBtn.addEventListener('click', closePopup);

createPostBtn.addEventListener('click', () => {
  const title = postTitleInput.value.trim();
  const text = postTextInput.value.trim();
  const tags = postTagsInput.value.split(',');
  if (!title || !text) {
    alert('Будь ласка, заповніть заголовок і текст!');
    return;
  }
  const li = document.createElement('li');
  li.className = 'demo-post';
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  li.innerHTML = `
    <div class="demo-posts">
      <ul class="numb-date">
        <li><h1 class="demo-number">${title}</h1></li>
        <li><p class="date">${formattedDate}</p></li>
      </ul>
      <ul><li><p class="content">${text}</p></li></ul>
      <ul class="ul-hashtags">${tags.map(tag => `<li><p class="hashtags">${tag}</p></li>`).join('')}</ul>
      <ul class="ul-buttons">
        <li class="first-li"><button class="view-btn">Переглянути</button></li>
        <li class="second-li"><button class="edit-btn">Редагувати</button></li>
        <li class="third-li"><button class="delete-btn">Видалити</button></li>
      </ul>
    </div>
  `;
  demoPosts.push(li);
  totalPosts++;
  totalPostsContainer.value = totalPosts;
  renderPage();
  closePopup();
});

function showPostDetails(postEl) {
  const demoPostsNode = postEl.querySelector('.demo-posts');
  if (!demoPostsNode) return;
  const clone = demoPostsNode.cloneNode(true);
  const buttons = clone.querySelector('.ul-buttons');
  if (buttons) buttons.remove();
  const postContentHtml = clone.innerHTML;
  detailsMenu.innerHTML = `
  <div class="background-tinn">
    <div class="div-coments">
      <div class="details">
        <h2 id="details-post">Деталі поста</h2>
        <button id="close-details">✖</button>
      </div>
      <ul class="ul-post-content">
        <li id="post-content">${postContentHtml}</li>
      </ul>
      <ul class="ul-coments">
        <li id="comments-section">
          <h3>Коментарі</h3>
          <ul id="comments-list">
            <li class="comment-item">
              <h4 class="name-coment">Марія</h4>
              <p class="coment">Класний пост!</p>
              <small class="date-coment">28.10.2025, 16:16:57</small>
            </li>
            <li class="comment-item">
              <h4 class="name-coment">Олег</h4>
              <p class="coment">Чекаю продовження.</p>
              <small class="date-coment">29.10.2025, 15:16:57</small>
            </li>
          </ul>
        </li>
        <li id="add-comment">
          <input id="comment-name" type="text" placeholder="Ваше ім'я">
          <textarea id="comment-text" placeholder="Ваш коментар"></textarea>
          <button id="add-comment-btn">Додати</button>
        </li>
      </ul>
    </div>
  </div>
  `;
  detailsMenu.querySelector('#add-comment-btn').addEventListener('click', () => {
    const name = detailsMenu.querySelector('#comment-name').value.trim();
    const text = detailsMenu.querySelector('#comment-text').value.trim();
    if (!name || !text) {
      alert('Будь ласка, заповніть усі поля!');
      return;
    }
    const now = new Date();
    const newComment = `
      <li>
        <div class="comment-item">
          <h4>${name}</h4>
          <p>${text}</p>
          <small>${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()}, ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}</small>
        </div>
      </li>`;
    detailsMenu.querySelector('#comments-list').innerHTML += newComment;
    detailsMenu.querySelector('#comment-name').value = '';
    detailsMenu.querySelector('#comment-text').value = '';
  });
  detailsMenu.querySelector('#close-details').addEventListener('click', () => {
    detailsMenu.classList.remove('open');
    detailsMenu.innerHTML = '';
  });
  detailsMenu.classList.add('open');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const post = e.target.closest('.demo-post');
    if (!post) return;
    const titleEl = post.querySelector('.demo-number');
    const textEl = post.querySelector('.content');
    const tagsEls = post.querySelectorAll('.hashtags');
    const currentTitle = titleEl.textContent.trim();
    const currentText = textEl.textContent.trim();
    const currentTags = Array.from(tagsEls).map(t => t.textContent.trim()).join(', ');
    const editOverlay = document.createElement('div');
    editOverlay.className = 'edit-overlay';
    editOverlay.innerHTML = `
      <div class="edit-popup-block-tinn">
        <div class="edit-popup-block">
          <div class="edit-popup">
            <div class="edit-header">
              <h2 class="edit-title">Оновити пост</h2>
              <button class="edit-close">X</button>
            </div>
            <ul class="edit-fields">
              <li class="edit-field-text">
                <p class="edit-p">Заголовок</p>
                <input type="text" class="edit-input-text" value="${currentTitle}" />
              </li>
              <li class="edit-field-text">
                <p class="edit-p">Текст</p>
                <textarea class="edit-input-filling-text">${currentText}</textarea>
                </li>
              <li class="edit-field-text">
                <p class="edit-p">Теги (через кому)</p>
                <input type="text" class="edit-input-text" value="${currentTags}" />
              </li>
            </ul>
            <ul class="edit-buttons">
              <li><button class="edit-cancel">Скасувати</button></li>
              <li><button class="edit-save">Оновити</button></li>
            </ul>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(editOverlay);
    const closeEdit = () => editOverlay.remove();
    editOverlay.querySelector('.edit-close').addEventListener('click', closeEdit);
    editOverlay.querySelector('.edit-cancel').addEventListener('click', closeEdit);
    editOverlay.querySelector('.edit-save').addEventListener('click', () => {
      const newTitle = editOverlay.querySelector('.edit-input-text').value.trim();
      const newText = editOverlay.querySelector('.edit-input-filling-text').value.trim();
      const newTags = editOverlay.querySelectorAll('.edit-input-text')[1].value.split(',').map(t => t.trim()).filter(t => t);
      if (!newTitle || !newText) {
        alert('Будь ласка, заповніть усі поля!');
        return;
      }
      titleEl.textContent = newTitle;
      textEl.textContent = newText;
      const tagsContainer = post.querySelector('.ul-hashtags');
      tagsContainer.innerHTML = newTags.map(tag => `<li><p class="hashtags">${tag}</p></li>`).join('');
      closeEdit();
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const post = e.target.closest('.demo-post');
    if (!post) return;
    const index = demoPosts.indexOf(post);
    if (index > -1) {
      demoPosts.splice(index, 1);
    }
    post.remove();
    totalPosts--;
    totalPostsContainer.value = totalPosts;
    renderPage();
  }
});

const searchInput = document.getElementById('serch-post');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  if (!query) return;
  const foundIndex = demoPosts.findIndex(post => {
    const titleEl = post.querySelector('.demo-number');
    if (!titleEl) return false;
    return titleEl.textContent.toLowerCase().includes(query);
  });
  if (foundIndex === -1) return;
  const perPage = parseInt(selectPerPage.value);
  const targetPage = Math.floor(foundIndex / perPage) + 1;
  currentPage = targetPage;
  renderPage();
  const post = demoPosts[foundIndex];
  post.scrollIntoView({ behavior: 'smooth', block: 'center' });
  post.style.border = '2px solid blue';
  setTimeout(() => {
    post.style.border = '';
  }, 5000);
});

renderPage();
