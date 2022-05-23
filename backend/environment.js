const DEVELOPMENT_POSTGRES_URI = 'postgres://postgres:mysecretpassword@localhost:5432'
const DEVELOPMENT_REDEMPTION_BASE_URL = 'localhost:4000'

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

module.exports = {getPostgresURI, getRedemptionBaseUrl}
