const mongoose = require('mongoose'),
      UserModel = require('@ContainerModels/user'),
      KeywordModel = require('@ContainerModels/keyword'),
      ContentModel = require('@ContainerModels/content'),
      MapModel = require('@ContainerModels/map'),
      ActionModel = require('@ContainerModels/action');

const models = {
  User: UserModel,
  Keyword: KeywordModel,
  Content: ContentModel,
  Map: MapModel,
  Action: ActionModel
};

module.exports = models;