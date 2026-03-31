/* partie java Matthieu Vollot */
/* De même que pour les parties précédentes, je me suis servi de l'IA pour générer ce code,
la première partie est celle que vous nous avez donné sur brightspace et la seconde est réalisée à l'aide d'IA,
encore une fois, j'ai utilisé la même méthode en prenant le code ligne par ligne et en commentant chacune d'entre elles
pour me permettre de comprendre ce que faisait chaque partie du code, c'est comme cela que j'arrive à apprendre le plus sur de la programmation */
const myUrl = "https://makerslab.em-lyon.com/dww/data/products.json"; /* enregistre l'adresse web de la base de données dans la variable myURL */

const getData = async (doStuffs) => { /*  création d'une fonction asynchrone pour récupérer les données */
    try {
        const response = await fetch(myUrl); /* l'ordinateur patiente et va chercher les données de l'adresse */
        if (!response.ok) {
            throw new Error("Network response not ok :" + response.statusText); /* alerte d'erreur si la réponse n'est pas bonne */
        }
        const data = await response.json(); /* attente de la conversion en format lisible par javascript */
        doStuffs(data); /* envoie les données récupérées pour la suite du programme */
    } catch (error) {
        console.error("Problem occured while getting your data " + error); /* s'il y avait eu un crash, on aurait affiché ce problème */
    }
}

getData((data) => { /* récupération de la liste de chaussures */
    
    console.log(data); /*  affiche les données récupérées pour vérifier qu'elles sont toutes présentes*/

    const grille = document.querySelector(".grilleproduit"); /* on demande au java de chercher dans notre fichier html la balise qui a la classe "grilleproduit" */
    grille.innerHTML = ""; /* on vide cette grille pour repartir d'une page blanche */

    for (let marque in data.items) { /* boucle for qui permet de chercher chaque marque dans data.items */
        let listeChaussures = data.items[marque]; /* on stocke la liste de cette marque dans une variable listeChaussures */

        listeChaussures.forEach((chaussure) => { /* boucle for pour parcourir chaque chaussure de chaque liste */
            const carte = document.createElement("div"); /* création d'une balise div en mémoire */
            carte.classList.add("carteproduit"); /* on ajoute la classe "carteproduit" pour avoir le gris et les bords ronds */

            const image = document.createElement("img"); /* création de la balise img */
            image.src = chaussure.image; /* récupération du vrai lien de l'image dans la base de données */
            image.alt = chaussure.name; /* on lui donne son nom */
            image.classList.add("imagechaussure"); /* on lui ajoute sa classe CSS */

            const coeur = document.createElement("span"); /* même syntaxe que pour l'image */
            coeur.classList.add("coeur");
            coeur.innerHTML = "&#x2661;"; /* insertion du code HTML du coeur vide à l'intérieur */

            const infoDiv = document.createElement("div"); /* création de la div qui va permettre d'avoir les textes alignés */
            infoDiv.classList.add("info");

            const nomText = document.createElement("p"); /* création d'un paragraphe */
            nomText.classList.add("nom");
            nomText.textContent = chaussure.name; /* inscription du vrai nom de la chaussure dedans */

            const marqueText = document.createElement("p");
            marqueText.classList.add("marque");
            marqueText.innerHTML = chaussure.brand + "<br>" + chaussure.gender; /* on inscrit la marque puis on suate une ligne puis on met le genre */

            const prixText = document.createElement("p");
            prixText.classList.add("prix");
            prixText.textContent = chaussure.price + " €"; /* on écrit le prix et le symbole € */

            infoDiv.appendChild(nomText);
            infoDiv.appendChild(marqueText); /* on prend les textes et on les range dans la boite infoDiv */
            infoDiv.appendChild(prixText);

            carte.appendChild(image);
            carte.appendChild(coeur); /* on prend l'image, le coeur et infoDiv pour les mettre dans la carte globale */
            carte.appendChild(infoDiv);

            grille.appendChild(carte); /* on met la carte finaliser dans la grille du site */
        });
    }

});