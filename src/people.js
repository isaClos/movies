const ac = $( function() {

    let $searchFormAc = $('#searchFormAc');
    let $inputSearchAc = $('#inputSearchAc');
    let $ulListAc = $('#ulListAc');
    let $detListAc = $('#detListAc');

    $searchFormAc.on('submit',function( event ) {
        event.preventDefault();
        let choiceAc = $inputSearchAc.val();

        $.get( `https://api.themoviedb.org/3/search/person?api_key=4c991eb23e1a25fd8b93f5dc9b577440&query=${choiceAc}`, function( response ) {
            $ulListAc.html(' ');
            $detListAc.html( ' ');

            // Pour chaque données de notre tableau de response (ici response est un tableau d'objet en json, décodé par jQuery)
            for ( const singleData of response.results ) {

                console.log(singleData);
                // On initialise nos variables
                let tpl1,
                    profile,
                    popularity,
                    id,
                    addr1,
                    name,
                    departement;


                // On récupère les données et on fait les templates  avec
                profile=singleData.profile_path;
                addr1 = `https://image.tmdb.org/t/p/w500${profile}`;
                id = singleData.id;
                name = singleData.name;
                popularity = singleData.popularity;
                departement = singleData.known_for_department;

                tpl1 = `
                                <h3>${name}</h3>
                                 <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                <li><span class="titlistdet"> Sa popularité :</span> ${popularity}</li>
                                                <li><span class="titlistdet">Connu pour :</span> ${departement}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr1}" alt=""/>
                                         </div>
                            ` ;

                // On crée l'élément li
                let $li = $( '<li />', {
                    html: tpl1
                } );

                // On l'ajoute à notre liste
                $ulListAc.append( $li );

                let title,
                    tpl12,
                    vote,
                    poster,
                    overview,
                    addr,
                    mediaType,
                    releaseDate;

               for ( i=0; i<known_for.left; i++) {

                    // On récupère les données et on fait les templates  avec
                    title = singleData.known_for[i].title;

                    tpl12 = `
                                        
                                        <h3>${title}</h3>
                                         <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                <li><span class="titlistdet">Type : </span>  ${mediaType}</li>
                                                <li><span class="titlistdet">Résumé : </span>  ${overview}</li>
                                                <li><span class="titlistdet"> Réalisé en :</span> ${releaseDate}</li>
                                                <li><span class="titlistdet">La moyenne des votes obtenus est de :</span> ${vote}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr}" alt=""/>
                                         </div>
                                `;

                    // on créer l'élément détail
                    let $det = $('<p />', {
                        html: tpl12
                    });
                    // on ajoute au paragraphe details
                    $detListAc.append( $det );
                }
            }
        });
    });

});

export default ac;