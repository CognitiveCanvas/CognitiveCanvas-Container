const mongoose = require('mongoose'),
      UserModel = require('@ContainerModels/user'),
      KeywordModel = require('@ContainerModels/keyword'),
      ContentModel = require('@ContainerModels/content');

const models = {
  User: UserModel,
  Keyword: KeywordModel,
  Content: ContentModel
}

module.exports = models;