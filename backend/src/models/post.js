import { DataTypes } from 'sequelize'
import PostgresSequelize from '../connector/postgres/index.js'

import CategoryModel from './category.js'

const Model = PostgresSequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  handle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'DRAFT', 'ARCHIVED'),
    defaultValue: 'DRAFT',
  },
  thumbnail: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
})

Model.belongsTo(CategoryModel)

Model.sync()

export default Model
