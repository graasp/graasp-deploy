const VERSIONS = ["staging", "production"];

async function loadData() {
  return await Promise.all(
    VERSIONS.map((version) =>
      fetch(
        `https://graasp.github.io/graasp-deploy/deployed/current-${version}-versions.json`
      ).then((res) => res.json())
    )
  );
}

function createVersionCell(row, key) {
  const node = document.createElement("td");
  if (!row[key]) {
    node.className = "table-warning";
    const content = document.createTextNode(row[key] || "Not deployed");
    node.appendChild(content);
  } else {
    const elem = document.createElement("a");
    elem.href = `https://github.com/${row.repo}/releases/tag/${row[key]}`;
    elem.innerHTML = row[key];
    elem.target = "_blank";
    node.appendChild(elem);
  }
  return node;
}

function populateTable(data) {
  var tableElement = document.getElementById("table-content");
  data.forEach((repoData) => {
    var tableRow = document.createElement("tr");

    const repoCell = document.createElement("td");
    const elem = document.createElement("a");
    elem.className = "text-decoration-none";
    elem.href = "https://github.com/graasp/graasp/";

    elem.innerHTML = `${repoData.repo} ${
      repoData.staging !== repoData.production
        ? '<span class="badge bg-success">New</span>'
        : ""
    }`;
    elem.target = "_blank";

    repoCell.appendChild(elem);

    tableRow.appendChild(repoCell);
    VERSIONS.map((version) =>
      tableRow.appendChild(createVersionCell(repoData, version))
    );

    tableElement.appendChild(tableRow);
  });
}

async function main() {
  // load data from the deployed directory
  const dataArr = await loadData();

  const repoData = {};

  VERSIONS.map((version, i) =>
    dataArr[i].include.forEach(({ repository, tag }) => {
      repoData[repository] = {
        ...repoData[repository],
        [version]: tag,
      };
    })
  );

  // sort repo names alphabetically
  const repoArr = Object.keys(repoData)
    .sort()
    .map((repo) => ({ repo, ...repoData[repo] }));

  console.log(repoArr);

  // populate table with versions
  populateTable(repoArr);
}

main();
