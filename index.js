// We should wait for the page to load before running our Ajax request
$(document).ready(function() {

});

function displayError(error) {
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}


function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;
  const url = `https://api.github.com/repos/${user}/${repo}/commits`;

  $.get(url, function(data){
    const commitList = `<ul>${data
    .map(r => '<li>' + r.commit.author.name + ', ' + r.sha + '</li>')
    .join('')}</ul>`;

    document.getElementById("details").innerHTML = commitList;
  })
}



function showRepositories(result)  {
  const repos = result.items;
  const repoList = `<ul>${repos
       .map(
         repo =>
           '<li>' +
           '<strong>' +  repo.name + '</strong> -' +
           repo.description + '<br>' +
           '<a href="' + repo.html_url + '">' + repo.html_url + '</a>' + '<br>' +
           '<a href="#" onclick="showCommits(this)" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '">Show Commits</a>' +
           '</li>'
       )
       .join('')}</ul>`;

  document.getElementById("results").innerHTML = repoList;
}


function searchRepositories() {
  const searchTerms = $("#searchTerms").val();
  const url = "https://api.github.com/search/repositories?q=";

  $.get(`${url}${searchTerms}`)
    .done(showRepositories)
    .fail(displayError);
}
