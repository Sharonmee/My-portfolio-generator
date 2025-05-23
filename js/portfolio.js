// // Get username from URL parameters
// function getUsernameFromUrl() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('username');
// }

// // Base URLs for your APIs
// const BASE_URL = 'https://enpo5jyn97.execute-api.eu-west-2.amazonaws.com/Test/';
// const PROJECTS_BASE_URL = 'https://h99pu2exbe.execute-api.eu-west-2.amazonaws.com/prod';

// document.addEventListener('DOMContentLoaded', async function (){
//     console.log('script running');
    
//     const username = getUsernameFromUrl();
//     console.log(username)
//     if (!username) {
//         console.error('No username provided');
//         return;
//     }

//     // Construct URLs with username
//     const userUrl = `${BASE_URL}?username=${username}`;
//     const projectsUrl = `${PROJECTS_BASE_URL}?username=${username}`;
    
//     fetch(userUrl)
//         .then(res => res.json())
//         .then(data => {
//             console.log('response:', data);
            
//             // Update basic info
//             updateElement('user-name', data.Name.S);
//             updateElement('about', data.About.S);
//             updateElement('full-name', data.Name.S);
//             updateElement('email', data.Email.S);
//             updateElement('url', data.URL.S, true);
            
//             // Update profile images
//             const profileImages = document.querySelectorAll('.avatar-image');
//             if (data.AvatarUrl.S) {
//                 profileImages.forEach(img => {
//                     img.src = data.AvatarUrl.S;
//                 });
//             }
            
//             // Update GitHub stats
//             updateElement('years-experience', data.YearsOfExperience.N + '+');
//             updateElement('total-repos', data.PublicRepos.N);
//             updateElement('followers', data.Followers.N);
//             updateElement('following', data.Following.N);
            
//             // Update languages in skills section
//             if (data.Languages.L) {
//                 displayLanguages(data.Languages.L);
//             }
            
//             // Update projects
//             if (data.Projects.L) {
//                 displayProjects(data.Projects.L);
//             }
//         })
//         .catch(error => {
//             console.log('Error fetching data:', error);
//         });
    
//     fetch(projectsUrl)
//         .then(res => res.json())
//         .then(data => {
//             console.log('projects:', data);
//             if (data.Projects.L) {
//                 displayProjects(data.Projects.L);
//             }
//         })
//         .catch(error => {
//             console.log('Error fetching projects:', error);
//         });
// });

// function updateElement(id, value, isLink = false) {
//     const element = document.getElementById(id);
//     if (element) {
//         if (isLink) {
//             element.href = value;
//             element.textContent = value;
//         } else {
//             element.textContent = value;
//         }
//     }
// }

// function displayLanguages(languages) {
//     const container = document.getElementById('languages-container');
//     if (!container) return;

//     const languagesHtml = languages.map(lang => {
//         const name = lang.M.name.S;
//         const count = lang.M.count.N;
//         return `
//             <div class="language-item mb-4">
//                 <div class="d-flex justify-content-between align-items-center">
//                     <h4 class="mb-0">${name}</h4>
//                     <span class="badge bg-success">${count} repos</span>
//                 </div>
//                 <div class="progress mt-2 " style="height: 8px;">
//                     <div class="progress-bar bg-success" role="progressbar" 
//                          style="width: ${(count / languages[0].M.count.N * 100)}%" 
//                          aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${languages[0].M.count.N}">
//                     </div>
//                 </div>
//             </div>
//         `;
//     }).join('');

//     container.innerHTML = languagesHtml;
// }

// function displayProjects(projects) {
//     const projectsContainer = document.querySelector('.projects');
//     if (!projectsContainer) {
//         console.error('Projects container not found');
//         return;
//     }

//     const projectsRow = projectsContainer.querySelector('.row');
//     if (!projectsRow) {
//         console.error('Projects row not found');
//         return;
//     }

//     // Remove existing project placeholders
//     const existingProjects = projectsRow.querySelectorAll('.col-lg-4');
//     existingProjects.forEach(project => project.remove());

//     if (!Array.isArray(projects)) {
//         console.error('Projects data is not an array:', projects);
//         return;
//     }

//     projects.forEach((project, index) => {
//         try {
//             if (!project || !project.M) {
//                 console.error(`Invalid project data at index ${index}:`, project);
//                 return;
//             }

//             const projectData = project.M;
            
//             // Access the deeply nested properties correctly
//             const language = projectData.project?.M?.M?.M?.Language?.M?.S?.S || 'Not specified';
//             const repoName = projectData.project?.M?.M?.M?.RepoName?.M?.S?.S || 'Untitled Project';
//             const description = projectData.project?.M?.M?.M?.Description?.M?.S?.S || 'No description available';
//             const url = projectData.project?.M?.M?.M?.URL?.M?.S?.S || '#';

//             const projectHtml = `
//                 <div class="col-lg-4 col-md-6 col-12 mb-4">
//                     <div class="projects-thumb">
//                         <div class="projects-info">
//                             <small class="projects-tag">${language}</small>
//                             <h3 class="projects-title">${repoName}</h3>
//                             <p class="projects-description">${description}</p>
//                         </div>
//                         <a href="${url}" target="_blank" class="custom-btn btn mt-3">
//                             <i class="bi-github me-2"></i>View on GitHub
//                         </a>
//                     </div>
//                 </div>
//             `;
//             projectsRow.insertAdjacentHTML('beforeend', projectHtml);
//         } catch (error) {
//             console.error(`Error displaying project at index ${index}:`, error);
//         }
//     });
// }
  

// Get username from URL parameters
function getUsernameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}

// Base URLs for your APIs
const BASE_URL = 'https://enpo5jyn97.execute-api.eu-west-2.amazonaws.com/Test/';
const PROJECTS_BASE_URL = 'https://h99pu2exbe.execute-api.eu-west-2.amazonaws.com/prod';

document.addEventListener('DOMContentLoaded', async function () {
    console.log('script running');

    const username = getUsernameFromUrl();
    console.log('Username:', username);
    if (!username) {
        console.error('No username provided');
        return;
    }

    const userUrl = `${BASE_URL}?username=${username}`;
    const projectsUrl = `${PROJECTS_BASE_URL}?username=${username}`;

    try {
        const userRes = await fetch(userUrl);
        const userData = await userRes.json();
        console.log('User Data:', userData);

        // Support both DynamoDB-style and plain JSON
        const getValue = (field, type = 'S') => {
            return userData[field]?.[type] || userData[field] || '';
        };

        updateElement('user-name', getValue('Name'));
        updateElement('about', getValue('About'));
        updateElement('full-name', getValue('Name'));
        updateElement('email', getValue('Email'));
        updateElement('url', getValue('URL'), true);

        const avatarUrl = getValue('AvatarUrl');
        if (avatarUrl) {
            document.querySelectorAll('.avatar-image').forEach(img => {
                img.src = avatarUrl;
            });
        }

        updateElement('years-experience', getValue('YearsOfExperience', 'N') + '+');
        updateElement('total-repos', getValue('PublicRepos', 'N'));
        updateElement('followers', getValue('Followers', 'N'));
        updateElement('following', getValue('Following', 'N'));

        console.log('Languages data from userData:', userData.Languages);
        if (userData.Languages?.L) {
            displayLanguages(userData.Languages.L);
        } else if (userData.Languages) {
            displayLanguages(userData.Languages);
        }

        if (userData.Projects?.L) {
            displayProjects(userData.Projects.L);
        }

    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    try {
        const projectsRes = await fetch(projectsUrl);
        const projectData = await projectsRes.json();
        console.log('Projects Data:', projectData);

        if (projectData.Projects) {
            displayProjects(projectData.Projects);
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
});

function updateElement(id, value, isLink = false) {
    const element = document.getElementById(id);
    if (element) {
        if (isLink) {
            element.href = value;
            element.textContent = value;
        } else {
            element.textContent = value;
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

    if (!Array.isArray(languages)) {
        console.error('Languages data is not an array:', languages);
        return;
    }

    try {
        const languagesHtml = languages.map(lang => {
            // Try different possible data structures
            const name = lang.M?.name?.S || lang.name?.S || lang.name || 'Unknown';
            const count = lang.M?.count?.N || lang.count?.N || lang.count || 0;
            
            console.log('Processing language:', { name, count });

            return `
                <div class="language-item mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">${name}</h4>
                        <span class="badge bg-success">${count} repos</span>
                    </div>
                    <div class="progress mt-2" style="height: 8px;">
                        <div class="progress-bar bg-success" role="progressbar" 
                             style="width: ${(count / Math.max(...languages.map(l => l.M?.count?.N || l.count?.N || l.count || 0)) * 100)}%" 
                             aria-valuenow="${count}" aria-valuemin="0" aria-valuemax="${Math.max(...languages.map(l => l.M?.count?.N || l.count?.N || l.count || 0))}">
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
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    const projectsRow = projectsContainer.querySelector('.row');
    if (!projectsRow) {
        console.error('Projects row not found');
        return;
    }

    // Remove existing project placeholders
    const existingProjects = projectsRow.querySelectorAll('.col-lg-4');
    existingProjects.forEach(project => project.remove());

    if (!Array.isArray(projects)) {
        console.error('Projects data is not an array:', projects);
        return;
    }

    projects.forEach((projectWrapper, index) => {
        try {
            // Access the nested project data correctly
            const projectData = projectWrapper?.project;
            
            if (!projectData) {
                console.error(`Invalid project data at index ${index}:`, projectWrapper);
                return;
            }

            // Extract values using the correct structure
            const language = projectData.Language || 'Not specified';
            const repoName = projectData.RepoName || 'Untitled Project';
            const description = projectData.Description || 'No description available';
            const url = projectData.URL || '#';

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
            projectsRow.insertAdjacentHTML('beforeend', projectHtml);
        } catch (error) {
            console.error(`Error displaying project at index ${index}:`, error);
        }
    });
}
