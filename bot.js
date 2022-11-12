const { Client, GatewayIntentBits, Routes, Collection, Message } = require("discord.js");
const config = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest')

// İntentsler
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.commands = new Collection();
const slashCommands = [];

// Botu Başlatma Kısmı
client.once('ready', () => {
    console.log(`${client.user.username} Aktif oldu.`) //Başlat.bat'ı açtığınızda çıkan yazı
    client.user.setActivity(`/yardım Version : BETA`) //Oynuyor kısmı

    let guildID = config.guildID
    let clientID = config.clientID
    let token = config.token

    const rest = new REST({ version: '10' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: slashCommands })
        .then(data => console.log(`${data.length} tane komut yüklendi`)) //Yüklenen komutların sayısı
        .catch(console.error);

});


//slashCommands klasörünü algılama kısmı
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

    client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
    
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Bu komut çalıştırılırken bir hata oluştu!\nLütfen kod yapımcısına bildirin 0xEmir#0019', ephemeral: true });
    }
})

client.login(config.token);