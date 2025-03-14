async function showCountries() {
    const response = await fetch('data.json');
    const allcountries = await response.json();
    const str = document.getElementById('content');
    allcountries.forEach(country => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a href="./single.html?code=${country.alpha2Code}">
         <div class="card" id="card">
         <div class="img">
             <img src="${country.flags.png}" alt="Flag of ${country.name}" width="100"></div>
            <hr>
            <div class="country">
            <h3>${country.name}</h3></div>
             <p><strong>Population:</strong> ${country.population}</p>
             <p><strong>Region:</strong>${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
           
             </div></a>
        `;
        str.appendChild(div);
    });
}

showCountries();

async function dropdowns() {
    const res = await fetch('data.json');
    const countryData = await res.json();

    const dropdown = document.getElementById('drop');

   dropdown.innerHTML = `
            <option value="">Filter by Region</option>
            ${countryData.map(country => `<option value="${country.region}">${country.region}</option>`).join('')}`;
    };
dropdowns();

function filteredCountries(countries) {
    const content = document.getElementById('content');
    content.innerHTML = '';  
    countries.forEach(country => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a href="./single.html?code=${country.alpha2Code}">
                <div class="card" id="card">
                    <div class="img">
                        <img src="${country.flags.png}" alt="Flag of ${country.name}" width="100">
                    </div>
                    <hr>
                    <div class="country">
                        <h3>${country.name}</h3>
                    </div>
                    <p><strong>Population:</strong> ${country.population}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                </div>
            </a>
        `;
        content.appendChild(div);
    });
}

async function applyFilters() {
    const search = document.getElementById('searchbar').value.toLowerCase();
    const filter = document.getElementById('drop').value;  
    const res = await fetch('data.json');
    const allcountries = await res.json();
    const newcountries = allcountries.filter(country => {
        const searchmatch = country.name.toLowerCase().includes(search);
        const filtermatch = filter === "" || country.region === filter; 
        return searchmatch && filtermatch;  
    });

    filteredCountries(newcountries);
}
document.getElementById('searchbar').addEventListener('input', applyFilters);
document.getElementById('drop').addEventListener('change', applyFilters);

function togglebtn() {
    document.body.classList.toggle('dark-mode');
  }