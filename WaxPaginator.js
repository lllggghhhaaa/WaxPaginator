const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");


const paginators = new Map();
let expirationTimeout;

function setup({ client, expirationTime = 30000 }) {
    expirationTimeout = expirationTime;

    client.on("interactionCreate", interaction => {
        if (!interaction.isButton()) return;

        const match = /^wpg(?<button>l|r)(?<id>\d+)$/gm.exec(interaction.customId);
        if (!match) return;

        const paginator = paginators.get(parseInt(match.groups.id));

        if (match.groups["button"] == 'l') {
            paginators.get(parseInt(match.groups["id"])).movePrevious();
        } else {
            paginators.get(parseInt(match.groups["id"])).moveNext();
        }

        interaction.deferUpdate();
    });
}

/**
 * @param { Paginator } paginator 
 */
function addPaginator(paginator) {
    let id = 0;
    while (paginators.has(id)) id++;

    paginator.id = id;
    paginators.set(id, paginator);
}

function disposePaginator(id) {
    const paginator = paginators.get(id);

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`wpgl${id}d`)
                .setLabel('Previous')
                .setStyle('PRIMARY')
                .setDisabled(true),
            new MessageButton()
                .setCustomId(`wpgr${id}d`)
                .setLabel('Next')
                .setStyle('PRIMARY')
                .setDisabled(true)
        );

    paginator.message.edit({ embeds: [paginator.embeds[paginator.index]], components: [row] });

    paginators.delete(id);
}

/**
 * Split an text into an embed array
 * @param { String } text
 * @returns { MessageEmbed[] }
 */
function generateEmbedPagination(text, { title, color, maxlen = 2048}) {
    text = text.replace("\n", "\n  ");
    const lines = text.split(" ");
    const texts = [];
    const embeds = [];

    let str = "";
    for (let i = 0; i < lines.length; i++) {
        if (str.length + lines[i].length < maxlen) {
            str += lines[i] + " ";
        } else if (str != ''){
            texts.push(str);
            str = "";
        }
    }

    if (str != '' && texts[texts.length - 1] != str) texts.push(str);

    for (let i = 0; i < texts.length; i++) {
        const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(texts[i])
        .setColor(color);

        embeds.push(embed);
    }

    return embeds;
}

function getRow(id) {
    return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`wpgl${id}`)
                .setLabel('Previous')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId(`wpgr${id}`)
                .setLabel('Next')
                .setStyle('PRIMARY')
        );
}

class Paginator {
    index = 0;
    
    /**
     * @param { MessageEmbed[] } embeds 
     */
    constructor(embeds) {
        for (let i = 0; i < embeds.length; i++) {
            embeds[i].setFooter({ text: `Page ${i + 1}/${embeds.length}` });
        }

        this.embeds = embeds;
    }

    async sendChannel(channel) {
        const row = getRow(this.id);

        this.message = await channel.send({embeds: [this.embeds[0]], components: [row]});
        this.expTime = Date.now() + expirationTimeout;

        setTimeout(this.dispose.bind(this), expirationTimeout);
    }

    async replyMessage(message) {
        const row = getRow(this.id);

        this.message = await message.reply({embeds: [this.embeds[0]], components: [row]});
        this.expTime = Date.now() + expirationTimeout;

        setTimeout(this.dispose.bind(this), expirationTimeout);
    }

    moveNext() {
        if (this.index == this.embeds.length - 1) return;
        this.index++;
        this.updateEmbed();
    }

    movePrevious() {
        if (this.index == 0) return;
        this.index--;
        this.updateEmbed();
    }

    updateEmbed() {
        this.message.edit({embeds: [this.embeds[this.index]]});
        this.expTime = Date.now() + expirationTimeout;
    }

    dispose() {
        const ts = Date.now();

        if (ts > this.expTime) disposePaginator(this.id);
        else setTimeout(this.dispose.bind(this), ts - this.expTime);
    }
}

module.exports.Paginator = Paginator;
module.exports.setupPaginator = setup;
module.exports.addPaginator = addPaginator;
module.exports.generateEmbedPagination = generateEmbedPagination;
module.exports.disposePaginator = disposePaginator;