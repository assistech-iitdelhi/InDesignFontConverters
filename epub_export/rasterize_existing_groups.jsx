        // this script serches for all GROUPES in active document and checks the option Custom 		Rasterization( customImageConversion ) to rasterize the group.
        
        var myDocument = app.activeDocument;
        myGroups = myDocument.groups;
        alert( myGroups.length );
        
        var i;
        for( i=0 ; i<myGroups.length ; i++ )
        {
                myGroups[i].objectExportOptions.customImageConversion = true ;
        }
