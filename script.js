document
  .getElementById("formulaireInscription")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formulaireEstValide = true;

    // Validation du pseudo
    var pseudo = document.getElementById("pseudo");
    var erreurPseudo = document.getElementById("erreurPseudo");
    if (pseudo.value.trim() === "") {
      erreurPseudo.style.display = "block";
      pseudo.classList.add("invalid");
      formulaireEstValide = false;
    } else {
      erreurPseudo.style.display = "none";
      pseudo.classList.remove("invalid");
      pseudo.classList.add("valid");
    }

    // Validation de l'email
    var email = document.getElementById("email");
    var erreurEmail = document.getElementById("erreurEmail");
    var erreurEmailExiste = document.getElementById("erreurEmailExiste");
    var utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    if (!email.validity.valid) {
      erreurEmail.style.display = "block";
      email.classList.add("invalid");
      formulaireEstValide = false;
    } else if (
      utilisateurs.some((utilisateur) => utilisateur.email === email.value)
    ) {
      erreurEmailExiste.style.display = "block";
      email.classList.add("invalid");
      formulaireEstValide = false;
    } else {
      erreurEmail.style.display = "none";
      erreurEmailExiste.style.display = "none";
      email.classList.remove("invalid");
      email.classList.add("valid");
    }

    // Validation de la confirmation du mot de passe
    var motDePasse = document.getElementById("motDePasse");
    var confirmerMotDePasse = document.getElementById("confirmerMotDePasse");
    var erreurMotDePasse = document.getElementById("erreurMotDePasse");
    if (motDePasse.value !== confirmerMotDePasse.value) {
      erreurMotDePasse.style.display = "block";
      motDePasse.classList.add("invalid");
      confirmerMotDePasse.classList.add("invalid");
      formulaireEstValide = false;
    } else {
      erreurMotDePasse.style.display = "none";
      motDePasse.classList.remove("invalid");
      confirmerMotDePasse.classList.remove("invalid");
      motDePasse.classList.add("valid");
      confirmerMotDePasse.classList.add("valid");
    }

    // Validation de la sélection du profil
    var profil = document.getElementById("profil");
    var erreurProfil = document.getElementById("erreurProfil");
    if (profil.value === "") {
      erreurProfil.style.display = "block";
      profil.classList.add("invalid");
      formulaireEstValide = false;
    } else {
      erreurProfil.style.display = "none";
      profil.classList.remove("invalid");
      profil.classList.add("valid");
    }

    // Validation de l'acceptation des conditions
    var conditions = document.getElementById("conditions");
    var erreurConditions = document.getElementById("erreurConditions");
    if (!conditions.checked) {
      erreurConditions.style.display = "block";
      conditions.classList.add("invalid");
      formulaireEstValide = false;
    } else {
      erreurConditions.style.display = "none";
      conditions.classList.remove("invalid");
      conditions.classList.add("valid");
    }

    // Soumettre le formulaire si valide
    if (formulaireEstValide) {
      var nouvelUtilisateur = {
        pseudo: pseudo.value,
        email: email.value,
        profil: profil.value,
        langageWeb: document.querySelector('input[name="langageWeb"]:checked')
          .value,
      };

      utilisateurs.push(nouvelUtilisateur);
      localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
      alert("Inscription réussie !");
      this.reset();
    }
  });

// Validation en temps réel de l'email
document.getElementById("email").addEventListener("input", function () {
  var email = document.getElementById("email");
  var erreurEmail = document.getElementById("erreurEmail");
  var erreurEmailExiste = document.getElementById("erreurEmailExiste");
  var utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
  if (
    email.validity.valid &&
    !utilisateurs.some((utilisateur) => utilisateur.email === email.value)
  ) {
    erreurEmail.style.display = "none";
    erreurEmailExiste.style.display = "none";
    email.classList.remove("invalid");
    email.classList.add("valid");
  } else {
    erreurEmail.style.display = email.validity.valid ? "none" : "block";
    erreurEmailExiste.style.display = utilisateurs.some(
      (utilisateur) => utilisateur.email === email.value
    )
      ? "block"
      : "none";
    email.classList.remove("valid");
    email.classList.add("invalid");
  }
});

// Vérifie si tous les champs sont remplis et valides
function verifierValiditeFormulaire() {
  var pseudo = document.getElementById("pseudo");
  var email = document.getElementById("email");
  var motDePasse = document.getElementById("motDePasse");
  var confirmerMotDePasse = document.getElementById("confirmerMotDePasse");
  var profil = document.getElementById("profil");
  var conditions = document.getElementById("conditions");
  var boutonSoumettre = document.getElementById("boutonSoumettre");

  if (
    pseudo.value.trim() !== "" &&
    email.validity.valid &&
    motDePasse.value === confirmerMotDePasse.value &&
    profil.value !== "" &&
    conditions.checked
  ) {
    boutonSoumettre.disabled = false;
    boutonSoumettre.classList.add("enabled");
  } else {
    boutonSoumettre.disabled = true;
    boutonSoumettre.classList.remove("enabled");
  }
}

// Ajoute des écouteurs d'événements pour la validation en temps réel du formulaire
document
  .querySelectorAll(
    "#formulaireInscription input, #formulaireInscription select"
  )
  .forEach(function (element) {
    element.addEventListener("input", verifierValiditeFormulaire);
  });
document
  .getElementById("conditions")
  .addEventListener("change", verifierValiditeFormulaire);

// Vérifie initialement si le formulaire est pré-rempli
verifierValiditeFormulaire();
