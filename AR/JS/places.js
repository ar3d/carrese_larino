window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line:
    method = 'static';
    if (method === 'static') {
        let places = staticLoadPlaces();
        return renderPlaces(places);
    }

    if (method !== 'static') {
        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [
        {
            name: "L'anfiteatro e la cristianizzazione della <i>Larinum</i> romana",
            location: {
                lat: 41.805512, // change here latitude if using static data
                lng: 14.916265, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/anfiteatro_g.html",
			sfondo: "assets/sfondi/anfiteatro_G.jpg",
			text: "La tradizione popolare lega il martirio di Primiano, Firmiano e Casto a questo luogo che rappresenta la testimonianza più significativa del <i>municipium</i> romano di Larino."
        },
		{
            name: "Dalla basilica di Sant'Angelo a Palazzo alla cappella della Vergine delle Grazie",
            location: {
                lat: 41.804202, // change here latitude if using static data
                lng: 14.922016, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/beata_vergine_g.html",
			sfondo: "assets/sfondi/beata_vergine_G.jpg",
			text: "La cappella dedicata alla Vergine delle Grazie fu edificata probabilmente sulla basilica dedicata all'arcangelo Michele a cui i longobardi affiancarono la residenza ufficiale dei conti di Larino, prendendo da quel momento il nome di Sant'Angelo a Palazzo."
        },
		{
            name: "Il simbolo del potere religioso: l'Episcopio",
            location: {
                lat: 41.800888, // change here latitude if using static data
                lng: 14.910441, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/episcopio_g.html",
			sfondo: "assets/sfondi/episcopio_G.jpg",
			text: "Costruito alla fine del '500 in sostituzione di un più antico Vescovado, le cui tracce si intravedono in una casa di vico Giglio, oggi conserva nelle sue sale la memoria della religiosità larinese che affonda le sue radici nel culto di San Pardo."
        },
		{
            name: "La Cattedrale di Santa Maria Assunta e San Pardo",
            location: {
                lat: 41.801088, // change here latitude if using static data
                lng: 14.910280, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/facciata_cattedrale_g.html",
			sfondo: "assets/sfondi/cattedrale_G.jpg",
			text: "La chiesa non è solo uno scrigno di arte e storia, ma anche il luogo fisico dove si rinnova il legame tra i larinesi e il loro Patrono."
        },
		{
            name: "La fontana di San Pardo e l'arrivo delle reliquie del nuovo Patrono",
            location: {
                lat: 41.796791, // change here latitude if using static data
                lng: 14.917749, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/fonte_san_pardo_g.html",
			sfondo: "assets/sfondi/fonte_G.jpg",
			text: "La tradizione popolare lega strettamente questa fontana all'arrivo del corpo intatto di San Pardo a Larino nell'842."
        },
		{
            name: "Il simbolo del potere civile: Palazzo ducale",
            location: {
                lat: 41.800328, // change here latitude if using static data
                lng: 14.910854, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/palazzo_ducale_g.html",
			sfondo: "assets/sfondi/palazzo_ducale_G.jpg",
			text: "Costruito dai Normanni come struttura difensiva, oggi si presenta come un palazzo signorile. Dumas nel romanzo “La Sanfelice” racconta della congiura ai danni del duca Francesco Carafa e dei successivi fatti di sangue ai quali la carrese di San Pardo fa da sfondo."
        }
		{
            name: "San Primiano e la Carrese di San Pardo",
            location: {
                lat: 41.804319, // change here latitude if using static data
                lng: 14.927629, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/san_primiano_g.html",
			sfondo: "assets/sfondi/san_primiano_ricamo_G.jpg",
			text: "La sera del 25 maggio cominciano i festeggiamenti in onore di San Pardo con il prelievo della statua del copatrono Primiano dalla cappella al centro del cimitero."
        }
		{
            name: "Santa Maria della Pietà e la Laudata di San Pardo",
            location: {
                lat: 41.798857, // change here latitude if using static data
                lng: 14.911741, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/santa_maria_del_piano_g.html",
			sfondo: "assets/sfondi/cs_maria_p_G.jpg",
			text: "“Ecco, Madonna mia, mo me presento, ti vengo oggi a laudà co suon’e canto.” Così i carrieri iniziavano il canto della Laudata davanti alla chiesa di Santa Maria, legata al culto di san Pardo per il fatto che qui la tradizione vuole sia stato deposto quando arrivò a Larino."
        }
		{
            name: "Verso la chiesa di Santa Maria della Pietà",
            location: {
                lat: 41.799886, // change here latitude if using static data
                lng: 14.911311, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/santo_stefano_g.html",
			sfondo: "assets/sfondi/s_stefano_G.jpg",
			text: "Siamo all'angolo di quella che oggi è piazza Vittorio Emanuele e che un tempo era lo stazio non edificato antistante il castello. Qui carri, uomini e buoi si radunano nei tre giorni per festeggiare e ringraziare il loro patrono."
        }
		{
            name: "Il primo Seminario dell'Occidente",
            location: {
                lat: 41.801381, // change here latitude if using static data
                lng: 14.910628, // change here longitude if using static data
            },
			look: "[gps-camera]",
			image: "assets/map-marker.png",
			href: "../start_page/seminario_g.html",
			sfondo: "assets/sfondi/seminario_G.jpg",
			text: "Siamo nella parte più antica della Larino medievale, e il passaggio sotto l'arco dell'antico Seminario, il primo inaugurato dopo il Concilio di Trento, è uno dei punti che mette maggiormente alla prova il rapporto tra carrieri e animali."
        }
    ];
}

// getting places from REST APIs
function dynamicLoadPlaces(position) {
    let params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',
        clientSecret: '',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    // NOTE this no longer works - please replace with your own proxy
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        // add place name
        let icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        icon.setAttribute('look-at', place.look);
		icon.setAttribute('name', place.name);
        icon.setAttribute('src', place.image);
        icon.setAttribute('scale', '5 5 5');
		icon.setAttribute('href', place.href);
		icon.setAttribute('sfondo', place.sfondo);
		icon.setAttribute('text', place.text);
		

        
        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));


// this click listener has to be added simply to a click event on an a-entity element
const clickListener = function (ev) {
    ev.stopPropagation();
    ev.preventDefault();

    const name = ev.target.getAttribute('name');
	const link = ev.target.getAttribute('href');
	const testo = ev.target.getAttribute('text');
	const sfondo = ev.target.getAttribute('sfondo');
    const el = ev.detail.intersection && ev.detail.intersection.object.el;
	
    if (el && el === ev.target) {
        // after click, we are adding a label with the name of the place
		const label = document.createElement('span');
        const container = document.createElement('div');
		container.setAttribute('id', 'place-label');
		label.innerHTML = '<a href="'+link+'" target="_blank" class="animated-button1" style="background-image:url('+sfondo+')"><span></span><span></span><span></span><span></span><p class="p1">'+name+'</p><br><p class="p2">'+testo+'</p></a>';
		container.appendChild(label);
		document.body.appendChild(container);
        
		

        setTimeout(() => {
            // that will disappear after less than 6 seconds
            container.parentElement.removeChild(container);
        }, 6000);
     }
 };
icon.addEventListener('click', clickListener);
        scene.appendChild(icon);
    });
}
