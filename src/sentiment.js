const Sentiment = require('sentiment');
let sentiment = new Sentiment();
let result = sentiment.analyze(`The waves o 5G produces cancer cells," he said.

Among the more interesting technologies that McDonald describes are "thermoelectric generators," and ones that will connect devices with waves of different frequencies.

"It looks like you could make a low-frequency wave by bouncing radio signals off a built-in antenna," McDonald said.

His company is developing an implantable computer with a part that uses radio waves to transmit data.

"It's very similar to what a laptop would be, except the body does not need to power it," he said.

For more on future technology and how it might be delivered, watch this video:

The human body is unlike a computer, he said, and requires`);

console.log(result)
