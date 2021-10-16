const readline = require("readline-sync");
const fs = require("fs");
const path = require('path');

const PACKAGE_JSON = path.join(path.dirname(__filename), '../package.json');

function ask(query, defaultValue) {
    const answer = readline.question(`${query} (${defaultValue}): `);
    return answer.length === 0 ? defaultValue : answer;
}

const scope = ask("Scope", "my-scope");
const packageName = ask("Package name", "my-package");
const author = ask("Author", "me");
const location = ask("GCP location", "us-central1");
const repository = ask("GCP AR repository", "my-repository");

const packageJson = {...require('../package.json')};
packageJson.name = `@${scope}/${packageName}`;
packageJson.author = author;
packageJson.config = {
    ...packageJson.config,
    "scope": scope,
    "name": packageName,
    "location": location,
    "repository": repository
};

const npmrcBuild = "gcloud artifacts print-settings npm --scope=@$npm_package_config_scope --location=$npm_package_location --repository=$npm_package_config_repository --project nirby-prod > .npmrc"
    .replaceAll('$npm_package_config_scope', scope)
    .replaceAll('$npm_package_location', scope)
    .replaceAll('$npm_package_config_repository', scope);

packageJson.scripts["npmrc:build"] = npmrcBuild;

fs.writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, undefined, 4), {encoding: 'utf8',flag:'w'});
