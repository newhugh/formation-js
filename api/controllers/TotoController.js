/**
 * BookmarkController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    create : function (req, res) {
        console.log(Bookmark.find({ url: 'bookarktest' }))

        return res.send("Hi there!");
  },
};

