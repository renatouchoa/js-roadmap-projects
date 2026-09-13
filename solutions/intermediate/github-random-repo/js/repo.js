import Icon from "./icon.js";

class Repo {

    container = document.getElementById('repo-container');
    title = document.getElementById('repo-title');
    description = document.getElementById('repo-desc');
    language = document.getElementById('repo-lang');
    stars = document.getElementById('repo-stars');
    forks = document.getElementById('repo-forks');
    issues = document.getElementById('repo-issues');
    ownerAvatar = document.getElementById('repo-owner-avatar');
    ownerName = document.getElementById('repo-owner-name');

    fetch(respository) {
        this.fetchTitle(respository.name);
        this.fetchDescription(respository.description);
        this.fetchLanguage(respository.language);
        this.fetchStars(respository.stargazers_count);
        this.fetchForks(respository.forks_count);
        this.fetchIssues(respository.open_issues_count);
        this.fetchOwnerAvatar(respository.owner.avatar_url);
        this.fetchOwnerName(respository.owner.login);
        this.show();
    }

    fetchTitle(title) {
        this.title.textContent = title;
    }

    fetchDescription(description) {
        this.description.textContent = description;
    }

    fetchLanguage(language) {
        const content = document.createElement('span');
        content.textContent = language;
        this.language.textContent = '';
        this.language.appendChild(Icon.build(language));
        this.language.appendChild(content);
    }

    fetchStars(stars) {
        const content = document.createElement('span');
        content.textContent = stars;
        this.stars.textContent = '';
        this.stars.appendChild(Icon.build('star'));
        this.stars.appendChild(content);
    }

    fetchForks(forks) {
        const content = document.createElement('span');
        content.textContent = forks;
        this.forks.textContent = '';
        this.forks.appendChild(Icon.build('fork'));
        this.forks.appendChild(content);
    }

    fetchIssues(issues) {
        const content = document.createElement('span');
        content.textContent = issues;
        this.issues.textContent = '';
        this.issues.appendChild(Icon.build('issue'));
        this.issues.appendChild(content);
    }

    fetchOwnerAvatar(avatarUrl) {
        const img = document.createElement('img');
        img.src = avatarUrl;
        img.className = 'rounded-circle avatar';
        this.ownerAvatar.innerHTML = '';
        this.ownerAvatar.appendChild(img);
    }

    fetchOwnerName(name) {
        this.ownerName.textContent = name;
    }

    hide() {
        this.container.hidden = true;
    }

    show() {
        this.container.hidden = false;
    }

}

export default new Repo();