async function singledata() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const response = await fetch('./data.json');
    const countries = await response.json();

    const country = countries.find(count => count.alpha2Code === code);
    const currencyNames = country.currencies.map(currency => currency.name);
    const languageNames = country.languages.map(language => language.name);
    const borderCountryNames = country.borders? country.borders.map(borderCode => {
            const borderCountry = countries.find(c => c.alpha3Code === borderCode);
            return  borderCountry.name;
        })
        .filter(name => name):[];

const bordernamebox =borderCountryNames.map(name => `<span class="border-btn">${name}</span>`).join('');
    document.getElementById('countrydetail').innerHTML = `
    <div class="flag-container">
            <img src="${country.flags.png}" alt="${country.name}" width="100">
        </div>

        <div class="info-container">
            <h2 id="country-name">${country.name}</h2>
            <div class="info-columns">
                <div class="left-column">
                    <p><strong>Native Name:</strong>${country.nativename}</p>
                    <p><strong>Population:</strong> ${country.population}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Sub Region:</strong> ${country.subregion}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                </div>
                <div class="right-column">
                    <p><strong>Top Level Domain:</strong>${country.topLevelDomain}</p>
                    
                    <p><strong>Currencies:</strong>${currencyNames.join(', ')}</p>
                    <p><strong>Languages:</strong> ${languageNames.join(', ')}</p>
                </div>
            </div>

            <div class="border-countries">
                <strong>Border Countries:</strong>
                ${bordernamebox}
            </div>
        </div>

        
    `;
}

singledata();

function togglebtn() {
    document.body.classList.toggle('dark-mode');
  }