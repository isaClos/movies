const tv = $( function() {

    let $searchFormT = $('#searchFormT');
    let $inputSearchT = $('#inputSearchT');
    let $ulListT = $('#ulListT');
    let $detListT = $('#detListT');

    $searchFormT.on('submit',function( event ) {
        event.preventDefault();
        let choiceT = $inputSearchT.val();

        $.get( `https://api.themoviedb.org/3/search/tv?api_key=4c991eb23e1a25fd8b93f5dc9b577440&query=${choiceT}`, function( response ) {
            $ulListT.html(' ');
            $detListT.html( ' ');

            // Pour chaque données de notre tableau de response (ici response est un tableau d'objet en json, décodé par jQuery)
            for ( const singleData of response.results ) {

                // On initialise nos variables
                let title,
                    tpl1,
                    tpl12,
                    tpl22,
                    vote,
                    id,
                    poster,
                    overview,
                    addr,
                    popularity,
                    votecount,
                    releaseDate;
                // On récupère les données et on fait les templates  avec
                title = singleData.name;
                votecount = singleData.vote_count;
                vote = singleData.vote_average;
                popularity = singleData.popularity;
                id = singleData.id;
                poster = singleData.poster_path;
                addr = `https://image.tmdb.org/t/p/w500${poster}`;
                overview = singleData.overview;
                releaseDate = singleData.first_air_date;


                tpl1 = `
                                <a href="#detListT">${title}</a>
                            `;


                tpl12 = `
                                        <h3>${title}</h3>
                                        
                                         <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                
                                                <li><span class="titlistdet">Résumé : </span>  ${overview}</li>
                                                <li><span class="titlistdet"> Réalisé en :</span> ${releaseDate}</li>
                                                <li><span class="titlistdet">Le nombre de votes est de :</span> ${votecount}</li>
                                                <li><span class="titlistdet">La moyenne des votes obtenus est de :</span> ${vote}</li>
                                                <li><span class="titlistdet">La popularité est de :</span> ${popularity}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr}" alt=""/>
                                         </div>
                                `;

                // On crée l'élément li
                let $li = $('<li />', {
                    html: tpl1
                });
                // On l'ajoute à notre liste
                $ulListT.append($li);


                // on créer l'élément détail
                let $det = $('<p />', {
                    html: tpl12
                });
                // on ajoute au paragraphe details
                $detListT.append($det);
            }
        });
    });

});

export default tv;