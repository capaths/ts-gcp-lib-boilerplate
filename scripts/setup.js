const readline = require("readline-sync");
const fs = require("fs");
const path = require('path');

const PACKAGE_JSON = path.join(path.dirname(__filename), '../package.json');

function ask(query, defaultValue) {
    const answer = readline.question(`${query} ("${defaultValue}"): `);
    return answer.length === 0 ? defaultValue : answer;
}

const packageJson = {...require('../package.json')};

const scope = ask("Scope", packageJson.config.scope);
const packageName = ask("Package name", packageJson.config.name);
const author = ask("Author", packageJson.author);
const project = ask("GCP Project ID", packageJson.config.project);
const location = ask("GCP location", packageJson.config.location);
const repository = ask("GCP AR repository", scope);
const description = ask("Package description", packageJson.description);

packageJson.name = `@${scope}/${packageName}`;
packageJson.author = author;
packageJson.description = description;
packageJson.config = {
    ...packageJson.config,
    "scope": scope,
    "name": packageName,
    "location": location,
    "repository": repository,
    "project": project
};

const npmRcBuild = "gcloud artifacts print-settings npm --scope=@$npm_package_config_scope --location=$npm_package_location --repository=$npm_package_config_repository --project $npm_package_config_project > .npmrc"
    .replace(/\$npm_package_config_scope/g, scope)
    .replace(/\$npm_package_location/g, location)
    .replace(/\$npm_package_config_repository/g, repository)
    .replace(/\$npm_package_config_project/g, project);

packageJson.scripts["npmrc:build"] = npmRcBuild;

fs.writeFileSync(
    PACKAGE_JSON,
    JSON.stringify(packageJson, undefined, 4),
    {
        encoding: 'utf8',
        flag: 'w'
    }
);
