        var myDocument=app.activeDocument; 
        for (i=0; i<myDocument.allGraphics.length; i++)    
        {  
                 //if (myDocument.allGraphics[i].imageTypeName == "TIFF")  
                 //{  
                        img_replace_with_table(myDocument.allGraphics[i]);   
                 //}   
        }
        
        function img_replace_with_table(img)
        {
                //getting x,y coordinates
                var y1 = img.parent.geometricBounds[0];
                var x1 = img.parent.geometricBounds[1];
                var y2 = img.parent.geometricBounds[2];
                var x2 = img.parent.geometricBounds[3];
                
                var delete_textframe=img.parent;
                //get html code of image from internet here
                
                // ####  removes the image and text frame permenently  ####
               img.remove();
               delete_textframe.remove();
               
                //create new text frame at same coordinates
                var myTextFrame= myDocument.textFrames.add();
                myTextFrame.geometricBounds=[y1,x1,y2,x2];
                
                /////////////////
                //about variables //
                /////////////////
                //no_rows:- no of rows in the main table(outer)
                //no_tx_outer[ i ] :-no of tx in i  row of the main table     [where x is ' h ' or ' d ' ]
                //no_r_inner_th[ i ][ j ] :- how many no of subrows of subtable exist inside header row[ i ] and header cell[ j ]
                //no_tx_inner_ty[ i ][ j ][ k ] :-  how many no of tx columns are possible inside a ty cell located at rows[ i ] ,cell [ j ], subrows[ k ]                [ here x may be ' h ' or ' d '   and y may be ' h ' or ' d ' ]
                //value_tx_inner_ty[ i ][ j ][ k ][ l ] :- represents value stored inisde a subcell located at rows[ i ] , cells[ j ] , subrows[ k ] , subcells[ l ]

                ////////////////////////////////////////////
                //validation of the code //
                ///////////////////////////////////////////
                //this code is valid for ->all simple tables  , -> all complex tables such that any no of cells can have only one single subtable, table and subtables may contain merged cells
                // ->  if the html code contains <html>,<table>,<tr>,<th> tags only and also that inside these tags only text content is allowed (no img ,  link)
                //  -> text should not be written in double quotes , may be in single quotes
                // -> cell can't contain two sub tables
                
                ////////////////////////
                //imp_notes//
                ///////////////////////
                // this code creates table in textframe of the original image of almost same size as textFrame of img.
                
                //extracting all the  values from html code to use it during scripting for tables InDesign
                //******************************************************************************************************************************************************************        
                var html_code =" <html><table><tr><th>00</th></tr><tr><td>10</td><td>11</td></tr><tr><td></td><td>21</td><td><table><tr><td>2200</td><td>2201</td><td>2202</td></tr><tr><td>2210</td><td>2211</td></tr></table></td></tr><tr><td>30</td><td><table><tr><td>3100</td><td>3101</td></tr><tr><td>3110</td><td>3111</td></tr></table></td><td>32</td></tr></table></html> ";
                //var html_code= " <html><table><tr><td>First cell .</td><td><table><tr><td>nested table</td></tr><tr><td>nested table</td></tr></table></td></tr></table></html> ";
                //html_code= " <html><table border=5 bordercolor = red><tr><td ><table ><tr><td>First Nested Table</td></tr></table></td><td ><table ><tr><td><ul><li>VB.Net</li><li>Csharp</li><li>Asp.Net</li></ul></td></tr></table></td></tr><tr><td ><table ><tr><td><a href='www.mywebsite.com/about.html'>About</a></td></tr></table></td><td><table ><tr><td><img src='image.png'></td></tr></table></td></tr></table></html> ";
                var html_code_object = new XML(html_code);       
                var j,i,k,l;
                
                //finding no of rows in main table
                var no_rows = html_code_object.table.tr.length();
                
                //findling no_th and no_td through entire table
                var no_th_inner_th = [], no_th_inner_td = [] , no_th_outer=[];
                var no_td_inner_th = [], no_td_inner_td = [] , no_td_outer=[];
                
                var no_r_inner_th = [], no_r_inner_td = [];
                
                var value_th_inner_th = [],value_td_inner_th=[], value_td_inner_td = [], value_th_inner_td = [];
                
                for(i=0;i<no_rows;i++)
                {
                        value_th_inner_th.push([]);
                        value_td_inner_th.push([]);
                        value_th_inner_td.push([]);
                        value_td_inner_td.push([]);
                    
                        no_r_inner_th.push([]);
                        no_r_inner_td.push([]);
                        
                        no_th_outer.push([]);
                        no_td_outer.push([]);
                        no_td_inner_th.push([]); 
                        no_th_inner_th.push([]);
                        no_td_inner_td.push([]);
                        no_th_inner_td.push([]);
                        
                        no_td_outer[i] = html_code_object.table.tr[i].td.length();
                        no_th_outer[i] = html_code_object.table.tr[i].th.length();
                        
                        no_th_inner_th.push( new Array( no_th_outer[i] ));
                        no_td_inner_th.push(new Array( no_th_outer[i]  ));
                        no_th_inner_td.push( new Array( no_td_outer[i] ));
                        no_td_inner_td.push(new Array( no_td_outer[i]  ));
                        
                        no_r_inner_th.push(new Array( no_th_outer[i] ));
                        no_r_inner_td.push(new Array( no_td_outer[i] ));
                        
                        value_td_inner_th.push(new Array (no_th_outer[i]));
                        value_th_inner_th.push(new Array (no_th_outer[i]));
                        value_td_inner_td.push(new Array (no_td_outer[i]));
                        value_th_inner_td.push(new Array (no_td_outer[i]));
                        
                        for(j=0;j< no_td_outer[i] ; j++)
                        {
                                if(html_code_object.table.tr[i].td[j].table.length() != 0)
                                {
                                        value_th_inner_td[i][j] = [] ;
                                        value_td_inner_td[i][j] = [] ;
                                        no_r_inner_td[i][j]= html_code_object.table.tr[i].td[j].table.tr.length();
                                        no_th_inner_td[i][j] = [] ;
                                        no_td_inner_td[i][j] = [] ;
                                        for(k=0;k< html_code_object.table.tr[i].td[j].table.tr.length() ; k++)
                                        {
                                                value_th_inner_td[i][j].push([]);
                                                value_td_inner_td[i][j].push([]);
                                                value_td_inner_td[i][j][k].push(new Array (html_code_object.table.tr[i].td[j].table.tr[k].td.length()));
                                                value_th_inner_td[i][j][k].push(new Array (html_code_object.table.tr[i].td[j].table.tr[k].th.length()));
                                                for(l=0;l<html_code_object.table.tr[i].td[j].table.tr[k].td.length();l++)
                                                {
                                                        value_td_inner_td[i][j][k][l] = String( html_code_object.table.tr[i].td[j].table.tr[k].td[l] );
                                                }
                                                for(l=0;l<html_code_object.table.tr[i].td[j].table.tr[k].th.length();l++)
                                                {
                                                        value_th_inner_td[i][j][k][l] = String( html_code_object.table.tr[i].td[j].table.tr[k].th[l] );
                                                }
                                                
                                                no_th_inner_td[i][j].push([]);
                                                no_td_inner_td[i][j].push([]);
                                                no_th_inner_td[i][j][k] = html_code_object.table.tr[i].td[j].table.tr[k].th.length();
                                                no_td_inner_td[i][j][k] = html_code_object.table.tr[i].td[j].table.tr[k].td.length();
                                        }
                                }
                                else
                                {
                                        value_td_inner_td[i][j] = String( html_code_object.table.tr[i].td[j] );
                                        no_th_inner_td[i][j]=0;
                                        no_td_inner_td[i][j]=0;
                                        no_r_inner_td[i][j] = 0;
                                }
                        }
                        for(j=0;j< no_th_outer[i] ; j++)
                        {
                                if(html_code_object.table.tr[i].th[j].table.length() != 0)
                                {
                                        value_th_inner_th[i][j] = [] ;
                                        value_td_inner_th[i][j] = [] ;
                                        
                                        no_r_inner_th[i][j] = html_code_object.table.tr[i].th[j].table.tr.length();
                                        no_th_inner_th[i][j] = [] ;
                                        no_td_inner_th[i][j] = [] ;
                                        for(k=0;k< html_code_object.table.tr[i].th[j].table.tr.length() ; k++)
                                        {
                                                value_th_inner_th[i][j].push([]);
                                                value_td_inner_th[i][j].push([]);
                                                value_td_inner_th[i][j][k].push(new Array (html_code_object.table.tr[i].th[j].table.tr[k].td.length()));
                                                value_th_inner_th[i][j][k].push(new Array (html_code_object.table.tr[i].th[j].table.tr[k].th.length()));
                                                for(l=0;l<html_code_object.table.tr[i].th[j].table.tr[k].td.length();l++)
                                                {
                                                        value_td_inner_th[i][j][k][l] = String( html_code_object.table.tr[i].th[j].table.tr[k].td[l] );
                                                }
                                                for(l=0;l<html_code_object.table.tr[i].th[j].table.tr[k].th.length();l++)
                                                {
                                                        value_th_inner_th[i][j][k][l] = String( html_code_object.table.tr[i].th[j].table.tr[k].th[l] );
                                                }
                                        
                                                no_th_inner_th[i][j].push([]);
                                                no_td_inner_th[i][j].push([]);
                                                no_th_inner_th[i][j][k] = html_code_obejct.table.tr[i].th[j].table.tr[k].th.length();
                                                no_td_inner_th[i][j][k] = html_code_obejct.table.tr[i].th[j].table.tr[k].td.length();
                                        }
                                }
                                else
                                {
                                        value_th_inner_th[i][j] = String( html_code_object.table.tr[i].th[j] );
                                        no_r_inner_th[i][j] = 0;
                                        no_th_inner_th[i][j]=0;
                                        no_td_inner_th[i][j]=0;
                                }
                        } 
                }
        //*********************************************************************************************************************************************************************

                //finding max no of clms possible in any row
                var max_clms = 0;
                for(i=0;i<no_rows;i++)
                {
                        if(max_clms < no_th_outer[i] + no_td_outer[i] )
                        {
                                max_clms=no_th_outer[i] + no_td_outer[i] ;
                        }
                }

                
                //forming an outer table
                //temporarily defining new textframe , temporary assumption no_header_rows == 1 and positioned as 1st row
                if(no_td_outer[0]==0)
                {
                        var tbl = myTextFrame.insertionPoints[-1].tables.add(undefined, undefined, {bodyRowCount : no_rows-1, headerRowCount : 1, columnCount : max_clms});
                        //tbl.height = y2-y1 -7;
                }
                else
                {
                        var tbl = myTextFrame.insertionPoints[-1].tables.add(undefined, undefined, {bodyRowCount : no_rows, columnCount : max_clms});
                        //tbl.height = y2-y1 -7;
                }


                //check if merging of cells is required or not
                for(i=0;i<no_rows;i++)
                {
                        var loop = max_clms - (no_th_outer[i] + no_td_outer[i]) , temp_max_clms=0, temp_x, temp_y, temp_myTable, temp_loop;
                        for(j=0; j < loop ; j++ )
                        {
                                tbl.rows[i].cells[0].merge(tbl.rows[i].cells[1]);
                        }
                        for(j=0;j< no_th_outer[i] + no_td_outer[i] ;j++)
                        {
                                temp_x = tbl.rows[i].cells[j].width ;
                                temp_y = tbl.rows[i].cells[j].height ;
                                
                                if(html_code_object.table.tr[i].th.length() != 0)  // entering into header row
                                {
                                        //assigning the values to cells that don't have subtable
                                        if(html_code_object.table.tr[i].th[j].table.length() == 0)
                                        {
                                                tbl.rows[i].cells[j].contents = value_th_inner_th[i][j] ;
                                        }
                                        //if it has then create subtable
                                        else
                                        {
                                                //finding max no of clms in perticular subrows
                                                for(k=0;k< no_r_inner_th[i][j];k++)
                                                {
                                                        //if the subrow[k] is header row
                                                        if(no_th_inner_th[i][j][k] != 0)
                                                        {
                                                                if(temp_max_clms < no_th_inner_th[i][j][k])
                                                                {
                                                                        temp_max_clms = no_th_inner_th[i][j][k];
                                                                }
                                                        }
                                                        else
                                                        {
                                                                if(temp_max_clms < no_td_inner_th[i][j][k] )
                                                                {
                                                                        temp_max_clms = no_td_inner_th[i][j][k];
                                                                }
                                                        }
                                                }
                                        
                                                //creating a sub table inside cell
                                                if(no_th_inner_th[i][j][0] != 0)
                                                {
                                                        temp_myTable = tbl.rows[i].cells[j].insertionPoints[-1].tables.add(undefined, undefined, {headerRowCount: 1, bodyRowCount: no_r_inner_th[i][j] -1 , columnCount: temp_max_clms});
                                                        temp_myTable.height = temp_y;
                                                        temp_myTable.width = temp_x - 0.5 ;
                                                }
                                                else if(no_td_inner_th[i][j][0] != 0)
                                                {
                                                        temp_myTable = tbl.rows[i].cells[j].insertionPoints[-1].tables.add(undefined, undefined, {bodyRowCount: no_r_inner_th[i][j] , columnCount: temp_max_clms });
                                                        temp_myTable.height = temp_y;
                                                        temp_myTable.width = temp_x - 0.5 ;
                                                }
                                                
                                                //after creating table check for merging of cells in each subrows
                                                for(k=0 ; k< no_r_inner_th[i][j] ; k++)
                                                {
                                                        //if the subrow is header row 
                                                        if(no_th_inner_th[i][j][k] != 0)
                                                        {
                                                                temp_loop = temp_max_clms - no_th_inner_th[i][j][k] ;
                                                                for(l=0;l< temp_loop ;l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[0].merge(temp_myTable.rows[k].cells[1]);
                                                                }
                                                        }
                                                        //it is non_header row
                                                        else 
                                                        {       
                                                                temp_loop = temp_max_clms - no_td_inner_th[i][j][k];
                                                                for(l=0;l<temp_loop ; l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[0].merge(temp_myTable.rows[k].cells[1]);
                                                                }
                                                        }
                                                }
                                                
                                                //assigning values to cells of subtable
                                                //entering into subrows
                                                for(k=0;k< no_r_inner_th[i][j] ;k++)
                                                {
                                                        //if the subrow is header row
                                                        if(no_th_inner_th[i][j][k] !=0)
                                                        {
                                                                //entering into subcells of subtables
                                                                for(l=0;l < no_th_inner_th[i][j][k];l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[l].contents = value_th_inner_th[i][j][k][l];
                                                                }
                                                        }
                                                        else
                                                        {
                                                                //entering into subcells
                                                                for(l=0;l<no_td_inner_th[i][j][k] ; l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[l].contents = value_td_inner_th[i][j][k][l];
                                                                }
                                                        }
                                                }
                                        }       
                                }
                                //let the row is not header row
                                if(html_code_object.table.tr[i].td.length() != 0)
                                {
                                        //assigning the values to cells that don't have subtable
                                        if(html_code_object.table.tr[i].td[j].table.length() == 0)
                                        {
                                                tbl.rows[i].cells[j].contents = value_td_inner_td[i][j] ;
                                        }
                                        //if it has then create subtable
                                        else
                                        {
                                                //finding max no of clms in perticular subrows
                                                for(k=0;k< no_r_inner_td[i][j];k++)
                                                {
                                                        //if the subrow[k] is header row
                                                        if(no_th_inner_td[i][j][k] != 0)
                                                        {
                                                                if(temp_max_clms < no_th_inner_td[i][j][k])
                                                                {
                                                                        temp_max_clms = no_th_inner_td[i][j][k];
                                                                }
                                                        }
                                                        else
                                                        {
                                                                if(temp_max_clms < no_td_inner_td[i][j][k] )
                                                                {
                                                                        temp_max_clms = no_td_inner_td[i][j][k];
                                                                }
                                                        }
                                                }
                                        
                                                //creating a sub table inside cell
                                                if(no_th_inner_td[i][j][0] != 0)
                                                {
                                                        temp_myTable = tbl.rows[i].cells[j].insertionPoints[-1].tables.add(undefined, undefined, {headerRowCount: 1, bodyRowCount: no_r_inner_td[i][j] -1 , columnCount: temp_max_clms});
                                                        temp_myTable.height = temp_y;
                                                        temp_myTable.width = temp_x - 0.5 ;
                                                }
                                                else if(no_td_inner_td[i][j][0] != 0)
                                                {
                                                        temp_myTable = tbl.rows[i].cells[j].insertionPoints[-1].tables.add(undefined, undefined, {bodyRowCount: no_r_inner_td[i][j] , columnCount: temp_max_clms });
                                                        temp_myTable.height = temp_y;
                                                        temp_myTable.width = temp_x - 0.5 ;
                                                }
                                                //after creating table check for merging of cells in each subrows
                                                for(k=0 ; k< no_r_inner_td[i][j] ; k++)
                                                {
                                                        //if the subrow is header row 
                                                        if(no_th_inner_td[i][j][k] != 0)
                                                        {
                                                                temp_loop = temp_max_clms - no_th_inner_td[i][j][k] ;
                                                                for(l=0;l< temp_loop ;l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[0].merge(temp_myTable.rows[k].cells[1]);
                                                                }
                                                        }
                                                        //it is non_header row
                                                        else 
                                                        {       
                                                                temp_loop = temp_max_clms - no_td_inner_td[i][j][k];
                                                                for(l=0;l<temp_loop ; l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[0].merge(temp_myTable.rows[k].cells[1]);
                                                                }
                                                        }
                                                }
                                                
                                                //assigning values to cells of subtable
                                                //entering into subrows
                                                for(k=0;k< no_r_inner_td[i][j] ;k++)
                                                {
                                                        //if the subrow is header row
                                                        if(no_th_inner_td[i][j][k] !=0)
                                                        {
                                                                //entering into subcells of subtables
                                                                for(l=0;l < no_th_inner_td[i][j][k];l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[l].contents = value_th_inner_td[i][j][k][l];
                                                                }
                                                        }
                                                        else
                                                        {
                                                                //entering into subcells
                                                                for(l=0;l<no_td_inner_td[i][j][k] ; l++)
                                                                {
                                                                        temp_myTable.rows[k].cells[l].contents = value_td_inner_td[i][j][k][l];
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                }
        }
        
        
        
        
        
        
        
        
        
