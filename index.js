function displayError(error) {
  //jQuery
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
// document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
// }


function displayCommits(data) {
  $("#details").html(commits.map(commit=> { return (
    `<div>
      <img src="${commit.avatar_url}" width="100px"><br>
      <h4>${commit.commit.author.name} - (${commit.author.login})</h4>
      <p>${commit.sha}</p>
    </div>`);
  }).join(""));
};


function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;

  $.get(`https://api.github.com/repos/${user}/${repo}/commits`, displayCommits).fail(displayError);
}



function showRepositories(result)  {
  const repos = result.items;
  const repoList = `<ul>${repos.map(repo =>
    '<li>' +
    '<strong>' +  repo.name + '</strong> -' +
    repo.description + '<br>' +
    '<a href="' + repo.html_url + '">' + repo.html_url + '</a>' + '<br>' +
    '<a href="#" onclick="showCommits(this)" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '">Show Commits</a>' +
    '</li>'
  ).join('')}</ul>`;

  document.getElementById("results").innerHTML = repoList;
}



function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  const url = "https://api.github.com/search/repositories?q=";

  $.get(`${url}${searchTerms}`)
    .done(showRepositories)
    .fail(displayError);
}



$(document).ready(function() {

});
