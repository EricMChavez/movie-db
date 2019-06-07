'use strict';
let key = 'b2897fea4763cb2036510a79230ce9a1';
$('document').ready(function() {
	let upcoming = $('.upcoming');
	let top = $('.top');
	function setUpcoming() {
		let results = jQuery.get(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
			function() {
				results = results.responseJSON.results;

				for (let x = 0; x < upcoming.length; x++) {
					let img = $('<img />')
						.attr({
							src: `https://image.tmdb.org/t/p/w500/${results[x].backdrop_path}`,
							title: `movie#${results[x].id}`,
							width: 250,
							onclick: `moviePage(${results[x].id})`
						})
						.appendTo(upcoming[x]);
				}

				$('.center').slick({
					centerMode: true,
					centerPadding: '60px',
					slidesToShow: 5,
					autoplay: true,
					pauseOnHover: false,
					autoplaySpeed: 2000,
					responsive: [
						{
							breakpoint: 1300,
							settings: {
								arrows: false,
								centerMode: true,
								centerPadding: '40px',
								slidesToShow: 4
							}
						},
						{
							breakpoint: 1000,
							settings: {
								arrows: false,
								centerMode: true,
								centerPadding: '40px',
								slidesToShow: 3
							}
						}
					]
				});
			}
		);
	}
	setUpcoming();
	let urlParams = new URLSearchParams(window.location.search);
	let personid = urlParams.get('personid');
	let personInfo = jQuery.get(
		`https://api.themoviedb.org/3/person/${personid}?api_key=${key}&append_to_response=credits`,
		function() {
			console.dir(personInfo);
			personInfo = personInfo.responseJSON;

			let img = $('<img />')
				.attr({
					src: `https://image.tmdb.org/t/p/w200/${personInfo.profile_path}`,
					width: 200
				})
				.appendTo($('#poster'));
			$('#name').append(personInfo.name);
			$('#biography').append(personInfo.biography);
			let credits = personInfo.credits.cast.sort(function(mov1, mov2) {
				return mov2.popularity - mov1.popularity;
			});

			for (let x = 0; x < 8; x++) {
				let credit = $('<img />').attr({
					src: `https://image.tmdb.org/t/p/w200/${credits[x].poster_path}`,
					width: 100,
					class: 'creditPoster',
					onclick: `moviePage(${credits[x].id})`
				});
				$('#credits').append(credit);
			}
		}
	);
});
function moviePage(movie) {
	window.location.href = `https://ericmchavez.github.io/movie-db/movie?movieid=${movie}`;
}
function personPage(person) {
	window.location.href = `https://ericmchavez.github.io/movie-db/people?personid=${person}`;
}
