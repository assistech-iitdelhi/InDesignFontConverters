(function (){
	if (typeof Array.prototype.indexOf != "function") {
		Array.prototype.indexOf = function (el) {
		for(var i = 0; i < this.length; i++) if(el === this[i]) return i;
			return -1;
		}
	}
	var stories = app.activeDocument.stories;
	var all_fonts = [];
	for (var i = 0; i < stories.length; i++){   
		var textStyleRanges = stories[i].textStyleRanges.everyItem().getElements();
		for (var j = 0; j < textStyleRanges.length; j++) {
			var myText = textStyleRanges[j];
			var item = myText.appliedFont.fontFamily + ", " + myText.fontStyle;
			if (all_fonts.indexOf(item) < 0) {
				all_fonts.push(item);
			}
		}    
	}
	all_fonts.sort();
	for (var i = 0; i < all_fonts.length; i++) {
		gEventLog.push(all_fonts[i]);
	}
})();