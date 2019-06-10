'use strict';
let key = 'b2897fea4763cb2036510a79230ce9a1';
$('document').ready(function() {
	let upcoming = $('.upcoming');
	let top = $('.top');
	let cast = $('.cast');
	function setUpcoming() {
		let results = jQuery.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`, function() {
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
				let actor = jQuery.get(
					`https://api.themoviedb.org/3/movie/${results[x].id}/credits?api_key=${key}`,
					function() {
						actor = actor.responseJSON.cast[0];
						let castImg = $('<img />')
							.attr({
								src: `https://image.tmdb.org/t/p/w500/${actor.profile_path}`,
								title: `person#${actor.id}`,
								width: 150,
								onclick: `personPage(${actor.id})`
							})
							.appendTo(cast[x]);
						if (x == 9) {
							$('.upCast').slick({
								centerMode: true,
								centerPadding: '60px',
								slidesToShow: 5,
								draggable: false,
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
							$('.center').slick({
								centerMode: true,
								draggable: false,
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
					}
				);
			}
		});
	}
	setUpcoming();
	function setTop() {
		let results = jQuery.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
			function() {
				results = results.responseJSON.results;
				for (let x = 0; x < top.length; x++) {
					let img = $('<img />')
						.attr({
							src: `https://image.tmdb.org/t/p/w500/${results[x].poster_path}`,
							title: `movie#${results[x].id}`,
							width: '100%',
							onclick: `moviePage(${results[x].id})`
						})
						.appendTo(top[x]);
				}
			}
		);
	}
	setTop();
});
function moviePage(movie) {
	window.location.href = `https://ericmchavez.github.io/movie-db/movie?movieid=${movie}`;
}
function personPage(person) {
	window.location.href = `https://ericmchavez.github.io/movie-db/people?personid=${person}`;
}
function search() {
	let input = $('input').val().replace(/ /g, '+');
	if (input != '') {
		let top = $('.top');
		top.each(function() {
			this.innerHTML = '';
		});
		if ($('select').val() == 'movies') {
			let results = jQuery.get(
				`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${input}`,
				function() {
					results = results.responseJSON.results;
					for (let x = 0; x < top.length; x++) {
						let img = $('<img />')
							.attr({
								src: `https://image.tmdb.org/t/p/w500/${results[x].poster_path}`,
								title: `movie#${results[x].id}`,
								width: '100%',
								onclick: `moviePage(${results[x].id})`
							})
							.appendTo(top[x]);
					}
				}
			);
		} else {
			let results = jQuery.get(
				`https://api.themoviedb.org/3/search/person?api_key=${key}&query=${input}`,
				function() {
					results = results.responseJSON.results;
					for (let x = 0; x < top.length; x++) {
						if (results[x]) {
							let img = $('<img />')
								.attr({
									src: `https://image.tmdb.org/t/p/w500/${results[x].profile_path}`,
									title: `person#${results[x].id}`,
									alt: `${results[x].name}`,
									width: '100%',
									onclick: `personPage(${results[x].id})`
								})
								.appendTo(top[x]);
						} else {
							top[x].innerHTML = 'NO RESULT';
						}
					}
				}
			);
		}
	}
}
$(document).on('keypress', function(e) {
	if (e.which == 13) {
		search();
	}
});
