//this set of code may be needed to get respective alt text from site
// we would have to save the alt text as an array !
//**************************************************************************************************************************************************
/*
//  collect all images from current document.
        var myDocument=app.activeDocument;
        for (i=0; i<myDocument.allGraphics.length; i++)
        {  
                // Advisable to do some pre-selection here  
                // For example:  
                if (myDocument.allGraphics[i].imageTypeName == "JPEG")  
                {  
                        do_your_stuff (myDocument.allGraphics[i]);  
                }  
        } 
    
// send images to site(need to be modified)    
        function test()
        {
                var url ="https://www.google.com/";
                //Browsers.Item(btIExplorer).Run(url);
                Browsers.Item(btchrome).Run(url);
        }
*/

//*****************************************************************************************************************************************************

// this code sets the custom alt text to all image with desired value.
        var myDocument=app.activeDocument;
        var lnk = myDocument.links;  
        var values = SourceType.SOURCE_CUSTOM   // [SourceType.SOURCE_XML_STRUCTURE, SourceType.SOURCE_XMP_TITLE, SourceType.SOURCE_XMP_DESCRIPTION, SourceType.SOURCE_XMP_HEADLINE];
        var i, counter = 0;
        for(i = 0; i < lnk.length; i++){
                lnk[i].parent.parent.objectExportOptions.altTextSourceType = values;
                lnk[i].parent.parent.objectExportOptions.customAltText="is the code worked well";
                counter++;
        }



