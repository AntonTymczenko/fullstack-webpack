import Api from '@/services/Api'

export default {
  async getUser (id) {
    return (await Api().get(`/users/${id}`)).data
  },
  async isBookmarked (userId, songId) {
    return (await Api().get(`/users/${userId}/isBookmarked?songId=${songId}`)).data
  },
  async toggleBookmark (userId, songId) {
    return (await Api().put(`/users/${userId}/toggleBookmark?songId=${songId}`)).data
  }
}
