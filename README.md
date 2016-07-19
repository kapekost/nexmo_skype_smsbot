# Skype bot sending SMS via Nexmo account

simple skype bot sending sms messages via Nexmo API

![image](https://cloud.githubusercontent.com/assets/5909422/16964252/54385596-4df2-11e6-93c7-5b78a19b2d17.png)

  - create a skype bot
  - create a nodejs webhook to listen for skype messages
  - expose your local webhook with ngrok (to test your bot live)
  - identify 'sms' keyword
  - integrate nexmo services to send an actual sms to a mobile phone

>similar to this case, you can use the rest of the NEXMO API e.g. to receive messages

## To help you get there faster
You will find in this repo
- the skype sdk (tar.gz) [download the latest for your platform from here](https://developer.microsoft.com/en-us/skype/bots/downloads)
- the ngrok for mac os [download the latest for your platform from here](https://ngrok.com/download)

### Version
0.0.1

### Setup
- checkout the repo and cd in the directory using your ```terminal```
```sh
$ git clone https://github.com/kapekost/nexmo_skype_smsbot nexmo_skype_smsbot
$ cd nexmo_skype_smsbot
```
- install the required libraries [botbuilder nexmo restify ./skype-sdk.tar.gz]
```sh
$ npm install
```
- create a [Nexmo account](https://dashboard.nexmo.com/sign-up) and save your API_KEY and SECRET
- create / sign in to [Microsof Bot Framework](https://dev.botframework.com/bots), and then create a bot following the directions there

![image](https://cloud.githubusercontent.com/assets/5909422/16964305/a064ab86-4df2-11e6-849d-b2649a2819c5.png)

- copy your APP ID and PASSWORD
- configure your bot (no need to publish) [any fields you don't know leave blank for now]
- open another ```terminal``` in the same directory 
- start ```ngrok``` listening on port 8080
```sh
$ ./ngrok_mac http 8080
```
- copy the `https` url (every time you start ngrok this changes and you will have to update skype-bot settings
- edit your bot configuration set the `Messaging endpoint` to the ngrok `https` url + append `/api/messages` in the end
- edit the app.js file and set the following:
 
>line 6: `apiKey: "NEXMO_API_KEY", apiSecret: "NEXMO_API_SECRET"`

>line 27, 28:     appId: "SKYPE_APP_ID", appPassword: "SKYPE_APP_PASSWORD"

>line 37: add 'var sender = "YOUR_NUMBER";'

- run node.js
```sh
$ node app.js
```
- at your Skype bot Dashboard you will find the Channels, and under the first Skype option the `Test link` can be clicked to add the bot's contact to your skype.
- open your private conversation with the bot and type in the keyword sms
- the bot will reply asking you for the content of the message and the receiver

With the trial ```Nexmo``` account you can use your own phone number and you get for free 2 Euros for testing. 
The number format is described [here](https://help.nexmo.com/hc/en-us/articles/204014803-Getting-started-sending-SMS-guide) (include country code, no leading 0s and the phone number: 
e.g. (UK) 447479000000
