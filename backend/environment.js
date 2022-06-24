const DEVELOPMENT_POSTGRES_URI = 'postgres://postgres:mysecretpassword@localhost:5432'
const DEVELOPMENT_REDEMPTION_BASE_URL = 'localhost:4000'
const DEVELOPMENT_INTERLEDGER_RS_URL = 'http://127.0.0.1:7770'
const DEVELOPMENT_INTERLEDGER_RS_SETTLEMENT_URL = 'http://127.0.0.1:7771'
const DEVELOPMENT_INTERLEDGER_RS_ADMIN_TOKEN = 'admin-a'

function getPostgresURI() {
  /**get the uri to connect to backend postgres instance
   */
  return process.env.GIB_POSTGRES_URI || DEVELOPMENT_POSTGRES_URI
}

function getRedemptionBaseUrl() {
  /**get the base url used for constructing the returned endpoint to redeem links
   */
  return process.env.GIB_REDEMPTION_BASE_URL || DEVELOPMENT_REDEMPTION_BASE_URL
}

function getInterledgerRsUrl() {
  return process.env.INTERLEDGER_RS_URL || DEVELOPMENT_INTERLEDGER_RS_URL
}

function getInterledgerRsSettlementUrl() {
  return process.env.INTERLEDGER_RS_SETTLEMENT_URL || DEVELOPMENT_INTERLEDGER_RS_SETTLEMENT_URL
}

function getInterledgerRsAdminToken() {
  return process.env.DEVELOPMENT_INTERLEDGER_RS_ADMIN_TOKEN || DEVELOPMENT_INTERLEDGER_RS_ADMIN_TOKEN
}

module.exports = {getPostgresURI, getRedemptionBaseUrl, getInterledgerRsUrl, getInterledgerRsSettlementUrl, getInterledgerRsAdminToken}
