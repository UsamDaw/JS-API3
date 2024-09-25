
const apiUrl = "https://hp-api.onrender.com/api/characters";


const searchBox = document.getElementById('searchBox');
const characterList = document.getElementById('characterList');


const defaultImage = 'https://via.placeholder.com/150?text=No+Image'; 


const characterLimit = 50; 


async function fetchCharacters() {
    try {
        const response = await fetch(apiUrl);
        const characters = await response.json();
        displayCharacters(characters.slice(0, characterLimit)); 
    } catch (error) {
        console.error("Klarte ikke å hente karakterer:", error);
    }
}


function displayCharacters(characters) {
    characterList.innerHTML = ''; 

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('character-card');


        const img = document.createElement('img');
        img.src = character.image ? character.image : defaultImage; 
        img.onerror = function() {
            this.src = defaultImage; 
        };
        card.appendChild(img);


        const info = document.createElement('div');
        info.classList.add('character-info');
        info.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Hus:</strong> ${character.house || 'Ukjent'}</p>
            <p><strong>Blodstatus:</strong> ${character.ancestry || 'Ukjent'}</p>
            <p><strong>Patronus:</strong> ${character.patronus || 'Ukjent'}</p>
            <p><strong>Fødselsår:</strong> ${character.yearOfBirth || 'Ukjent'}</p>
            <p><strong>Skuespiller:</strong> ${character.actor || 'Ukjent'}</p>
        `;
        card.appendChild(info);

        characterList.appendChild(card);
    });
}

searchBox.addEventListener('input', function() {
    const query = searchBox.value.toLowerCase();
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
});


fetchCharacters();