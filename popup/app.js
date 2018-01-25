const send = document.querySelector('#send');

send.addEventListener('click', () => {
    const find = document.querySelector('#txtFind').value;
    const response = document.querySelector('#response');
    const error = document.querySelector('#error');

    response.innerHTML = '';
    error.innerHTML = '';

    fetch(`https://bleutrade.com/api/v2/public/getmarketsummary?market=${find.toUpperCase()}_BTC`)
        .then(res => res.json())
        .then(json => {
            if (json.success == 'false' || find == '') {
                error.innerHTML = '<p>Erro</p>';
                return;
            }

            const { MarketName, PrevDay, Last, Volume, Average } = json.result[0];

            const balance = (1 - (PrevDay / Last)) * 100;

            response.innerHTML = `
                <hr>
                <p>
                    <strong>Par:</strong> ${MarketName}<br>
                    <strong>24h:</strong> ${balance.toFixed(2)}%<br>
                    <strong>Último:</strong> ${Last}<br>
                    <strong>Média:</strong> ${Average}<br>
                    <strong>Volume:</strong> ${parseFloat(Volume).toFixed(2)}
                </p>
            `;
        })
        .catch(err => console.log(err));
});