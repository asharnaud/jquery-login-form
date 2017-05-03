var $ = window.jQuery

var LOGIN_BUTTON = $('#loginBtn')
var userName = $('#loginInput').val()
var passWord = $('#passwordInput').val()

function fetchLoginInfo () {
  var LOGIN_URL = 'http://127.0.0.1:7979/api/login'
  var LOGIN_DATA = {username: userName, password: passWord}
  $.post(LOGIN_URL, LOGIN_DATA).done(sendToSuccessUrl).fail(errorHandler)
}

function validateLoginInfo (e) {
  e.preventDefault()
  if (userName === '' && passWord === '') {
    LoadingState()
    fetchLoginInfo()
  } else {
    $('.error-message').html('Your username and password are missing!')
    console.log('missing')
  }
}

function sendToSuccessUrl () {
  var SUCCESS_URL = 'http://127.0.0.1:7979/index.html'
  window.location = SUCCESS_URL
}

function LoadingState () {
  LOGIN_BUTTON.attr('disabled', true)
  LOGIN_BUTTON.html('Loading...')
}

function errorHandler (error) {
  console.log(error)
  LOGIN_BUTTON.attr('disabled', false)
  if (error.status === 400) {
    $('#error').html('The username and password you entered did not match our records. Please double-check and try again.')
  } else if (error.status === 500) {
    $('#error').html('We are having an internal server error. Please try refreshing the page.')
  }
}

LOGIN_BUTTON.click(validateLoginInfo)
