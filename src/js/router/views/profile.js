import { authGuard } from '../../utilities/authGuard.js';
import { Profile } from '../../api/profile/profile.js';
import { basePath } from '../../api/constants.js';

// Enforce authentication
authGuard();

console.log('Profile page script is running');

// Initialize the profile page
(async function initializeProfilePage() {
  if (document.readyState === 'loading') {
    console.log('DOM is still loading, setting event listener');
    document.addEventListener('DOMContentLoaded', setupProfilePage);
  } else {
    console.log('DOM already loaded, running setup directly');
    await setupProfilePage();
  }
})();

async function setupProfilePage() {
  console.log('Setting up profile page');

  try {
    const profileApi = new Profile();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (!userDetails?.name) {
      console.error('User details are missing or invalid.');
      return;
    }

    const username = userDetails.name;
    console.log('Fetching user profile for:', username);

    // Fetch user profile with posts
    const userProfile = await profileApi.getProfile(username, true);
    const profileData = userProfile?.data;

    if (!profileData) {
      console.error('Failed to fetch user profile data.');
      return;
    }

    // Render profile details and user posts
    renderProfileDetails(profileData);
    renderUserPosts(profileData.posts || [], username);
  } catch (error) {
    console.error('Error fetching user profile or posts:', error.message);
  }
}

function renderProfileDetails({ name, email, bio, avatar, banner }) {
  const profileSection = document.getElementById('profile-details');

  if (!profileSection) {
    console.error('Profile details section not found.');
    return;
  }

  profileSection.innerHTML = `
    <h2>${name}</h2>
    <p>Email: ${email}</p>
    ${bio ? `<p>Bio: ${bio}</p>` : ''}
    ${
      avatar?.url
        ? `<img src="${avatar.url}" alt="${
            avatar.alt || 'Avatar'
          }" class="profile-avatar" />`
        : '<p>No avatar available</p>'
    }
    ${
      banner?.url
        ? `<img src="${banner.url}" alt="${
            banner.alt || 'Banner'
          }" class="profile-banner" />`
        : '<p>No banner available</p>'
    }
  `;
}

function renderUserPosts(posts, username) {
  const postsSection = document.getElementById('user-posts');

  if (!postsSection) {
    console.error('User posts section not found.');
    return;
  }

  if (posts.length === 0) {
    postsSection.innerHTML = `<h2>${username}'s Posts</h2><p>No posts found.</p>`;
    return;
  }

  const postsList = document.createElement('div');
  postsList.className = 'post-list';

  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <div class="post-content">
        <h3>
          <a href="${basePath}/post/?id=${post.id}" class="post-link">${
      post.title || 'Untitled Post'
    }</a>
        </h3>
        <p>${post.body || 'No content available.'}</p>
        ${
          post.image
            ? `<img src="${post.image}" alt="Post image" class="post-image" />`
            : '<p>No image available</p>'
        }
      </div>
    `;
    postsList.appendChild(postCard);
  });

  postsSection.innerHTML = `<h2>${username}'s Posts</h2>`;
  postsSection.appendChild(postsList);
}
