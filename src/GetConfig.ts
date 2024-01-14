import Config from "./config.production.json"

export const getConfig = (): typeof Config => {
  const environment = process.env.NODE_ENV
  return require(`./config.${environment}.json`)
}