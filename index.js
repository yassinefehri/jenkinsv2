document.addEventListener('DOMContentLoaded', () => {
    //Update document title 
    document.title = document.title.replace(/\s*-\s*Jenkins$/, '');

    //Update favicon
    document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = '/userContent/sopra-logo-nobg.png?v=' + Date.now();
    document.head.appendChild(link);

    // Update logo
    const logo = document.querySelector("#jenkins-head-icon");
    if (logo) {
        logo.src = '/userContent/sopra-logo-nobg.png';
        logo.style.width = "150px";
        logo.style.height = "auto";
    }

    // Hide Jenkins text
    const jenkinsText = document.querySelector("a.app-jenkins-logo .jenkins-mobile-hide");
    if (jenkinsText) {
        jenkinsText.style.display = "none";
    }

    // Helper to insert "New Node" button without overwriting existing tasks 
    function addNewNodeButton(tasks) {
        if (!document.querySelector('[href="manage/computer"]') && tasks) {
            // Check if button already exists to avoid duplicates
            if (!tasks.querySelector('.task-link[href="manage/computer"]')) {
                const task = document.createElement('div');
                task.className = 'task';
                task.style.display = 'inline-block';
                task.innerHTML = `
                    <span class="task-link-wrapper">
                        <a class="task-link task-link-no-confirm" href="manage/computer" style="display:flex;align-items:center;">
                            <span class="task-icon-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24.75" height="24.75">
                                    <path d="M256 112v288M400 256H112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
                                </svg>
                            </span>
                            <span class="task-link-text">New Node</span>
                        </a>
                    </span>`;
                // Insert at the very top without removing existing buttons
                tasks.insertBefore(task, tasks.firstChild);
                console.log("New Node button added without overwriting existing tasks");
            }
        }
    }

    // Insert instantly if #tasks exists 
    const tasks = document.querySelector("#tasks");
    if (tasks) {
        addNewNodeButton(tasks);
    }

    //Observe for dynamically loaded tasks 
    const tasksObserver = new MutationObserver((mutations, obs) => {
        const dynamicTasks = document.querySelector("#tasks");
        if (dynamicTasks) {
            addNewNodeButton(dynamicTasks);
            obs.disconnect(); // stop observing after adding
        }
    });

    tasksObserver.observe(document.body, { childList: true, subtree: true });
});

