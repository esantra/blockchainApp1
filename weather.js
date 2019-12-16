class Weather {
    //refactor later to reflect best practices, etc.
    constructor() {
        this.currentWeather = require('node-clima').Current;
        this.Arweave = require('arweave/node');

        this.apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        this.current = new this.currentWeather(this.apiKey);
        this.cities = ["Atlanta", "Los Angeles", "New York City", "Chicago", "Seattle", "Las Vegas", "Memphis", "Phoenix",
            "Birmingham", "Nashville", "Detroit"
        ];
    }


    async arwCreateTrans(indata) {
        const arweave = await this.Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https'
        });
        let jwk = await arweave.wallets.generate();
		//use your key here ^
        arweave.network.getInfo().then(console.log);

        let transactionA = await arweave.createTransaction({
            data: indata
        }, jwk);

        await arweave.transactions.sign(transactionA, jwk);
        const response = await arweave.transactions.post(transactionA);
        console.log('ID : ' + transactionA.id);

        await arweave.transactions.getStatus(transactionA.id).then(status => {
            console.log('status ');
            console.log(status);
        })

        return 1;

    }

    async init() {
        this.cities.forEach(city => {
            console.log(city);
            this.current.byCityName(city)
                .then((data) => {
                    let stringData = '<html><head><meta charset="UTF-8"><title>City Weather Data</title></head><body>' 
					+ JSON.stringify(data) + 
					'</body></html>';
                    this.arwCreateTrans(stringData)
                        .then((result) => {
                            console.log(result);
                        });
                });
        });
    }

}

let cityWeathers = new Weather();
cityWeathers.init();