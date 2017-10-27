import Api from '@/services/Api'

export default {
  async index () {
    return (await Api().get('/songs')).data
  },
  create (song) {
    return Api().post('/songs', song)
  },
  async show (id) {
    return (await Api().get(`/songs/${id}`)).data
  },
  update (id, song) {
    return Api().post(`/songs/${id}`, song)
  },

}
