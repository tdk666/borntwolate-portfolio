const fetch = require('node-fetch');

async function checkCode() {
    try {
        const res = await fetch('http://localhost:8888/.netlify/functions/legacy-api', {
            method: 'POST',
            body: JSON.stringify({ code: 'TEST-2025', check_only: true })
        });
        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Data:", data);
    } catch(e) {
        console.error(e);
    }
}
checkCode();
