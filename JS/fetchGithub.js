let repos = [];
class Repo {
  constructor(name, description, webUrl, apiUrl) {
    this._name = name;
    this._description = description;
    this._webUrl = webUrl;
    this._apiUrl = apiUrl;
    this._languages = [];
    this._commits = '';
    this.fetchCommits();
    this.fetchLanguages();
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get url() {
    return this._webUrl;
  }

  get languages() {
    return this._languages;
  }

  get commits() {
    return this._commits;
  }

  set commits(value) {
    this._commits = value;
  }

  set languages(value) {
    this._languages = value;
  }

  async fetchLanguages() {
    const url = this._apiUrl + '/languages';
    await $.ajax({
      url: url,
      complete: data => {
        this._languages = Object.keys(data.responseJSON);
      }
    });
  }

  async fetchCommits() {
    const url = this._apiUrl + '/commits';
    await $.ajax({
      url: url,
      complete: data => {
        this.commits = data.responseJSON.length >= 30 ? '+30' : `${data.responseJSON.length}`;
      }
    });
    updateTable();
  }
}

$(document).ready(async () => {
  $.ajax({
    url: 'https://api.github.com/users/MoutPessemier/repos',
    complete: xhr => {
      repos = xhr.responseJSON.map(json => {
        return new Repo(json.name, json.description, json.html_url, json.url);
      });
      // build up table based on data
      const tbody = $('#projectsData')[0];
      repos.forEach(repo => {
        const tr = document.createElement('tr');

        // name
        const tdName = document.createElement('td');
        tdName.style.fontSize = '12px';
        const tdNameText = document.createTextNode(repo.name);
        tdName.appendChild(tdNameText);
        tr.appendChild(tdName);

        // description
        const tdDescription = document.createElement('td');
        tdDescription.style.fontSize = '10px';
        const tdDescriptionText = document.createTextNode(repo.description);
        tdDescription.appendChild(tdDescriptionText);
        tr.appendChild(tdDescription);

        // languages
        const tdLanguages = document.createElement('td');
        tdLanguages.style.fontSize = '10px';
        tdLanguages.style.textAlign = 'center';
        tdLanguages.classList.add(repo.name + 'Lang');
        const tdLanguagesText = document.createTextNode(repo.languages);
        tdLanguages.appendChild(tdLanguagesText);
        tr.appendChild(tdLanguages);

        // commits
        const tdCommits = document.createElement('td');
        tdCommits.style.fontSize = '10px';
        tdCommits.style.textAlign = 'center';
        tdCommits.classList.add(repo.name + 'Commits');
        const tdCommitsText = document.createTextNode(repo.commits);
        tdCommits.appendChild(tdCommitsText);
        tr.appendChild(tdCommits);

        // url
        const tdUrl = document.createElement('td');
        const a = document.createElement('a');
        a.href = repo.url;
        a.target = '_blank';
        a.style.fontSize = '10px';
        const aUrlText = document.createTextNode(repo.url);
        tdUrl.appendChild(a);
        a.appendChild(aUrlText);
        tr.appendChild(tdUrl);

        tbody.appendChild(tr);
      });
    }
  });
});

const updateTable = () => {
  repos.forEach(repo => {
    const tdCommits = document.getElementsByClassName(`${repo.name}Commits`)[0];
    tdCommits.innerHTML = repo.commits;

    const tdLanguages = document.getElementsByClassName(`${repo.name}Lang`)[0];
    tdLanguages.innerHTML = repo.languages.join(', ');
  });
};
