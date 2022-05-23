const models = require('./models')

async function createTestData() {
  const link = await models.Link.create({
    linkUrl: "https://google.com",
  });
}

createTestData()
