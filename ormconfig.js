/* eslint-disable @typescript-eslint/no-var-requires */
const {
    DB_HOST,
    DB_PORT,
    DB_PASSWORD,
    DB_USER,
    DB_NAME,
  } = require('common-config')
  const { join } = require('path')

  const backendSharedDbDir = join(__dirname, 'backend-common', 'build', 'shared-db')
  const sharedEntitiesDir = join(backendSharedDbDir, 'entity')
  const sharedEntities = [ join(sharedEntitiesDir, '*.js') ]

  const toolsSharedDbDir = join(__dirname, 'tools', 'build', 'shared-db')
  const sharedMigrationsDir = join(toolsSharedDbDir, 'migrations')
  const sharedMigrations = [ join(sharedMigrationsDir, '*.js') ]

  const sharedConfig = {
    name: 'shared',
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: sharedEntities,
    migrations: sharedMigrations,
    entityPrefix: 'aorist_',
    cli: {
      entitiesDir: sharedEntitiesDir,
      migrationsDir: sharedMigrationsDir
    }
  }

  const defaultConfig = {...sharedConfig, name: 'default'}

  const adminDbDir = join(__dirname, 'admin-db')
  const adminEntitiesDir = join(adminDbDir, 'entity').toString()
  const adminEntities = [ join(adminEntitiesDir, '*.js').toString() ]

  const toolsAdminDbDir = join(__dirname, 'tools', 'build', 'admin-db')
  const adminMigrationsDir = join(toolsAdminDbDir, 'migrations').toString()
  const adminMigrations = [ join(adminMigrationsDir, '*.js').toString() ]

  const adminConfig = {
    name: 'admin',
    type: 'postgres',
    host: ADMIN_DB_HOST,
    port: ADMIN_DB_PORT,
    username: ADMIN_DB_USER,
    password: ADMIN_DB_PASSWORD,
    database: ADMIN_DB_DATABASE,
    entities: adminEntities,
    migrations: adminMigrations,
    entityPrefix: 'aorist_',
    cli: {
      entitiesDir: adminEntitiesDir,
      migrationsDir: adminMigrationsDir
    }
  }

  const result = [
    defaultConfig,
    sharedConfig,
    adminConfig
  ]

  module.exports = result
