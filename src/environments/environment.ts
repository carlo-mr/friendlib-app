// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  awsConfig: {
    // apparently it's save to push: https://stackoverflow.com/questions/47833797/are-the-cognito-user-pool-id-and-client-id-sensitive
    userPoolId: 'eu-central-1_pfvYGaiqz',
    loginId: 'cognito-idp.eu-central-1.amazonaws.com/eu-central-1_pfvYGaiqz',
    clientId: '28902im3i13g5qnfljcg84at1t',
    region: 'eu-central-1',
    identityPoolId: 'eu-central-1:777946e1-88b2-41ac-ba2e-f83325b2bca4'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
