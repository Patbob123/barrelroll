
// let cors = require("cors");
// import fetch from "node-fetch";
// const res = await fetch("https://vm.tiktok.com/ZMFsSTsrq/");
// console.log(res.headers)
// import fs from "fs"

async function getinfo(){
let fetchinput = {
    method: "GET",
    mode: "cors",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        'Authorization': 'nXcAteBe4FTBHSVWOvuVAgfMWz2FddN0V4BcaAZ2EOXsKUfVKBuubkoUE83jihfX',
    }
}

return (await fetch(`https://ifksig3rb36xlwi5qhpmvqcwg40zpyir.lambda-url.ca-central-1.on.aws/`, fetchinput)).json()
}

console.log(getinfo())


// fs.writeFile('rfmData.json', JSON.stringify(await getinfo()), (error) => {
//     if (error) {
//         throw error;
//     }
// });