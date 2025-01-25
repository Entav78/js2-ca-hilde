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
  const profileSection = document.getElementById('dynamic-profile-details');

  // Ensure the dynamic profile details section exists
  if (!profileSection) {
    console.error('Dynamic profile details section not found.');
    return;
  }

  // Hide the personal avatar if a dynamic avatar exists
  if (avatar?.url) {
    const personalAvatar = document.querySelector('.personal-avatar');
    if (personalAvatar) personalAvatar.style.display = 'none';
  }

  // Inject dynamic content into #dynamic-profile-details
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
  const postsContainer = document.querySelector('.post-container');

  if (!postsContainer) {
    console.error('Post container not found.');
    return;
  }

  postsContainer.innerHTML = '';
  const header = document.createElement('h2');
  header.textContent = `${username}'s Posts`;
  postsContainer.appendChild(header);

  if (posts.length === 0) {
    postsContainer.innerHTML = `<h2>${username}'s Posts</h2><p>No posts found.</p>`;
    return;
  }

  const postsList = document.createElement('div');
  postsList.className = 'post-list'; // Matches your CSS class for styling

  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.className = 'post-card'; // Matches your CSS class for styling
    postCard.innerHTML = `
      <div class="post-content">
        <h3>
          <a href="${basePath}/post/?id=${post.id}" class="post-link">${
      post.title || 'Untitled Post'
    }</a>
        </h3>
        <p>${post.body || 'No content available.'}</p>
        ${
          post.media?.url
            ? `<img src="${post.media.url}" alt="${
                post.media.alt || 'Post image'
              }" class="post-image" />`
            : '<p>No image available</p>'
        }
      </div>
    `;
    postsList.appendChild(postCard);
  });

  postsContainer.innerHTML = `<h2>${username}'s Posts</h2>`; // Set the header
  postsContainer.appendChild(postsList); // Append the posts list
}
