self.addEventListener('custompaymentrequest', async (e) => {
    const requestOptions = {
        headers: {
            'Content Type': 'application/json'
        },
        body: JSON.stringify(e.detail.methodData)
    };

    const response = await fetch("https://gib-app-1c49c.web.app/pay", requestOptions);
    console.log(response);
});