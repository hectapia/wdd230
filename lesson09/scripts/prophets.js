async function getProphetData() {
    const response = await fetch('https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json');
    const data = await response.json();
    console.table(data.prophets);  // note that we reference the prophet array of the data object given the structure of the json file
    displayProphets(data.prophets)
  }
  
  getProphetData();

  const displayProphets = (prophets) => {
    const cards = document.querySelector('div.cards'); // select the output container element
  
    prophets.forEach((prophet) => {
      // Create elements to add to the div.cards element
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let portrait = document.createElement('img');
      let p0 = document.createElement('p');
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
  
      // Build the h2 content out to show the prophet's full name - finish the template string
      h2.textContent = `${prophet.name} ${prophet.lastname}`;

      // Build the p prophet number
      if (prophet.order == 1) {
        p0.textContent = `${prophet.order}st Latter-day President`; 
      };

      if (prophet.order == 2) {
        p0.textContent = `${prophet.order}nd Latter-day President`; 
      };

      if (prophet.order == 3) {
        p0.textContent = `${prophet.order}rd Latter-day President`; 
      };

      if (prophet.order > 3) {
        p0.textContent = `${prophet.order}th Latter-day President`;
      };

      // Build the image portrait by setting all the relevant attribute
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');

      // Build the p birth date
      p1.textContent = `Date of Birth: ${prophet.birthdate}`;
      

      // Build the p birth place
      p2.textContent = `Place of birth: ${prophet.birthplace}`;
      
  
      // Append the section(card) with the created elements
      card.appendChild(h2);
      card.appendChild(p0);
      card.appendChild(portrait);
      card.appendChild(p1);
      card.appendChild(p2);
  
      cards.appendChild(card);
    }) // end of forEach loop
  } // end of function expression