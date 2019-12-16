import 'bootstrap';
import './style.scss';
import './film.js';
import './tv.js';
import './people.js';

// l'utilisateur peut faire une recherche sur un titre par exemple
// on récupère la valeur de la barre de submit
// on va  chercher  dans la librairie de movies
// à chaque fois qu'un titre comporte la valeur de Search
// on ajout à notre page un élément de liste avec
// titre / image / roles principaux
$( function() {
    let $searchForm = $('#searchForm');
    let $inputSearch = $('#inputSearch');
    let $ulList = $('#ulList');
    let $detList = $('#detList');

    $searchForm.on('submit',function( event ) {
        event.preventDefault();
        let choice = $inputSearch.val();

        $.get( `https://api.themoviedb.org/3/search/multi?api_key=4c991eb23e1a25fd8b93f5dc9b577440&query=${choice}`, function( response ) {
            $ulList.html(' ');
            $detList.html( ' ');

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
                    name,
                    popularity,
                    releaseDate1,
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
                        name = singleData.name;
                        releaseDate1 = singleData.first_air_date;
                        popularity = singleData.popularity;

                        tpl1 = `
                                <a href="#detList">${title}</a>
                            ` ;

                        tpl2 = `
                                <a href="#detList">${name}</a>
                                    ` ;


                        tpl12 = `
                                        <h3>${title}</h3>
                                         <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                <li><span class="titlistdet">Type : </span>  ${mediaType}</li>
                                                <li><span class="titlistdet">Résumé : </span>  ${overview}</li>
                                                <li><span class="titlistdet"> Réalisé en :</span> ${releaseDate}</li>
                                                <li><span class="titlistdet">Le nombre de votes est de :</span> ${votecount}</li>
                                                <li><span class="titlistdet">La moyenne des votes obtenus est de :</span> ${vote}</li>
                                                <li><span class="titlistdet">La popularité est de :</span> ${popularity}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr}" alt=""/>
                                         </div>
                                `;
                        tpl22 = `
                                        <h3>${name}</h3>
                                         <div class="row">
                                            <ul class="col-sm-12 col-md-6 listdet">
                                                <li><span class="titlistdet">Type : </span>  ${mediaType}</li>
                                                <li><span class="titlistdet">Résumé : </span>  ${overview}</li>
                                                <li><span class="titlistdet"> Réalisé en :</span> ${releaseDate1}</li>
                                                <li><span class="titlistdet">Le nombre de votes est de :</span> ${votecount}</li>
                                                <li><span class="titlistdet">La moyenne des votes obtenus est de :</span> ${vote}</li>
                                                <li><span class="titlistdet">La popularité est de :</span> ${popularity}</li>
                                            </ul>
                                            <img class="col-sm-12 col-md-3 offset-md-2 img-fluid img1 " src="${addr}" alt=""/>
                                         </div>
                                `;
                        if (mediaType==='movie'){
                            // On crée l'élément li
                            let $li = $( '<li />', {
                                html: tpl1
                            } );

                            // On l'ajoute à notre liste
                            $ulList.append( $li );

                            // on créer l'élément détail
                            let $det = $('<p />', {
                                html: tpl12
                            });
                            // on ajoute au paragraphe details
                                $detList.append( $det );
                        } else {
                            // On crée l'élément li
                            let $li = $( '<li />', {
                                html: tpl2
                            } );

                            // On l'ajoute à notre liste
                            $ulList.append( $li );

                            // on créer l'élément détail
                            let $det = $('<p />', {
                                html: tpl22
                            });
                            // on ajoute au paragraphe details
                            $detList.append( $det );
                        }
            }
        });
    });


});
