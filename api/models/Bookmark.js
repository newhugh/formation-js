/**
* Bookmark.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    migrate : "safe",
    adapter : "postgres",
    tableName : "Bookmark",
    attributes: {
        // Par défaut Sails considère qu'une table contient forcément un id, un createdAt et un updatedAt : pas la peine de préciser ces 4 éléments dans les attributes
        url : "string"
    }
};

