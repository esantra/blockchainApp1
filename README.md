<html>
<img src="https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
<p>
This blockchain node.js app was completed in a very short time - under about 8 hours. It stores a copy of the Weather.com (The Weather Channel) 10 day weather forecast in the blockchain via <a href="https://docs.arweave.org/developers/">Arweave</a> apis on the exact time it was accessed. For example, if you run the program on Tuesday, it will store the exact forecast for Tuesday and when you retrieve it, you will see Tuesday's forecast. In this manner, you can compare Tuesday's 10 day forecast with Friday's and see if the forecast was wrong or perhaps altered from some unknown natural event ;) Have fun!
</p>
  
Install is super easy if you have Node.js installed on your machine. Just clone the repo, cd inside the repo, and then run
<br/>
      ```npm i```
<br/>
      ```npm start```

<p>
  <ul>
    <li>weather10HTML.js Grabs the html of the 10 day weather forecast for Athens, GA (you can change this in the code) in html webpage form using npm module <a href="https://www.npmjs.com/package/html-get">html-get</a></li>
    <li>Arweave stores the html of the page using blockweave(blockchain)</li>
    <li>My stored content can be accessed at the following Airweave Wallet Address: https://viewblock.io/arweave/address/Q4gENUSLHwfIF1H-z2jp7Eag6N_e2V6bbBahYW-6leM, but enter your own key for your own wallet.</li>
  </ul>
</p>
</html>

<i>*Files (weather.js and weather10.js) are available for storing api data from openweather api as well</i>
