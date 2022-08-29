//? Importing my files
import { networth, weight, whatShouldIDo, auction } from './commands/importCommands.js';
//? Exporting the function.
export default async function handleMessages(message) {
    if (typeof (message) !== "string")
        message = message.toString();
    if (!message.includes('Guild > '))
        return undefined;
    console.log(message);
    message = removeExtras(message);
    var username = getUserName(message);
    message = message.replace(username, "");
    var msg = message;
    msg = msg.trimStart();
    if (msg.startsWith('/')) {
        return 'The prefix is being changed to "." so that it matches with the discord bot';
    }
    if (msg.toLowerCase().includes("hey hakari, what should i do?")) {
        return await whatShouldIDo(username);
    }
    if (msg.startsWith('.')) {
        var args = msg.split(" ");
        switch (args[0]) {
            case '.networth':
                if (args[1])
                    username = args[1];
                if (args[2] == "custom") { }
                ;
                //? Planning on making my own api for networth
                var response = await networth(username);
                return response;
                break;
            case '.weight':
                if (args[1])
                    username = args[1];
                if (args[2] && args[2].includes("lily"))
                    response = await weight(username, "lily");
                else {
                    response = await weight(username, "senither");
                }
                return response;
            case '.ah':
                msg = msg.replace(args[1] + " ", "");
                return await auction(username, msg);
        }
    }
}
export function removeExtras(message) {
    message = message.replace('Guild > ', '');
    var rank = getRank(message);
    if (rank != "[NON]") {
        message = message.replace(rank, '');
    }
    var guildRank = getGuildRank(message);
    if (rank != '[NOGUILDRANK]') {
        message = message.replace(guildRank, '');
    }
    message = message.replaceAll(']', '');
    message = message.replace(":", '');
    return message;
}
export function getRank(message) {
    var substring = message.substring(message.indexOf("["), message.indexOf("]"));
    if (!substring)
        substring = "[NON]";
    return substring;
}
export function getGuildRank(message) {
    var substring = message.substring(message.lastIndexOf("["), message.lastIndexOf("]"));
    if (!getGuildRank)
        substring = "[NOGUILDRANK]";
    return substring;
}
export function getUserName(message) {
    if (message.startsWith("Guild > ")) {
        message = removeExtras(message);
    }
    if (message.startsWith("  ")) {
        message = message.replace("  ", "");
    }
    var array = message.split(" ")[1];
    return array;
}