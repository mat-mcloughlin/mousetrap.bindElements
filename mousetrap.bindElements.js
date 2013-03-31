/**
 * adds the ability to bind dom elements click events to 
 * mousetrap bindings
 *
 * usage:
 * <a href="#" data-mousetrap="/" />
 * Mousetrap.bindElements();
 */
Mousetrap = (function(Mousetrap) {
	var _boundElements = [],
	_popupsVisible = false,
	_popups = []
	
	_getElements = function() {
		var matchingElements = [],
		allElements = document.getElementsByTagName('*');
	  for (var i = 0; i < allElements.length; i++)
	  {
	    if (allElements[i].getAttribute('data-mousetrap'))
	    {
	      matchingElements.push(allElements[i]);
	    }
	  }
	  return matchingElements;
	},
	
	_getBoundElement = function(combo) {
		for (var i=0; i < _boundElements.length; i++) {
			if (_boundElements[i].getAttribute('data-mousetrap') === combo) {
				return _boundElements[i]
			}
		}
	},
	
	_showPopup = function(element) {
		var span = document.createElement('span')
		span.className = 'mousetrap-popup'
		span.innerHTML = element.getAttribute('data-mousetrap');
		
		if (element.nextSibling) {
		  element.parentNode.insertBefore(span, element.nextSibling);
		}
		else {
		  element.parentNode.appendChild(span);
		}
		
		_popups.push(span);
	},
	
	_removePopups = function() {
		_popupsVisible = false;
		for (var i=0; i < _popups.length; i++) {
			if (_popups[i].parentNode) {
				_popups[i].parentNode.removeChild(_popups[i]);	
			}
		}
		_popups = [];
	};
 
  Mousetrap.bindElements = function() {
		Mousetrap.unbindElements();
		_boundElements = _getElements();
		
		for (var i=0; i < _boundElements.length; i++) {
			var mousetrapBinding = _boundElements[i].getAttribute("data-mousetrap");
			Mousetrap.bind(mousetrapBinding, function(e, combo) {	
				_removePopups();
				_getBoundElement(combo).click();
			});
		}
	};
	
	Mousetrap.unbindElements = function() {
		if (_boundElements.length > 0) {
			for (var i=0; i < _boundElements.length; i++) {
				Mousetrap.unbind(_boundElements[i].getAttribute('data-mousetrap'));
			}
			_boundElements = [];
		}
		_removePopups();
	};
	
	Mousetrap.bindPopup = function(combo) {
		_popups = [];
		_popupsVisible = false;
		Mousetrap.bind(combo, function() {
			if (!_popupsVisible) {
				if (_boundElements.length > 0) {
					_popupsVisible = true;
					for (var i=0; i < _boundElements.length; i++) {
						_showPopup(_boundElements[i]);
					}
				}
			} else {
					_removePopups()
			}
		});
		
		Mousetrap.bind('escape', function() {
			if (_popupsVisible) {
				_removePopups()
			}
		});
	};

  return Mousetrap;
}) (Mousetrap);