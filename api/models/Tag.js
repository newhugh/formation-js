/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    migrate : "safe",
    adapter : "postgres",
    tableName : "Tag",

  attributes: {
      nom : "string",
      ref_bookmark : "integer"
  }
};

