/*In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
Recuperare la ricetta da https://dummyjson.com/recipes/{id}
Estrarre la proprietà userId dalla ricetta
Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
Restituire la data di nascita dello chef
Note del docente:
Scrivi la funzione getChefBirthday(id), che deve:
Essere asincrona (async).
Utilizzare await per chiamare le API.
Restituire una Promise con la data di nascita dello chef.
Gestire gli errori con try/catch*/

//funzione di supporto per il parse dei json
async function fetchData(url) {
  const res = await fetch(url);
  const obj = res.json();
  return obj;
}

const getChefBirthday = async (id) => {
  let recipe;
  try {
    recipe = await fetchData(`https://dummyjson.com/recipes/${id}`);
  } catch (err) {
    throw new Error(`la ricetta non torna`, err.message);
  }

  let chef;
  try {
    chef = await fetchData(`https://dummyjson.com/users/${recipe.userId}`);
  } catch (err) {
    throw new Error(`lo chef non compie gli anni`, err.message);
  }
  const compleanno = dayjs(chef.birthDate).format("DD/MM/YYYY");
  return compleanno;
};

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));

/*🎯 Bonus 1
Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.*/

/*🎯 Bonus 2
Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno/mese/anno.*/
