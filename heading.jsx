var myTextFrames  = app.activeDocument.textFrames;  // object model initialisations
var myDoc         = app.documents[0];
var avg_font_size = iterate(averager);     

var headings      = iterate(style_creator); // all texts bigger than avg_font_size
// headings_for_level is a 2D array which contains 6 rows - one for each heading level.
// and each row will contain the paragraph objects correspnding to that level
var headings_for_level = new Array(6);
for (var i = 0; i < 6; i++) {
  headings_for_level[i] = new Array();
}

headings_for_level[0].push(headings[0]); // assuming that the first word/text frame is the title and hence h1
headings[0].level = 0;
write_to_file("\nAssiging " + headings[0].text.contents + " to level " + headings[0].level);
for (var i = 1; headings[i]!=null; i++) {
	if (headings[i].size == headings[i-1].size) { //if size is equal, same level
		headings[i].level = headings[i-1].level;
	} else if (headings[i].size > headings[i-1].size) { //if size is greater, heading level will be above the previous one
	  if (headings[i-1].level == 0) { //if the previous heading level was h1, there is nothing above it, so same as before
      headings[i].level = headings[i-1].level;      
    } else {
			var k = headings[i-1].level;
			while(headings[i].size>=headings_for_level[k-1][headings_for_level[k-1].length-1].size) { //VUDO >= 
                                                        // if size is greater, keep checking with higher heading headings_for_level
                                                        // until you reach a level which has a higher fontsize,
                                                        // and then level is assigned
				k--;				
        if (k==0) break;
			}
      headings[i].level = k;
    }
	} else { //if size is smaller, one heading level below
		if (headings[i-1].level == 5) { //if prev level is h6, then there is no lower heading level
      headings[i].level = headings[i-1].level;      
    } else {
      headings[i].level = headings[i-1].level + 1;      
    }
	}
  headings_for_level[headings[i].level].push(headings[i]);
  write_to_file("\nAssiging " + headings[i].text.contents + " to level " + headings[i].level);
}

for (var i=0;i<6;i++) { //iterate over the rows in headings_for_level
	for (var j=0; j<headings_for_level[i].length;j++) { //iterate over alll elemets of one row
		headings_for_level[i][j].text.appliedParagraphStyle = myDoc.paragraphStyles.item (headings_for_level[i][j].style.name); //apply the custom paragraph style created to the paragraph
    //according to the heading level of the paragraph, assign an export tag to the custom style created for each respective paragraph
		var h = myDoc.paragraphStyles.itemByName(headings_for_level[i][j].style.name);
    h.styleExportTagMaps.add({exportType: "EPUB", exportTag: "h"+(i+1), exportClass: "", exportAttributes: ""});
    h.styleExportTagMaps.add({exportType: "PDF", exportTag: "H"+(i+1), exportClass: "", exportAttributes: ""});
  }
}

function iterate(fun) {
  var o = fun();
  // two while loops iterate over all paragraphs present in the object model
  for (var i = 0; i < app.activeDocument.textFrames.length;  i++) {
    var paras=myTextFrames[i].parentStory.paragraphs;
    myTextPrev = paras.item(0);
    for (var j = -1; j < paras.count() && myTextFrames[i].parentStory!= myTextFrames[i-1].parentStory; j++) { //VUDO j = -1 
      myText = paras.item(j);
      if (myTextPrev == null || myText != myTextPrev) { // to avoid repetition
        o.fun(myText);
      }
      myTextPrev = myText;
    }
  }
  return o.val();
}

function averager() {
  var count = 0;
  var sum = 0;
  return {
    fun: function(myText) {
            sum = sum+myText.pointSize;
            count = count+1;
         },
    val: function() {
            return sum/count;
         }
  }
}

function style_creator() {
  var headings = new Array();
  return {
    fun: function(myText) {
            if (myText.pointSize > avg_font_size) {  // distinguish between non heading and heading text by using the average 
              // create an object having the paragraph text, its size, heading number, and a new custom style which is different for each paragraph, and given the various style parameters to maintain formatting
              var name = headings.length.toString();
              headings.push({ text : myText ,
                              size : myText.pointSize ,
                              level : 0 ,
                              style : myDoc.paragraphStyles.add({ name : name,
                                                                  spaceAfter : myText.spaceAfter ,
                                                                  appliedFont : myText.appliedFont,
                                                                  fontFamily : myText.appliedFont.fontFamily,
                                                                  spaceBefore : myText.spaceBefore ,
                                                                  fontStyle : myText.fontStyle ,
                                                                  pointSize : myText.pointSize ,
                                                                  fillColor : myText.fillColor ,
                                                                  alignToBaseline : myText.alignToBaseline ,
                                                                  digitsType : myText.digitsType ,
                                                                  index : myText.index ,
                                                                  leftIndent : myText.leftIndent ,
                                                                  paragraphDirection : myText.paragraphDirection ,
                                                                  position : myText.position ,
                                                                  parent : myText.parent ,
                                                                  properties : myText.properties ,
                                                                  startParagraph : myText.startParagraph ,
                                                                  underline : myText.underline ,
                                                                  underlineColor : myText.underlineColor ,
                                                                  underlineType : myText.underlineType ,
                                                                  underlineWeight : myText.underlineWeight ,
                                                                  justification : myText.justification
                })
              }); 
              write_to_file("headings[" + (headings.length-1) + "]:" + myText.contents + ", " + myText.pointSize);
            }
    },
            
     val: function() {
       return headings;
     }
  }
}

function write_to_file(text) {
	var file = new File("~/Desktop/heading2.txt");
	file.encoding = "UTF-8";
	if (file.exists) {
		file.open("e");
		file.seek(0, 2);
	}
	else {
		file.open("w");
	}
	file.write(text); 
	file.close();
}