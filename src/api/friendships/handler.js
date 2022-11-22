class FriendshipsHandler {
  constructor(service) {
    this._service = service;
  }

  async postFriendshipHandler(request, h) {
    const { from, to, type } = request.payload;
    const friendship = await this._service.addFriendship({ from, to, type });
    return friendship;
  }

  async updateFriendshipHandler(request) {
    const { from, to, type } = request.payload;
    const friendship = await this._service.updateFriendship({ from, to, type });
    return friendship;
  }

  async getFriendshipsHandler(request) {
    const { from, to } = request.params;
    const friendships = await this._service.getFriendships({ from, to });
    return friendships;
  }

  async getFriendshipsByTypeHandler(request) {
    const { from, to, type } = request.params;
    const friendships = await this._service.getFriendshipsByType({ from, to, type });
    return friendships;
  }

  async deleteFriendshipHandler(request) {
    const { from, to } = request;
    const friendship = await this._service.deleteFriendship({ from, to });
    return friendship;
  }
}

module.exports = FriendshipsHandler;
