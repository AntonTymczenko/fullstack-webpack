import Api from '@/services/Api'

export default {
  async index (s) {
    return (await Api().get('/songs', {
      params: { s }
    })).data
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
