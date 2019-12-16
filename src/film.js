const film = $( function() {

    let $searchFormF = $('#searchFormF');
    let $inputSearchF = $('#inputSearchF');
    let $ulListF = $('#ulListF');
    let $detListF = $('#detListF');

    $searchFormF.on('submit',function( event ) {
        event.preventDefault();
        let choiceF = $inputSearchF.val();

        $.get( `https://api.themoviedb.org/3/search/movie?api_key=4c991eb23e1a25fd8b93f5dc9b577440&query=${choiceF}`, function( response ) {
            $ulListF.html(' ');
            $detListF.html( ' ');

            // Pour chaque données de notre tableau de response (ici response est un tableau d'objet en json, décodé par jQuery)
            for ( const singleData of response.results ) {
                console.log(singleData);
                // On initialise nos variables
                let title,
                    tpl1,
                    tpl12,
                    tpl2,
                    tpl22,
                    vote,
                    votecount,
                    id,
                    poster,
                    overview,
                    addr,
                    mediaType,
                    popularity,
                    releaseDate;
                // On récupère les données et on fait les templates  avec
                title = singleData.title ;
                vote = singleData.vote_average;
                votecount = singleData.vote_count;
                id = singleData.id;
                poster = singleData.poster_path;
                addr = `https://image.tmdb.org/t/p/w500${poster}`;
                overview = singleData.overview;
                releaseDate = singleData.release_date;
                mediaType = singleData.media_type;
                popularity = singleData.popularity;



                tpl1 = `
                                <a href="#detListF">${title}</a>
                            ` ;


                tpl12 = `
                                        <h3>${title}</h3>
                                         <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                
                                                <li><span class="titlistdet">Résumé : </span>  ${overview}</li>
                                                <li><span class="titlistdet"> Réalisé en :</span> ${releaseDate}</li>
                                                <li><span class="titlistdet">Le nombre de vote est de : </span>  ${votecount}</li>
                                                <li><span class="titlistdet">La moyenne des votes obtenus est de :</span> ${vote}</li>
                                                <li><span class="titlistdet">La popularité est de :</span> ${popularity}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr}" alt=""/>
                                         </div>
                                `;
                // On crée l'élément li
                let $li = $( '<li />', {
                    html: tpl1
                } );

                // On l'ajoute à notre liste
                $ulListF.append( $li );

                // on créer l'élément détail
                let $det = $('<p />', {
                    html: tpl12
                });
                // on ajoute au paragraphe details
                $detListF.append( $det );
            }
        });
    });

});

export default film;