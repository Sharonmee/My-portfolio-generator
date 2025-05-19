URL = 'https://mebofivpli.execute-api.us-east-1.amazonaws.com/API_Deploy'
PROJECTS_URL = 'https://jhxt150luk.execute-api.eu-west-2.amazonaws.com/Prod'

document.addEventListener('DOMContentLoaded', function(){
    console.log('script running');
    
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log('response:', data);
            
            updateElement('user-name', data.Item.Name.S);
            updateElement('about', data.Item.About.S);
            updateElement('full-name', data.Item.Name.S);
            updateElement('email', data.Item.Email.S);
            updateElement('url', data.Item.URL.S, true);
            
            const profileImage = document.querySelector('.avatar-image');
            if (profileImage && data.Item.ProfileImage.S) {
                profileImage.src = data.Item.ProfileImage.S;
            }
            
            const experienceElement = document.querySelector('.featured-numbers');
            if (experienceElement) {
                experienceElement.textContent = data.Item.YearsOfExperience.N + '+';
            }
            
            if (data.Item.Projects.L) {
                displayProjects(data.Item.Projects.L);
            }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
    
    fetch(PROJECTS_URL)
        .then(res => res.json())
        .then(data => {
            console.log('projects:', data);
            if (data.Item && data.Item.Projects.L) {
                displayProjects(data.Item.Projects.L);
            }
        })
        .catch(error => {
            console.log('Error fetching projects:', error);
        });
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

function displayProjects(projects) {
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;

    const projectsRow = projectsContainer.querySelector('.row');
    if (!projectsRow) return;

    const existingProjects = projectsRow.querySelectorAll('.col-lg-4');
    existingProjects.forEach(project => project.remove());

    projects.forEach(project => {
        const projectData = project.M;
        const projectHtml = `
            <div class="col-lg-4 col-md-6 col-12">
                <div class="projects-thumb">
                    <div class="projects-info">
                        <small class="projects-tag">${projectData.Language.S}</small>
                        <h3 class="projects-title">${projectData.RepoName.S}</h3>
                        <p class="projects-description">${projectData.Description.S}</p>
                    </div>
                    <a href="${projectData.URL.S}" target="_blank" class="projects-link">
                        <i class="bi-github"></i> View Project
                    </a>
                </div>
            </div>
        `;
        projectsRow.insertAdjacentHTML('beforeend', projectHtml);
    });
}
  