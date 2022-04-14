const models = require('./models')

async function createTestData(){
  const user = await models.User.create({});
  const link = await models.Link.create({
    linkUrl: "https://google.com",
    userId: user.id
  });
}

createTestData()
