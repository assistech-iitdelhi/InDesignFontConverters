        var myDocument = app.activeDocument;
        var myGraphics = myDocument.allGraphics; // array of all graphics      
        
        var i,j,k,m=0;
        // entering in each page
        for(i=0; i<myDocument.pages.length ; i++ )
        {
                //want to iterate on all graphics
                for(j=0 ; j< myDocument.pages[i].allGraphics.length ; j++)
                {
                        var inner_tf = [];
                        m=0;
                        // want to check each and every textframe for each graphics
                        for(k=0;k< myDocument.pages[i].textFrames.length ; k++)
                        {
                                var yg1,xg1,yg2,xg2,yt1,xt1,yt2,xt2;// temp variables just for simplicity.
                                yg1 = myDocument.pages[i].allGraphics[j].geometricBounds[0];
                                xg1 = myDocument.pages[i].allGraphics[j].geometricBounds[1];
                                yg2 = myDocument.pages[i].allGraphics[j].geometricBounds[2];
                                xg2 = myDocument.pages[i].allGraphics[j].geometricBounds[3];
                                yt1 = myDocument.pages[i].textFrames[k].geometricBounds[0];
                                xt1 = myDocument.pages[i].textFrames[k].geometricBounds[1];
                                yt2 = myDocument.pages[i].textFrames[k].geometricBounds[2];
                                xt2 = myDocument.pages[i].textFrames[k].geometricBounds[3];
                                
                                if(yt1 >= yg1 && yt1 <= yg2 && xt1 >= xg1  && xt1 <= xg2 && yt2 <=yg2 && yt2 >=yg1 && xt2 <= xg2 && xt2 >= xg1)
                                {
					inner_tf.push([]);
                                        inner_tf[m] = myDocument.pages[i].textFrames[k] ;
                                        m++;
                                }
                        }
                        if(inner_tf.length > 0)
                        {
                                inner_tf.push(myDocument.pages[i].allGraphics[j].parent);
                                var temp_group = myDocument.pages[i].groups.add(inner_tf);
                                temp_group.objectExportOptions.customImageConversion = true ;
                        }
                }
        }
                                
