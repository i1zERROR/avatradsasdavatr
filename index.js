const { Client, Intents, MessageActionRow, MessageSelectMenu, MessageAttachment, MessagePayload  } = require('discord.js');
const fs = require('fs');
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fetch = require('node-fetch');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

client.once('ready', () => {
    console.log('Ready!');
});

async function fetchImage(url) {
    const response = await fetch(url);
    return response.buffer();
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [
  new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('add an effect for your avatar.')
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('Select either anime or flag.')
        .setRequired(true)
        .addChoices(
          { name: 'Anime effect', value: 'slsh_anime' },
          { name: 'Discrod decorations', value: 'slsh_decorations' },
          { name: 'Flag effect', value: 'slsh_flags' },
          { name: 'Frame effect', value: 'slsh_frames' }

        )
    ),
];

client.once('ready', () => {
  console.log('Ready!');

  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
          body: commands,
      });
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;
    const member = interaction.member;
  if (commandName === 'avatar') {
    const type = options.getString('type');

    if (type === 'slsh_anime') {
      
        const anime = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('anime')
                .setPlaceholder('Select an anime effect for your avatar')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Gojo1',
                        value: 'Gojo1',
                        emoji: '1218010552824107058'
                    },
                ]),
        );
        const embed = {
      color: 0x0099ff,
      title: 'Avatar Effects',
      description: 'Choose an anime effect for your avatar.',
      fields: [
          {
              name: 'Available Effects',
              value: '- Discord decorations\n- Flags\n- Anime\n- Other',
          },
      ],
    footer: {
        text: 'Note: The bot does not support GIF avatars.'
    },
    thumbnail: {
          url: member.displayAvatarURL({ format: 'png', size: 256 })
      },
    image: {
        url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
    }
  };
           interaction.reply({ embeds: [embed], ephemeral: false, components:[anime] });
        return;

    } else if (type === 'slsh_decorations') {
      const decorations = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('decorations')
                    .setPlaceholder('Select an Discord decoration for your avatar')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Balance',
                            value: 'balance',
                            emoji: '1217489558036283513'
                        },
                      {
                          label: 'Ki',
                          value: 'ki',
                          emoji: '1217500015015100446'
                      },{
                          label: 'Air',
                          value: 'air',
                          emoji: '1218014196457799701'
                      },{
                          label: 'Fire',
                          value: 'fire',
                          emoji: '1218018995463262328'
                      },{
                          label: 'beamchop',
                          value: 'beamchop',
                          emoji: '1218018995463262328'
                      }
                    ]),
            );
             const embed = {
          color: 0x0099ff,
          title: 'Avatar Effects',
          description: 'Choose an Discord decoration for your avatar.',
          fields: [
              {
                  name: 'Available Effects',
                  value: '- Discord decorations\n- Flags\n- Anime \n- Other',
              },
          ],
        footer: {
            text: 'Note: The bot does not support GIF avatars.'
        },
        thumbnail: {
              url: member.displayAvatarURL({ format: 'png', size: 256 })
          },
        image: {
            url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
        }
      };
            await interaction.reply({ embeds: [embed], ephemeral: false, components:[decorations] });
            return;
    }  else if (type === 'slsh_flags') {
  const flags = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('flags')
                .setPlaceholder('Select an flag effect for your avatar.')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Palestine',
                        value: 'palestine',
                        emoji: '1218016962446102539'
                    },
                ]),
        );

               const embed = {
            color: 0x0099ff,
            title: 'Avatar Effects',
            description: 'Choose an flag effect for your avatar.',
            fields: [
                {
                    name: 'Available Effects',
                    value: '- Discord decorations\n- Flags\n- Anime \n- Other',
                },
            ],
          footer: {
              text: 'Note: The bot does not support GIF avatars.'
          },
          thumbnail: {
                url: member.displayAvatarURL({ format: 'png', size: 256 })
            },
          image: {
              url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
          }
        };
              await interaction.reply({ embeds: [embed], ephemeral: false, components:[flags] });
              return;
    }  else if (type === 'slsh_frames') {
 const frames = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('frames')
                .setPlaceholder('Select an frame effect for your avatar')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'frame 1',
                        description: 'frame 1',
                        value: 'frame1',
                        emoji: '1218011122154864751'
                    },
                ]),
        );


               const embed = {
            color: 0x0099ff,
            title: 'Avatar Effects',
            description: 'Choose an frame effect for your avatar.',
            fields: [
                {
                    name: 'Available Effects',
                    value: '- Discord decorations\n- Flags\n- Anime \n- Other',
                },
            ],
          footer: {
              text: 'Note: The bot does not support GIF avatars.'
          },
          thumbnail: {
                url: member.displayAvatarURL({ format: 'png', size: 256 })
            },
          image: {
              url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
          }
        };
              await interaction.reply({ embeds: [embed], ephemeral: false, components:[frames] });
              return;
    } else {
      await interaction.reply('Invalid option selected.', { ephemeral: true });
    }
  }
});


client.on('messageCreate', async message => {
  
    if (!message.content.startsWith('-avatar')) return;
  const select = new MessageActionRow()
  .addComponents(
      new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Select the type of the effect ')
          .setMinValues(1)
          .setMaxValues(1)
          .addOptions([
              {
                  label: 'Anime effect',
                  value: 'slanime',
                  emoji: '1218010552824107058'
              },
            {
                label: 'Discrod decorations',
                value: 'sldecorations',
                emoji: '1218018995463262328'
            },
            {
                label: 'Flag effect',
                value: 'slflags',
                emoji: '1218016962446102539'
            }, {
                label: 'Frame effect',
                value: 'slframes',
                emoji: '1218011122154864751'
            },
          ]),
  );

  const se = {
      color: 0x0099ff,
      title: 'Avatar Effects',
      description: 'Choose type of the effect for your avatar.',
      fields: [
          {
              name: 'Available Effects',
              value: '- Discord decorations\n- Flags\n- Anime\n- Other',
          },
      ],
    footer: {
        text: 'Note: The bot does not support GIF avatars.'
    },
    thumbnail: {
          url: message.author.displayAvatarURL({ format: 'png', size: 256 })
      },
    image: {
        url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
    }
  };
await message.reply({ embeds: [se], ephemeral: false, components:[select] });
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    let choice = interaction.values[0];
    const member = interaction.member;
  let ERR = interaction.customId;
 console.log(choice)
  const baseImageUrl = member.displayAvatarURL({ format: 'png', size: 256 });

  console.log(baseImageUrl);
    if (ERR === 'decorations' || ERR === 'flags' ||  ERR === 'anime' ||  ERR === 'frames'||  ERR === 'select') {
      let frames;
      let speed;
      let zoomFactor;
      let sec;
      let alpha;
      if (ERR === 'decorations') {
          frames = '60'; 
          speed = '80'; 
        zoomFactor = '1';
        sec = '0';
          alpha = '1';

        if (choice === 'air'){
         zoomFactor = '1.2';
        }else if (choice === 'fire'){
           zoomFactor = '1.1';
        }else if (choice === 'beamchop'){
           frames = '45'; 
          speed = '85'; 

        }
      } else if (ERR === 'flags') {
          frames = '375'; 
          speed = 70 / 3; 
        zoomFactor = '1';
        sec = '0';
        alpha = '1';

      }else if (ERR === 'anime') {
          frames = '53'; 
          speed = '30'; 
        zoomFactor = '1';
        sec = '4000';
        alpha = '0.6';


      }else if (ERR === 'frames'){
        if (choice === 'frame1'){
        frames = '150'; 
        speed = '40'; 
          zoomFactor = '1.01';
          sec = '0';
          alpha = '1';

        }
      }else if (choice === 'slanime') {

        const anime = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('anime')
                .setPlaceholder('Select an anime effect for your avatar')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Gojo1',
                        value: 'Gojo1',
                        emoji: '1218010552824107058'
                    },
                ]),
        );
        const embed = {
      color: 0x0099ff,
      title: 'Avatar Effects',
      description: 'Choose an anime effect for your avatar.',
      fields: [
          {
              name: 'Available Effects',
              value: '- Discord decorations\n- Flags\n- Other',
          },
      ],
    footer: {
        text: 'Note: The bot does not support GIF avatars.'
    },
    thumbnail: {
          url: member.displayAvatarURL({ format: 'png', size: 256 })
      },
    image: {
        url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
    }
  };
        await interaction.update({ embeds: [embed], ephemeral: false, components:[anime] });
        return;
      }
      else if (choice === 'sldecorations') {
const decorations = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('decorations')
                .setPlaceholder('Select an Discord decoration for your avatar')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Balance',
                        value: 'balance',
                        emoji: '1217489558036283513'
                    },
                  {
                      label: 'Ki',
                      value: 'ki',
                      emoji: '1217500015015100446'
                  },{
                      label: 'Air',
                      value: 'air',
                      emoji: '1218014196457799701'
                  },{
                      label: 'Fire',
                      value: 'fire',
                      emoji: '1218018995463262328'
                  },{
                      label: 'beamchop',
                      value: 'beamchop',
                      emoji: '1218018995463262328'
                  }
                ]),
        );
         const embed = {
      color: 0x0099ff,
      title: 'Avatar Effects',
      description: 'Choose an Discord decoration for your avatar.',
      fields: [
          {
              name: 'Available Effects',
              value: '- Discord decorations\n- Flags\n- Anime \n- Other',
          },
      ],
    footer: {
        text: 'Note: The bot does not support GIF avatars.'
    },
    thumbnail: {
          url: member.displayAvatarURL({ format: 'png', size: 256 })
      },
    image: {
        url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
    }
  };
        await interaction.update({ embeds: [embed], ephemeral: false, components:[decorations] });
        return;
      }else if (choice === 'slflags') {

        const flags = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('flags')
                .setPlaceholder('Select an flag effect for your avatar.')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'Palestine',
                        value: 'palestine',
                        emoji: '1218016962446102539'
                    },
                ]),
        );

               const embed = {
            color: 0x0099ff,
            title: 'Avatar Effects',
            description: 'Choose an flag effect for your avatar.',
            fields: [
                {
                    name: 'Available Effects',
                    value: '- Discord decorations\n- Flags\n- Anime \n- Other',
                },
            ],
          footer: {
              text: 'Note: The bot does not support GIF avatars.'
          },
          thumbnail: {
                url: member.displayAvatarURL({ format: 'png', size: 256 })
            },
          image: {
              url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
          }
        };
              await interaction.update({ embeds: [embed], ephemeral: false, components:[flags] });
              return;
            }else if (choice === 'slframes') {

        const frames = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('frames')
                .setPlaceholder('Select an frame effect for your avatar')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: 'frame 1',
                        description: 'frame 1',
                        value: 'frame1',
                        emoji: '1218011122154864751'
                    },
                ]),
        );


               const embed = {
            color: 0x0099ff,
            title: 'Avatar Effects',
            description: 'Choose an frame effect for your avatar.',
            fields: [
                {
                    name: 'Available Effects',
                    value: '- Discord decorations\n- Flags\n- Anime \n- Other',
                },
            ],
          footer: {
              text: 'Note: The bot does not support GIF avatars.'
          },
          thumbnail: {
                url: member.displayAvatarURL({ format: 'png', size: 256 })
            },
          image: {
              url: 'https://media.discordapp.net/attachments/1194256637444227294/1215074273270571078/image_1.png?ex=65fb6d19&is=65e8f819&hm=b00cde16807b6effdc5f1c0ff45bcfab2600652d5f7a8f9d8e8992f5dbad3067&=&format=webp&quality=lossless&width=853&height=480'
          }
        };
              await interaction.update({ embeds: [embed], ephemeral: false, components:[frames] });
              return;
            }
      await interaction.reply({ content: "Generating your avatar...<a:emoji_110:1211823648290115674>", ephemeral: false });

        const frameDir = `./frames/${ERR}/${choice}/`; // Directory where your frames are stored
        const outputGifPath = path.join(__dirname, 'output.gif');

        try {
            // Fetch base image
          const framesFor2Seconds = sec / speed; 
            const baseImageBuffer = await fetchImage(baseImageUrl);
            const base = await loadImage(baseImageBuffer);

            // Create canvas with desired size (100x100)
            const canvas = createCanvas(200, 200);
            const ctx = canvas.getContext('2d');

            // Resize base image to fit the canvas
            ctx.drawImage(base, 0, 0, 200, 200);

            // Create GIF encoder with canvas size
            const encoder = new GIFEncoder(200, 200);
            encoder.start();
            encoder.setRepeat(0); // 0 for looping
          encoder.setDelay(speed); // Set delay for 3x faster playback

            encoder.setQuality(15);

            const stream = encoder.createWriteStream().pipe(fs.createWriteStream(outputGifPath));

          // Add 2 seconds of the base image at the start of the GIF
          for (let i = 0; i < framesFor2Seconds; i++) {
              ctx.drawImage(base, 0, 0, 200, 200);
              encoder.addFrame(ctx);
          }
            for (let i = 1; i <= frames; i++) {
                const framePath = `${frameDir}frame (${i}).png`;
                const overlay = await loadImage(framePath);
              
              ctx.globalAlpha = alpha;

              const overlayWidth = 200 * zoomFactor; 
              const overlayHeight = 200 * zoomFactor; 
              const overlayX = (200 - overlayWidth) / 2; 
              const overlayY = (200 - overlayHeight) / 2; 

              ctx.drawImage(base, 0, 0, 200, 200); // Draw base image
              ctx.drawImage(overlay, overlayX, overlayY, overlayWidth, overlayHeight);  // Overlay frame

                encoder.addFrame(ctx);

            }
          ctx.globalAlpha = 1.0;

            encoder.finish();

            stream.on('finish', async () => {
              const now = new Date();


              const dateString = now.toISOString().split('T')[0]; 
              const timeString = now.toTimeString().split(':')[0] + '-' + now.toTimeString().split(':')[1]; 
              const dateTimeString = `${dateString}-${timeString}`;

            
              const filename = `result-${dateTimeString}.gif`;

          
              const attachment = new MessageAttachment(outputGifPath, filename);
              await interaction.editReply({ 
                  content: `Done <@${interaction.member.id}>`, 
                  files: [attachment] 
              }).catch(console.error);
            });
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while creating the GIF.').catch(console.error);
        }
    } else {
        await interaction.reply('Invalid choice. Please select a valid effect.').catch(console.error);
    }
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error here, e.g., send a notification, log to a file, etc.
});
client.login(process.env.DISCORD_TOKEN);