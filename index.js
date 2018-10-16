function displayError(error) {
  //jQuery
  $("#errors").html("I'm sorry, there's been an error. Please try again.");
}
// document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
// }


function searchRepositories() {
  const input = document.getElementById("searchTerms").value
  const url = `https://api.github.com/search/repositories?q=${input}`



    $.get(url, function(data) {
      console.log(data.items);

    const repoList = `<ul>${data.items
    .map(r => '<li>' + r.name + ', ' + r.html_url + '</li>' + `<a href="#" data-repository="${r.name}" data-owner="${r.owner.login}" onclick="showCommits(this)">Show Commits</a>`)
    .join('')}</ul>`;
    document.getElementById("results").innerHTML = repoList;
    }).fail(displayError())


}


function displayError() {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
}

function showCommits(el) {
  const repo = el.dataset.repository;
  const user = el.dataset.owner;
  const url = `https://api.github.com/repos/${user}/${repo}/commits`
  $.get(url, function(data){
    const commitList = `<ul>${data
    .map(r => '<li>' + r.commit.author.name + ', ' + r.sha + '</li>')
    .join('')}</ul>`;
    document.getElementById("details").innerHTML = commitList;
  })
 
}


$(document).ready(function() {

});
