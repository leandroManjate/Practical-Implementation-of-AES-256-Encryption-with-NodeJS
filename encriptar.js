const crypto = require ("crypto");
const fs = require('fs');
require("dotenv");

const algorithm = "aes-256-cbc";
// este IV de 128 bit foi gerado através do openssl, assim: openssl rand -hex 16
const initVector = Buffer.from('631f6f387391f4d747b77e72ec2467ec','hex');

// a chave de 256 bit foi gerada através do openssl, assim: openssl rand -hex 32
// e depois exportada como variável de ambiente, desta forma:
// export SECRET_KEY=233c0824b443c98673d500028d079a018a5946890cb3f40349b55aa246870325
const environmentKey = process.env.SECRET_KEY;
const Securitykey = Buffer.from(environmentKey,'hex');

console.log("\nChave secreta importada da variável de ambiente: ",Securitykey.toString('hex'))

try {
    // abrir o ficheiro para encriptar
    const data = fs.readFileSync('msg_original.txt');

    // definir o método de encriptação
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    
    // encriptyr os dados
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    console.log("\ncifra: ",encryptedData);
    
    // E finalmente escrever os dados encriptados no ficheiro
    fs.writeFileSync('msg_encriptada.bin', encryptedData);
}
 catch (err) {
    console.error(err);
 }  