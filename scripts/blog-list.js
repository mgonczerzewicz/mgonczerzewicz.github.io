

document.addEventListener('DOMContentLoaded', () => {
    const blogListContainer = document.querySelector('.blog-list');
    if (!blogListContainer) {
        console.error('Container .blog-list not found on this page.');
        return; 
    }
    async function loadBlogPosts() {
        try {
            const response = await fetch('/data/posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
             blogListContainer.innerHTML = '';

            posts.forEach(post => {
                
                const postElement = document.createElement('a');
                postElement.href = post.url; 
                postElement.classList.add('blog-item'); 
                postElement.innerHTML = `
                    <div class="blog-item-image">
                        <img src="${post.image}" alt="${post.imageAlt}">
                    </div>
                    <div class="blog-item-content">
                        <h4>${post.title}</h4>
                        <p class="blog-item-excerpt">${post.excerpt}</p>
                        <div class="blog-item-meta">
                            <span>${post.date}</span> | <span>${post.readTime}</span>
                        </div>
                    </div>
                `;
                blogListContainer.appendChild(postElement);
            });

        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogListContainer.innerHTML = '<p>Wystąpił błąd podczas ładowania wpisów blogowych.</p>';
        }
    }

    loadBlogPosts();
});