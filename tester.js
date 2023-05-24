
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
return new Promise((resolve, reject) => {
    fetch(`https://ifksig3rb36xlwi5qhpmvqcwg40zpyir.lambda-url.ca-central-1.on.aws/`, fetchinput).then(res => {
    //     fetch(`http://localhost:160${api}`, fetchinput).then(res => {
        console.log(res)
        // status = res.status;
        return res.json();
    }
    ).then(res => {
        // if (status >= 400 && status <= 600) {
            console.log(res)

        // }
    }).catch(err => {
        console.log(err)
        reject(" Error: " + err);
    });

})

}
getinfo()
// console.log(getinfo())


// fs.writeFile('rfmData.json', JSON.stringify(await getinfo()), (error) => {
//     if (error) {
//         throw error;
//     }
// });