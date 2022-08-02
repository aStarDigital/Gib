const axios = require('axios');
const enviroment = require('./environment')


const createUser = async (username, password) => {
  const url = enviroment.getInterledgerRsUrl()
  try {
    const resp = await axios.post(url + "/accounts",
      {
        "username": username,
        "asset_scale": 9,
        "asset_code": "ABC",
        "ilp_over_http_incoming_token": password,
      },
      {
        headers: {
          "authorization": 'Bearer ' + enviroment.getInterledgerRsAdminToken()
        },
        timeout: 1000
      }

    )
    return resp
  } catch (error) {
    console.error(error.message)
    console.error(error)
  }

}

const getUsers = async () => {
  try {
    const resp = await axios.get(enviroment.getInterledgerRsUrl() + "/accounts", {
      headers: {
        "authorization": 'Bearer ' + enviroment.getInterledgerRsAdminToken()
      }
    }
    )
    return resp
  } catch (error) {
    console.error(error.message)
    console.error(error)
  }
}

const getUser = async (userName) => {
  try {
    return await axios.get(enviroment.getInterledgerRsUrl() + "/accounts/" + userName,
      {
        headers: {
          "authorization": 'Bearer ' + enviroment.getInterledgerRsAdminToken()
        }
      }
    )
  } catch (error) {
    console.error(error.message)
    console.error(error)
  }
}

const getBalance = async (userName) => {
  try {
    return await axios.get(enviroment.getInterledgerRsUrl() + "/accounts/" + userName + "/balance",
      {
        headers: {
          "authorization": 'Bearer ' + enviroment.getInterledgerRsAdminToken()
        }
      }
    )
  } catch (error) {
    console.error(error.message)
    console.error(error)
  }
}

const transferFunds = async (fromUser, password, receiver, amount) => {
  try {
    return await axios.post(enviroment.getInterledgerRsUrl() + "/accounts/" + fromUser + "/payments",
      {
        "receiver": receiver,
        "source_amount": amount,
        "asset_scale": 9,
        "asset_code": "ABC",
      },
      {
        headers: {
          "authorization": 'Bearer ' + fromUser + ":" + password
        }
      }
    )
  } catch (error) {
    console.error(error.message)
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  transferFunds
}

const main = async () => {
  //let resp = await createUser('newuser3', 'newuser-password')
  //console.log(resp.data)
  //resp = await createUser('newuser4', 'newuser-password-2')
  //console.log(resp.data)
  //resp = await transferFunds('newuser3', 'newuser-password', 'http://localhost:7770/accounts/newuser4/spsp', 1)
  //console.log(resp.data)
  //resp = await transferFunds('alice', 'alice-password', 'http://localhost:7770/accounts/bob/spsp')
  //console.log(resp)

  //resp = await createUser('usertwo')
  //console.log(resp)
  //let resp = await transferFunds('userone', "localhost.usertwo")
  //console.log(resp)
  const userResp = await getUsers()
  console.log(userResp.data)
  //const userResp = await getUser("userone")
  //console.log(userResp.data)
}
//main()

module.exports = {transferFunds, getUser, getUsers, createUser, getBalance}
