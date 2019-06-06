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
	console.log(urlParams);
});
