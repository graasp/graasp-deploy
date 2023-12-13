const DEPLOYED_VERSIONS = ["staging", "production"];
const VERSIONS = ["latest", "staging", "production"];

async function loadData() {
  return Promise.all([
    fetch(
      "https://raw.githubusercontent.com/graasp/graasp-deploy/main/candidate-versions/latest.json"
    ).then((res) => res.json()),
    ...DEPLOYED_VERSIONS.map((version) =>
      fetch(
        `https://raw.githubusercontent.com/graasp/graasp-deploy/main/deployed/current-${version}-versions.json`
      ).then((res) => res.json())
    ),
  ]);
}

function createVersionCell(row, key) {
  const node = document.createElement("td");
  let elem;
  if (!row[key]) {
    node.className = "table-warning";
    elem = document.createTextNode("Not deployed");
  } else {
    elem = document.createElement("a");
    elem.href = `https://github.com/${row.repo}/releases/tag/${row[key]}`;
    elem.target = "_blank";
    elem.className = "text-decoration-none text-primary";
    elem.innerHTML = row[key];
  }
  node.appendChild(elem);
  return node;
}

function populateTable(data, id) {
  var tableElement = document.getElementById(`${id}-table-content`);
  data.forEach((repoData) => {
    var tableRow = document.createElement("tr");

    const repoCell = document.createElement("td");
    const elem = document.createElement("a");
    elem.className = "text-decoration-none";
    elem.href = `https://github.com/${repoData.repo}/`;

    elem.innerHTML = `${repoData.repo} ${
      repoData.staging !== repoData.latest
        ? '<span class="badge rounded-pill bg-success">New version</span>'
        : ""
    } ${
      repoData.production !== repoData.staging
        ? '<span class="badge rounded-pill text-bg-warning">On Stage</span>'
        : ""
    }`;
    elem.target = "_blank";

    repoCell.appendChild(elem);

    tableRow.appendChild(repoCell);
    // fetch latest release

    VERSIONS.map((version) =>
      tableRow.appendChild(createVersionCell(repoData, version))
    );
    if (repoData.staging !== repoData.production) {
      tableRow.className = "table-success";
    }

    tableElement.appendChild(tableRow);
  });
}

async function main() {
  // load data from the deployed directory
  const dataArr = await loadData();

  const repoData = {};
  const appData = {};

  VERSIONS.map((version, i) =>
    Object.entries(dataArr[i]).forEach(([repository, tag]) => {
      if (repository.includes("-app-") || repository.includes("-unity-")) {
        appData[repository] = {
          ...appData[repository],
          [version]: tag,
        };
      } else {
        repoData[repository] = {
          ...repoData[repository],
          [version]: tag,
        };
      }
    })
  );

  // sort repo names alphabetically
  const repoArr = Object.keys(repoData)
    .sort()
    .map((repo) => ({ repo, ...repoData[repo] }));

  // sort repo names alphabetically
  const appArr = Object.keys(appData)
    .sort()
    .map((repo) => ({ repo, ...appData[repo] }));

  // populate table with versions
  populateTable(repoArr, "core");
  populateTable(appArr, "app");
}

main();
