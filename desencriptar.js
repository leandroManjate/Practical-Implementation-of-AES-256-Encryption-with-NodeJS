const crypto = require ("crypto");
const fs = require('fs');
require("dotenv");

const algorithm = "aes-256-cbc";

// é necessário usar o mesmo IV que foi usado na encriptação
const initVector = Buffer.from('631f6f387391f4d747b77e72ec2467ec','hex');

// e também a mesma chave, que foi exportada como variável de ambiente
// export SECRET_KEY=233c0824b443c98673d500028d079a018a5946890cb3f40349b55aa246870325
const environmentKey = process.env.SECRET_KEY;
const Securitykey = Buffer.from(environmentKey,'hex');

console.log("Chave secreta: ",Securitykey.toString('hex'))

try {
    // ler ficheiro com os dados encriptados
    const encryptedData = fs.readFileSync('msg_encriptada.bin','utf-8');

    console.log("\nMensagem encriptada: ",encryptedData.toString('hex)'));
    
    // definir o método de desencriptação
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    
    // desencriptação
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    // mostrar o resultado na consola
    console.log("\nMensagem desencriptada: ",decryptedData);
}
 catch (err) {
    console.error(err);
 }  