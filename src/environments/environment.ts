// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: '/',
  fixturesUrl: 'https://s3.eu-central-1.amazonaws.com/league-manager/fixtures.json',
  region: 'eu-central-1',
  userpoolId: 'eu-central-1_Ag3bgriK2',
  clientId: '7slpnptmm7ncp6pv8ootqptj0l',
  identityPoolId: 'eu-central-1:9320684e-9b38-40b7-b515-2ae575b27e12'
};
