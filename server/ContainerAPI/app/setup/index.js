const mongoose = require('mongoose'),
      UserModel = require('@ContainerModels/user'),
      KeywordModel = require('@ContainerModels/keyword'),
      ContentModel = require('@ContainerModels/content'),
      MapModel = require('@ContainerModels/map');

const models = {
  User: UserModel,
  Keyword: KeywordModel,
  Content: ContentModel,
  Map: MapModel
};

module.exports = models;