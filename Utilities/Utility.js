//accents à gérer lors du traitement des données
var accent_map = {
    'á':'a', 'é':'e', 'è':'e'
};
/**
 * Retire les accents d'une chaine de caractères donnée 
 * @param {string} s La chaine de caractères à traiter
 * @returns {string} La chaine de caractères sans accents 
 */
exports.RemoveAccents = function(s) {
    if (!s) { return ''; }
    var ret = '';
    for (var i = 0; i < s.length; i++) {
      ret += accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;
  };
/**
 * Permet de parser une chaine d'arguments, chacun suivant le modèle --{clé} {valeur}
 * @param {string} message La chaine des arguments à parser
 * @returns {Dictionnaire}  Dictionnaire clé/valeur des arguments d'entrée
 */
exports.ParseArgs =function(message){
    //retourne un objet vide si aucun argument n'est spécifié
    if(message==="") return {};
    //sépare chaque couple clé/valeur d'argument
    let args = message.trim().slice(2).split('--');
    //retire les espaces superflus (ce qui fait que "--clé1 valeur1 --clé2 valeur2" aura le même fonctionnement que "--clé1 valeur1   --clé2 valeur2")
    args.forEach(element => {
        element.trim();
    });
    let dict = {};
    //pour chaque couple clé/valeur, les sépare au niveau de un ou plusieurs espaces (plus ergonomique sur mobile)
    //ainsi "--clé1 valeur1" aura le même fonctionnement que "--clé1  valeur1"
    args.map(item =>{ 
        let [k,v] = item.split(/ (.+)/); 
        if(v) v = v.replace(/\s\s+/g, ' ');
        console.log("k:"+k+",v:"+v);
        dict[k] = v;})
    return dict;
}