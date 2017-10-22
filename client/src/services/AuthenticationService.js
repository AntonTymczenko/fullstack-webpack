import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

/*
call this so:

AuthenticationServices.register({
  email: 'test@mail',
  password: '1234'
})
*/
