const axios = require('axios');
const enviroment = require('./environment')


const createUser = async (username) => {
  const url = enviroment.getInterledgerRsUrl()
  try {
    const resp = await axios.post(url + "/accounts",
      {
        "username": username,
        "asset_scale": 9,
        "asset_code": "ABC",
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

const transferFunds = async (fromUser, receiver) => {
  try {
    return await axios.post(enviroment.getInterledgerRsUrl() + "/accounts/" + fromUser + "/payments",
      {
        "receiver": receiver,
        "source_amount": 1
      },
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

const main = async () => {
  let resp = await createUser('userthree')
  console.log(resp)
  //resp = await createUser('usertwo')
  //console.log(resp)
  //let resp = await transferFunds('userone', "localhost.usertwo")
  //console.log(resp)
  //const userResp = await getUsers()
  //console.log(userResp.data)
  //const userResp = await getUser("userone")
  //console.log(userResp.data)
}

console.log('here')
main()
