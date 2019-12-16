class Weather {
    //refactor later to reflect best practices, etc.
    //this file finished last minute
    constructor() {
        this.weather = require("openweather-apis");
        this.Arweave = require("arweave/node");

        this.apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        this.cities = ["Atlanta", "Los Angeles", "New York City", "Chicago", "Seattle", "Las Vegas", "Memphis", "Phoenix",
            "Birmingham", "Nashville", "Detroit", "Chadbourn"
        ];

        this.weather.setLang("en");
        this.weather.setUnits("metric");
        this.weather.setAPPID(this.apiKey);
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

        await arweave.transactions.sign(transactionA, jwk);
        const response = await arweave.transactions.post(transactionA);
        console.log("ID : " + transactionA.id);

        await arweave.transactions.getStatus(transactionA.id).then(status => {
            console.log("status ");
            console.log(status);
        })

        return "Arweave transaction sent.";

    }

    async init() {
		let wThis = this;
            await this.cities.forEach(city => {
                    console.log(city);
                    this.weather.setCity(city);
                    // get 10 days forecast
                    this.weather.getWeatherForecastForDays(10, function(err, data) {
                        let stringData = "<html><head><meta charset='UTF-8'><title>City Weather Data</title></head><body>" +
                            JSON.stringify(data) +
                            "</body></html>";
                        wThis.arwCreateTrans(stringData)
                            .then((result) => {
                                console.log(result);
                            });
                    });
            });

    }
}

let cityWeathers = new Weather();
cityWeathers.init();
