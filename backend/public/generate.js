// comment out this line for production
const DEBUG = true

function getGibUrl() {
  if (DEBUG) {
    return "http://127.0.0.1:4000"
  } else {
    return "https://gib.gives"
  }
}

const USER_ID = "8d3c7d79-d4b6-467f-a8f6-76292b368bdd"

function displayUrls(originalUrl, gibUrl) {
  $("#gibLink").text(gibUrl)
  $("#gibLinkSection").removeAttr("hidden")

}


async function generateGibUrl(url, linkAmount) {
  $.ajax({
    type: "POST",
    url: getGibUrl() + "/gib/link/",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      userId: USER_ID,
      linkUrl: url,
      linkAmount: linkAmount
    }),
    success: function (response) {
      displayUrls(url, response.redemptionUrl)
    },
    error: function (response) {
      console.error(response);
      return
    }
  });
}

$(document).ready(function () {
  $("#linkGenerate").click(async function () {
    const currentUrl = ($("#inputUrl").val())
    const inputLinkAmount = ($("#inputLinkAmount").val())
    await generateGibUrl(currentUrl, inputLinkAmount)
  });
});
