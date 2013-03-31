module('trigger events');

test('binding triggers anchor', 1, function() {
	var element = $('<a/>')
		.attr('data-mousetrap', '/')
		.on('click', function() {
			ok(true);
		});
	
	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	
	Mousetrap.trigger('/');
});

test('binding triggers button', 1, function() {
	var element = $('<button/>')
		.attr('data-mousetrap', '/')
		.on('click', function() {
			ok(true);
		});
	
	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	
	Mousetrap.trigger('/');
});

test('bindPopups shows popup when triggered', function() {
	var element = $('<button/>')
		.attr('data-mousetrap', '/');

	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	Mousetrap.bindPopup('h');

	Mousetrap.trigger('h');
	equal($('span.mousetrap-popup').text(), '/');
});

test('bindPopups hides popup on second press', function() {
	var element = $('<button/>')
		.attr('data-mousetrap', '/');

	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	Mousetrap.bindPopup('h');

	Mousetrap.trigger('h');
	equal($('span.mousetrap-popup').length, 1);
	Mousetrap.trigger('h');
	equal($('span.mousetrap-popup').length, 0);
});

test('bindPopups hides popup on escape press', function() {
	var element = $('<button/>')
		.attr('data-mousetrap', '/');

	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	Mousetrap.bindPopup('h');

	Mousetrap.trigger('h');
	equal($('span.mousetrap-popup').length, 1);
	Mousetrap.trigger('escape');
	equal($('span.mousetrap-popup').length, 0);
});

test('rebinding removes previous keybindings', 1,  function() {
	var elementOne = $('<button/>')
		.attr('data-mousetrap', '/')
		.on('click', function() {
			ok(true);
			ok(true); // trigger twice so we can determine which is called.
		});
	
	var elementTwo = $('<button/>')
		.attr('data-mousetrap', '/')
		.on('click', function() {
			ok(true);
		});

	$('#qunit-fixture').append(elementOne);
	Mousetrap.bindElements();
	elementOne.remove();
	$('#qunit-fixture').append(elementTwo);
	Mousetrap.bindElements();
	Mousetrap.trigger('/');
});

test('rebinding removes popups',  function() {
	var element = $('<button/>')
		.attr('data-mousetrap', '/');

	$('#qunit-fixture').append(element);
	Mousetrap.bindElements();
	Mousetrap.bindPopup('h');
	Mousetrap.trigger('h');
	Mousetrap.bindElements();
	
	equal($('span.mousetrap-popup').length, 0);
});

