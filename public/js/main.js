var $ = window.jQuery

var LOGIN_BUTTON = $('#loginBtn')
var TEN_SECONDS = 10000

function LoginInfo (evt) {
  evt.preventDefault()
  var $userName = $('#loginInput').val()
  var $passWord = $('#passwordInput').val()
  if ($userName !== '' || $passWord !== '') {
    var userLoginInfo = {username: $userName, password: $passWord}
    validateAndFetchLoginInfo(userLoginInfo)
  } else {
    $('.error-message').html('Your username and password are missing!')
  }
}

function validateAndFetchLoginInfo (userInfo) {
  LoadingState()
  var LOGIN_URL = 'http://127.0.0.1:7979/api/login'
  $.ajax({
    type: 'POST',
    url: LOGIN_URL,
    data: userInfo,
    dataType: 'JSON',
    success: sendToSuccessUrl,
    error: errorHandler,
    timeout: TEN_SECONDS
  })
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
  LOGIN_BUTTON.html('Log In')
}

LOGIN_BUTTON.click(LoginInfo)
