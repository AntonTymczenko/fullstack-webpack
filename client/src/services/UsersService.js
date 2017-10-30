import Api from '@/services/Api'

export default {
  async getUser (id) {
    return (await Api().get(`/users/${id}`)).data
  }
}
