class Weather {
    //refactor later to reflect best practices, etc.
    //this file finished last minute
    constructor() {
        this.Arweave = require("arweave/node");
        this.getHTML = require('html-get');
    }

    async arwCreateTrans(indata) {
        const arweave = await this.Arweave.init({
            host: "arweave.net",
            port: 443,
            protocol: "https"
        });
        let jwk = await arweave.wallets.generate();
        //use your key here ^ 
        arweave.network.getInfo().then(console.log);

        let transactionA = await arweave.createTransaction({
            data: indata
        }, jwk);
		
	transactionA.addTag("Content-Type", "text/html");

        await arweave.transactions.sign(transactionA, jwk);
        const response = await arweave.transactions.post(transactionA);
        console.log("ID : " + transactionA.id);

        await arweave.transactions.getStatus(transactionA.id).then(status => {
            console.log("status ");
            console.log(status);
        });

        return "Arweave transaction sent.";

    }

    async init() {
		let wThis = this;
        const {
            url,
            html,
            stats
        } = await this.getHTML('https://weather.com/weather/tenday/l/28431:4:US')
        wThis.arwCreateTrans(html)
            .then((result) => {
                console.log(result);
            });


    }
}

let cityWeathers = new Weather();
cityWeathers.init();
