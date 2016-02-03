// ==UserScript==
// @name         Mixlr Download Showreel
// @namespace    mixlr_download_showreel
// @description  Add links to download Showreel broadcasts on Mixlr.
// @homepageURL  https://github.com/daraeman/mixlr_download_showreel
// @author       daraeman
// @version      1.3
// @date         2016-02-03
// @include      /^https?:\/\/mixlr\.com\/\w+\/showreel\/*/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @downloadURL  https://github.com/daraeman/mixlr_download_showreel/raw/master/mixlr_download_showreel.user.js
// @updateURL    https://github.com/daraeman/mixlr_download_showreel/raw/master/mixlr_download_showreel.meta.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict( true );

function addStyles() {
	$( 'head' ).append(
		'<style type="text/css">' +
		'	.mds .mixlr_player .social_links .mixlr_download_showreel_download {' +
		'		color: rgb( 200,200,200 );' +
		'		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAV1BMVEUAAACkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSzvKEUAAAAHHRSTlMAAQUHCQoRGBkcHz9AUFZecYCVqLTK0dPp7ff5cWDvugAAAGlJREFUGNO1zckKwCAMBNDYfdfui/n/76xKDFZKbx1yGB7oAHyk0YhLjB2a/I3JiRzJOrFdFaPwetXBB6QPI43MaWCje7inQpbQu34UQBNbDjBQbz2inndfO8AwKrMX4arstTQUxgy95Qa+KRMWu5MJ+wAAAABJRU5ErkJggg==");' +
		'		background-position: center center;' +
		'		width: 20px;' +
		'		height: 20px;' +
		'	}' +
		'	.mds .mixlr_player .social_links .mixlr_download_showreel_download:hover {' +
		'		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAV1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////+ORg7oAAAAHHRSTlMAAQUHCQoRGBkcHz9AUFZecYCVqLTK0dPp7ff5cWDvugAAAGlJREFUGNO1zckKwCAMBNDYfdfui/n/76xKDFZKbx1yGB7oAHyk0YhLjB2a/I3JiRzJOrFdFaPwetXBB6QPI43MaWCje7inQpbQu34UQBNbDjBQbz2inndfO8AwKrMX4arstTQUxgy95Qa+KRMWu5MJ+wAAAABJRU5ErkJggg==");' +
		'	}' +
		'	.mds .mixlr_player .social_links .mixlr_download_showreel_state {' +
		'		color: rgb( 200,200,200 );' +
		'		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA6lBMVEUAAACkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKQzxDvQAAAATXRSTlMAAQIDBQYHCQ8TFBUYGhwdHiAhIyQlJygpKi0xNTdBQkdKUFFVVlljZmlseH6Aj6Cipqitsre5vsXHyszOz9HT1dfZ2ubp7fHz9fn7/TY7Zi8AAADHSURBVBgZXcELO8JgAIbhZ1tFRYXImRxCy5nIKSSrtvf//x1f33bZ6r6JuY2W77caLimvHcqaXHgkSgP9+ypi1SJlhBWMwlAzfvLAnebcQFkZTwv7kkqcK9X14FA6oyvpujmW8eACu9Ijv9IVLI2kexdYnUhDxlIVKAe3DrAeShrxJj3ngEUH2IxkvHIp6SWHtR1pqsOWjPc8xo5iGzgDGf0C7Cn2Caxo6rt4oEQN41QzjrBOlHFMotJX4mOZVN3vBUHPX8P6A0whSSzOxThUAAAAAElFTkSuQmCC");' +
		'		background-position: center center;' +
		'		width: 20px;' +
		'		height: 20px;' +
		'	}' +
		'	.mds .mixlr_player .social_links .mixlr_download_showreel_state:hover {' +
		'		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA6lBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Le70HAAAATXRSTlMAAQIDBQYHCQ8TFBUYGhwdHiAhIyQlJygpKi0xNTdBQkdKUFFVVlljZmlseH6Aj6Cipqitsre5vsXHyszOz9HT1dfZ2ubp7fHz9fn7/TY7Zi8AAADHSURBVBgZXcELO8JgAIbhZ1tFRYXImRxCy5nIKSSrtvf//x1f33bZ6r6JuY2W77caLimvHcqaXHgkSgP9+ypi1SJlhBWMwlAzfvLAnebcQFkZTwv7kkqcK9X14FA6oyvpujmW8eACu9Ijv9IVLI2kexdYnUhDxlIVKAe3DrAeShrxJj3ngEUH2IxkvHIp6SWHtR1pqsOWjPc8xo5iGzgDGf0C7Cn2Caxo6rt4oEQN41QzjrBOlHFMotJX4mOZVN3vBUHPX8P6A0whSSzOxThUAAAAAElFTkSuQmCC");' +
		'	}' +
		'	.mds .mixlr_player .social_links .mixlr_download_showreel_state.checked {' +
		'		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAA6lBMVEUAAAAOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUOyRUG8FaoAAAATXRSTlMAAQIDBQYHCQ8TFBUYGhwdHiAhIyQlJygpKi0xNTdBQkdKUFFVVlljZmlseH6Aj6Cipqitsre5vsXHyszOz9HT1dfZ2ubp7fHz9fn7/TY7Zi8AAADHSURBVBgZXcELO8JgAIbhZ1tFRYXImRxCy5nIKSSrtvf//x1f33bZ6r6JuY2W77caLimvHcqaXHgkSgP9+ypi1SJlhBWMwlAzfvLAnebcQFkZTwv7kkqcK9X14FA6oyvpujmW8eACu9Ijv9IVLI2kexdYnUhDxlIVKAe3DrAeShrxJj3ngEUH2IxkvHIp6SWHtR1pqsOWjPc8xo5iGzgDGf0C7Cn2Caxo6rt4oEQN41QzjrBOlHFMotJX4mOZVN3vBUHPX8P6A0whSSzOxThUAAAAAElFTkSuQmCC");' +
		'	}' +
		'	#mds_list_links {' +
		'		position: absolute;' +
		'		right: 0px;' +
		'		bottom: 0px;' +
		'		cursor: pointer;' +
		'		height: 20px;' +
		'		color: rgb( 100,100,100 );' +
		'	}' +
		'	#mds_list_links_box {' +
		'		position: relative;' +
		'		top: -3px;' +
		'		width: 100%;' +
		'		border: 1px solid #ccc;' +
		'		border-bottom-width: 0px;' +
		'		height: 0px;' +
		'	}' +
		'</style>'
	);
	$( 'body' ).addClass( "mds" );
}

function addLinks() {
	for ( i = 0; i < broadcasts.length; i++ ) {
		var el = $( '.mixlr_player[data-broadcast_id="'+ broadcasts[i].id +'"]' );
		var social_links = el.find( '.player_header .social_links' )
		social_links.append( '<li><a class="mixlr_download_showreel_download" href="'+ broadcasts[i].streams.http.url +'" download="'+ broadcasts[i].user_slug +'_'+ broadcasts[i].title.replace( /[^\w]/g, '' ) +'.mp3"></a></li>' );
		social_links.append( '<li><a class="mixlr_download_showreel_state"></a></li>' );
	}
}

function addTriggers() {
	$( '.mixlr_player .social_links .mixlr_download_showreel_state' ).click(function(){
		var el = $(this);
		var id = el.parent().parent().parent().parent().attr( "data-broadcast_id" );
		if ( el.hasClass( "checked" ) ) {
			el.removeClass( "checked" );
			delete saved[ id ];
		}
		else {
			el.addClass( "checked" );
			saved[ id ] = 1;
		}
		localStorage.setItem( saved_local_key, JSON.stringify( saved ) );
	});
}

function updateSavedView() {
	$( '.mixlr_player' ).each(function(){
		var el = $(this);
		if ( saved[ el.attr( 'data-broadcast_id' ) ] )
			el.find( '.social_links .mixlr_download_showreel_state' ).addClass( "checked" );
		else
			el.find( '.social_links .mixlr_download_showreel_state' ).removeClass( "checked" );
	});
}

function addBottomNav() {
	$( '.big_wrapper .pagination' ).first().clone( true ).insertAfter( $( ".showreel-list" ) );
}

function getLinks( all ) {
	console.log( "getLinks" )
	console.log( "saved >>" )
	console.log( saved )
	var links = '';
	for ( i = 0; i < broadcasts.length; i++ ) {
		console.log( "id = "+ broadcasts[i].id )
		if ( ! saved[ broadcasts[i].id ] || all ) {
			console.log( "id not exist" )
			links += broadcasts[i].streams.http.url +"\n";
		}
	}
	return links || "All Links have already been downloaded";
}

function addLinksBox() {

	var list_links_button = $( '<div id="mds_list_links">List Links</div>' );
	$( "#title" ).append( list_links_button );

	var list_links_box = $( '<textarea id="mds_list_links_box"></textarea>' );
	$( "#title" ).append( list_links_box );

	list_links_button
		.css( "top", list_links_button.position().top )
		.click(function(){
			if ( $(this).hasClass( "expanded" ) ) {

				$(this)
					.removeClass( "expanded" )
					.text( "List Links" );

				$( '#title' ).animate({
					"height": ""
				});
				list_links_box
					.animate({
						"height": "0px"
					});
			}
			else {

				$(this)
					.addClass( "expanded" )
					.text( "Hide Links" );

				$( '#title' ).animate({
					"height": ( $( '#title' ).outerHeight() + 100 ) + "px"
				});
				list_links_box
					.text( getLinks() )
					.animate({
						"height": "100px"
					});
			}
		});
}

var saved_local_key = 'mixlr_download_showreel_save_state';
var try_number = 0;
var max_tries = 1000;
var last_id = broadcasts[ broadcasts.length - 1 ].id;
var saved = JSON.parse( localStorage.getItem( saved_local_key ) );
if ( ! saved )
	saved = {};

var wait_for_mixlr_to_load_interval = setInterval(function(){
	if ( $( '.mixlr_player[data-broadcast_id="'+ last_id +'"]' ).length ) {
		addStyles();
		addLinks();
		addTriggers();
		updateSavedView();
		addBottomNav();
		addLinksBox();
		clearInterval( wait_for_mixlr_to_load_interval );
	}
	if ( try_number++ > max_tries )
		clearInterval( wait_for_mixlr_to_load_interval );
}, 250 );
