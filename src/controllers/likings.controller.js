import sendResult from '../utils/sendResult';
import LikingService from '../services/liking.service';

const LikingsController = {
  async addLikeAccommdation(req, res) {
    try {
      const { userData } = req;
      const { accommodationId } = req.params;
      await LikingService.likeAccommdation({ userId: userData.userId, accommodationId }, res);
    } catch (error) {
      return sendResult(res, 400, 'Wrong accommodation ID sent');
    }
  },

  async getAccommdationLikes(req, res) {
    try {
      const { accommodationId } = req.params;
      const likes = await LikingService.getLikes(accommodationId);
      return sendResult(res, 200, 'likes', likes);
    } catch (error) {
      return sendResult(res, 400, 'Wrong accommodation ID sent');
    }
  }
};

export default LikingsController;
