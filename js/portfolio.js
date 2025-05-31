
// Support both DynamoDB-style and plain JSON
const getValue = (userData, field, type = 'S') => {
    // Prioritize direct properties, then DynamoDB-style
    if (userData.hasOwnProperty(field)) {
        return userData[field];
    } else if (userData[field]?.[type] !== undefined) {
         return userData[field][type];
    } else if (userData.body && typeof userData.body === 'string') {
        // Attempt to parse nested JSON body if it exists and is a string
        try {
            const bodyData = JSON.parse(userData.body);
             if (bodyData.hasOwnProperty(field)) {
                return bodyData[field];
            } else if (bodyData[field]?.[type] !== undefined) {
                 return bodyData[field][type];
            }
        } catch (e) {
            console.error("Could not parse nested body JSON", e);
        }
    }
    return 'Not Found';
};
function getUsernameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('username');
}

document.addEventListener('DOMContentLoaded', async function () {
    console.log('script running');

    const username = getUsernameFromUrl();
    console.log('Username:', username);
    if (!username) {
        console.error('No username provided');
        return;
    }

    // const userUrl = `${BASE_URL}?username=${username}`;

    try {
        const response = await fetch('js/config.json');
        const config = await response.json();
        const userUrl = `${config.BASE_URL}?username=${username}`;
        const userRes = await fetch(userUrl);
        const userData = await userRes.json();
        console.log('User Data:', userData);

        // Update basic info
        updateElement('user-name', getValue(userData, 'Name'));
        updateElement('about', getValue(userData, 'About'));
        updateElement('full-name', getValue(userData, 'Name'));
        updateElement('email', getValue(userData, 'Email'));
        updateElement('url', getValue(userData, 'URL'), true);

        // Update "Get to know me" section
        const userIntro = document.getElementById('user-intro');
        if (userIntro) {
            const bio = getValue(userData, 'Bio');
            userIntro.innerHTML = `<h3 class="pt-2 mb-3">Get to know me</h3><p>${bio}</p>`;
        }

        // Update profile images
        const avatarUrl = getValue(userData, 'AvatarUrl');
        if (avatarUrl && avatarUrl !== 'Not Found') {
            document.querySelectorAll('.avatar-image').forEach(img => {
                img.src = avatarUrl;
            });
        }

        // Update GitHub stats
        updateElement('years-experience', getValue(userData, 'YearsOfExperience', 'N') + '+');
        updateElement('total-repos', getValue(userData, 'PublicRepos', 'N'));
        updateElement('followers', getValue(userData, 'Followers', 'N'));
        updateElement('following', getValue(userData, 'Following', 'N'));

        // Update contact information
        const email = getValue(userData, 'Email');
        updateElement('contact-email-text', email);
        const contactEmail = document.getElementById('contact-email');
        if (contactEmail && email !== 'Not Found') {
            contactEmail.href = `mailto:${email}`;
            contactEmail.textContent = email;
        }

        updateElement('contact-name', getValue(userData, 'Name'));
        updateElement('contact-location', getValue(userData, 'Location'));

        // Update languages in skills section
        const languages = getValue(userData, 'Languages', 'L');
        if (Array.isArray(languages)) {
            displayLanguages(languages);
        } else {
             console.warn('Languages data is not an array:', languages);
             displayLanguages([]); // Call with empty array to clear/show not found
        }

        // Update projects
        const projects = getValue(userData, 'Projects', 'L');
         if (Array.isArray(projects)) {
            displayProjects(projects);
        } else {
             console.warn('Projects data is not an array:', projects);
             displayProjects([]); // Call with empty array to clear/show not found
        }

    } catch (error) {
        console.error('Error fetching user data:', error);
         // Optionally display error messages on the page
        document.getElementById('user-name').textContent = 'Error';
        document.getElementById('about').textContent = 'Error loading data.';
        document.getElementById('full-name').textContent = 'Error';
        document.getElementById('email').textContent = 'Error';
        document.getElementById('url').textContent = 'Error';
        const userIntro = document.getElementById('user-intro');
         if (userIntro) {
            userIntro.innerHTML = `<h3 class="pt-2 mb-3">Get to know me</h3><p class="text-danger">Error loading data.</p>`;
        }
         document.querySelectorAll('.avatar-image').forEach(img => { img.src = ''; }); // Clear images
        updateElement('years-experience', 'Error');
        updateElement('total-repos', 'Error');
        updateElement('followers', 'Error');
        updateElement('following', 'Error');
        updateElement('contact-email-text', 'Error');
        const contactEmail = document.getElementById('contact-email');
        if (contactEmail) { contactEmail.href = '#'; contactEmail.textContent = 'Error'; }
        updateElement('contact-name', 'Error');
        updateElement('contact-location', 'Error');
         displayLanguages([]);
        displayProjects([]);
    }
});

function updateElement(id, value, isLink = false) {
    const element = document.getElementById(id);
    if (element) {
        const displayValue = (value === 'Not Found' || value === null || value === undefined || value === '') ? 'Not Found' : value;
        if (isLink) {
            if (displayValue === 'Not Found') {
                element.href = '#';
                element.textContent = 'Not Found';
            } else {
                element.href = displayValue;
                element.textContent = displayValue;
            }
        } else {
            element.textContent = displayValue;
        }
    }
}

function displayLanguages(languages) {
    console.log('Languages data received:', languages);

    const container = document.getElementById('languages-container');
    if (!container) {
        console.error('Languages container not found');
        return;
    }

    if (!Array.isArray(languages) || languages.length === 0) {
        container.innerHTML = '<p>Languages: Not Found</p>';
        return;
    }

    try {
        // Map languages to a consistent structure
        const processedLanguages = languages.map(lang => {
             // Attempt to find name and count in various potential nested structures
            const name = lang?.M?.name?.S || lang?.name?.S || lang?.name || 'Unknown';
            const count = lang?.M?.count?.N || lang?.count?.N || lang?.count || 0;
            return { name, count: parseInt(count, 10) || 0 }; // Ensure count is a number
        }).filter(lang => lang.name !== 'Unknown'); // Filter out languages with unknown names

        if (processedLanguages.length === 0) {
             container.innerHTML = '<p>Languages: Not Found</p>';
             return;
        }

        // Find the maximum count for progress bar calculation
        const maxCount = Math.max(...processedLanguages.map(l => l.count));

        const languagesHtml = processedLanguages.map(lang => {
            const width = maxCount > 0 ? (lang.count / maxCount * 100) : 0;
            return `
                <div class="language-item mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">${lang.name}</h4>
                        <span class="badge bg-success">${lang.count} repos</span>
                    </div>
                    <div class="progress mt-2" style="height: 8px;">
                        <div class="progress-bar bg-success" role="progressbar"
                             style="width: ${width}%;"
                             aria-valuenow="${lang.count}" aria-valuemin="0" aria-valuemax="${maxCount}">
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = languagesHtml;
    } catch (error) {
        console.error('Error displaying languages:', error);
        container.innerHTML = '<p class="text-danger">Error loading languages data</p>';
    }
}

function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    // Clear existing content
    projectsContainer.innerHTML = '';

    if (!Array.isArray(projects) || projects.length === 0) {
        projectsContainer.innerHTML = '<div class="col-12 text-center" id="no-projects-message"><p>No pinned projects found or data not available.</p></div>';
        return;
    }

    projects.forEach((projectWrapper, index) => {
        try {
            // Attempt to find project data in various potential nested structures
            const projectData = projectWrapper?.M?.project?.M || projectWrapper?.project?.M || projectWrapper?.M || projectWrapper;

            if (!projectData) {
                console.warn(`Invalid project data structure at index ${index}:`, projectWrapper);
                return;
            }

            const language = projectData.Language?.S || projectData.Language || 'Not specified';
            const repoName = projectData.RepoName?.S || projectData.RepoName || 'Untitled Project';
            const description = projectData.Description?.S || projectData.Description || 'No description available';
            const url = projectData.URL?.S || projectData.URL || '#';

             // Only display projects with a valid name and URL
             if (repoName === 'Untitled Project' || url === '#') {
                 console.warn(`Skipping project at index ${index} due to missing name or URL:`, projectData);
                 return;
            }

            const projectHtml = `
                <div class="col-lg-4 col-md-6 col-12 mb-4">
                    <div class="projects-thumb">
                        <div class="projects-info">
                            <small class="projects-tag">${language}</small>
                            <h3 class="projects-title">${repoName}</h3>
                            <p class="projects-description">${description}</p>
                        </div>
                        <a href="${url}" target="_blank" class="custom-btn btn mt-3">
                            <i class="bi-github me-2"></i>View on GitHub
                        </a>
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('beforeend', projectHtml);
        } catch (error) {
            console.error(`Error displaying project at index ${index}:`, error);
        }
    });
}

