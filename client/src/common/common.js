export const getCSRFToken = async () => {
  const response = await axios.get('/getCSRFToken')
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken
}
