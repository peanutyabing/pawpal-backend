"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.user);
    }
  }
  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "user", key: "id" },
      },
      title: DataTypes.STRING,

      content: DataTypes.STRING,
      private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "post",
      underscored: true,
    }
  );
  return Post;
};
