let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = process.env.API_ROOT
}

export const API_ROOT = apiRoot
