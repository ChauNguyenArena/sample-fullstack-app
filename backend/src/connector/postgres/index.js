import 'dotenv/config'

import { Sequelize } from 'sequelize'

const { POSTGRES_USER, POSTGRES_PWD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env

const PostgresSequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PWD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  {
    logging: false,
    dialect: 'postgres',
    pool: { max: 100, min: 0, idle: 200000, acquire: 1000000 },
  }
)

export default PostgresSequelize
