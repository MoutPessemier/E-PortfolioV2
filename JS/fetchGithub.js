const repos = [];
const isEnglish = document.documentElement.lang == 'en';
class Repo {
  constructor(name, description, webUrl, apiUrl) {
    this._name = name;
    this._description = description;
    this._webUrl = webUrl;
    this._apiUrl = apiUrl;
    this._languages = [];
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

  set languages(value) {
    this._languages = value;
  }

  async fetchLanguages() {
    const url = this._apiUrl + '/languages';
    await $.ajax({
      url: url,
      complete: data => {
        this._languages = Object.keys(data.responseJSON);
      },
    });
  }
}

$(document).ready(async () => {
  $.ajax({
    url: 'https://api.github.com/users/MoutPessemier/repos',
    complete: xhr => {
      repos = xhr.responseJSON.map(json => {
        return new Repo(json.name, json.description, json.html_url, json.url);
      });
      // build up list based on data
      const container = document.getElementById('projectListContainer');
      repos.forEach(repo => {
        const li = document.createElement('li');

        //header
        const collapsibleHeader = document.createElement('div');
        collapsibleHeader.classList.add('collapsible-header');
        const headerText = document.createTextNode(repo.name);
        collapsibleHeader.appendChild(headerText);
        li.appendChild(collapsibleHeader);

        //body
        const collapsibleBody = document.createElement('div');
        collapsibleBody.classList.add('collapsible-body');

        const description = document.createElement('p');
        const descText = document.createTextNode(repo.description);
        description.appendChild(descText);
        collapsibleBody.appendChild(description);

        const languages = document.createElement('p');
        languages.style.marginTop = '1rem';
        const langTxt = isEnglish ? 'Languages used: ' : 'Talen gebruikt: ';
        const langText = document.createTextNode(langTxt + repo.languages);
        languages.appendChild(langText);
        collapsibleBody.appendChild(languages);

        const url = document.createElement('a');
        url.href = repo.url;
        url.target = '_blank';
        url.style.marginTop = '1rem';
        url.style.display = 'block';
        const urlText = document.createTextNode(repo.url);
        url.appendChild(urlText);
        collapsibleBody.appendChild(url);

        li.appendChild(collapsibleBody);
        container.appendChild(li);
      });
    },
    error: () => {
      const container = document.getElementById('projectListContainer');
      const div = document.createElement('div');
      div.classList.add('center');
      const txt = isEnglish
        ? 'Something went wrong or the request limit is reached, check back later!'
        : 'Er is iets fout gegeaan of het maximum aantal requests is bereikt, kom later terug!';
      const text = document.createTextNode(txt);
      div.appendChild(text);
      container.appendChild(div);
    },
  });
  updateTable();
});

const updateTable = () => {
  repos.forEach(repo => {
    const tdLanguages = document.getElementsByClassName(`${repo.name}Lang`)[0];
    tdLanguages.innerHTML = repo.languages.join(', ');
  });
};
