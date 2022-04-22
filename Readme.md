## Install
`npm i wax-paginator`

## Setup
```js
const { Client } = require("discord.js");
const { setupPaginator } = require("WaxPaginator");

// ...

client.on("ready", () => {
    // ...
    // client { Client }
    // expirationTime { Number } time in milliseconds unused
    setupPaginator({client: client, expirationTime: 30000});
});

// ...
```
## Creating paginator

```js
const { addPaginator, Paginator } = require("WaxPaginator");

// ...

function create({message, channel}) {
    const embeds = [/* ... */];
    const pg = new Paginator(embeds);
    addPaginator(pg);

    if (typeof message !== undefined) pg.replyMessage(message); // message.reply
    else if (typeof channel !== undefined) pg.sendChannel(channel); // message.channel.send
}
```

## Text to embed array
```js
const { generateEmbedPagination } = require("WaxPaginator");

const embeds = generateEmbedPagination(
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non urna ultrices, malesuada turpis sit amet, sollicitudin justo. Ut vel felis et metus tincidunt dapibus. Aenean sed ligula odio. Sed arcu nisi, lobortis eu nisl non, blandit venenatis lorem. Nam at erat luctus, tristique augue id, bibendum dui. Praesent tempus ultrices nisi, sit amet semper justo ullamcorper elementum. Ut ligula tellus, condimentum ut ornare vel, mollis ut ipsum. Duis varius neque vitae feugiat congue. Donec mollis vitae purus in aliquam. Ut bibendum urna quam, eu lobortis nulla condimentum non.
            Nullam consectetur massa eget risus rutrum, non bibendum massa sagittis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sem magna, lacinia eget sapien in, vehicula porta nulla. Fusce vel tellus vitae orci rutrum commodo. Aenean eget ultricies arcu. Praesent maximus eu risus id consectetur. Phasellus maximus imperdiet cursus. Duis ac justo a velit sagittis fermentum id eget nulla. Ut vitae neque vitae lorem consectetur malesuada quis aliquam neque. Donec quis odio elementum ex imperdiet aliquet.
            In pellentesque quam sed justo facilisis, eu pulvinar libero porta. Nulla ut felis vel urna laoreet faucibus. Etiam aliquam augue eu eros blandit, quis auctor nulla accumsan. Nunc egestas, nisi in congue vehicula, ligula nibh tempor enim, id bibendum odio tortor ut magna. Mauris iaculis eu quam a pharetra. Etiam bibendum tellus et justo iaculis, vel vestibulum nunc gravida. Nam ex arcu, dignissim id arcu et, pretium tristique urna. Praesent at fermentum nisi.
            Maecenas molestie, turpis in ultricies semper, neque elit cursus quam, feugiat rutrum metus eros sed enim. Sed molestie tortor nibh, sit amet suscipit massa blandit non. Vivamus pharetra sodales est, at auctor purus pharetra vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras in felis non tellus sagittis ultricies a sit amet sem. Praesent faucibus aliquet aliquet. Curabitur elit quam, facilisis vitae malesuada vel, consequat et purus. Sed vel sem nunc. Sed nec varius augue. Cras nulla arcu, accumsan eu magna a, fringilla cursus turpis. Morbi sit amet sodales ex, a suscipit mauris. In eget commodo neque. Proin sit amet rhoncus tortor. Phasellus tortor justo, sodales eget lorem eu, euismod euismod arcu. Nam condimentum mattis augue, at porta massa pretium ultricies. Maecenas ac ex velit.
            Cras efficitur ullamcorper odio, vitae tincidunt dolor lacinia vel. Sed ut molestie enim. Maecenas at gravida lacus. Nam tempor eros vitae tempus luctus. Ut pellentesque ut dolor at mattis. Duis nec urna suscipit, feugiat dui in, consectetur est. Suspendisse potenti. In vitae dolor malesuada, bibendum elit nec, facilisis metus. Pellentesque faucibus condimentum quam, sed dapibus eros rutrum in. Nam in lectus sed purus sagittis mattis vitae a est.`,
            {title: "Ceira", color: "#1ABC9C", maxlen: 2048});
```