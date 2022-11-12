const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilgi') // Komutun adı '/ dan' sonra yazmanız gereken kısım !!BÜYÜK HARF KULLANMAYIN HATA ALIRSINIZ.
        .setDescription('Bot hakkındaki bilgiler.'), // Komutun açıklaması
    async execute(client, interaction) {

        var örnek = new EmbedBuilder() // Embed oluşturma
            .setColor("#05ff3f") // Embedin rengi
            .setAuthor({ name: 'BOT BİLGİ', iconURL: 'https://i.hizliresim.com/64n4u57.png' }) //Embedin başlığı 'Url kısmına istediğiniz gif veya png resimi koyabilirsiniz.'
            .addFields(
                { name: 'Botun Adı :', value: 'x0Emir' },
                { name: 'Botun Sahibi :', value: '0xEmir#0019' },
                { name: 'Botu Kodlayan :', value: '0xEmir#0019' },
            )
    
            await interaction.reply({ embeds: [örnek] });
    },
};