# Convert Non-Unicode Text to Unicode within InDesign
![video demo of conversion in InDesign](https://raw.githubusercontent.com/assistech-iitdelhi/InDesignFontConverters/master/ezgif-4-a1c63bb55597.gif)

## USAGE
0. Extract the FontConverters folder from the latest release into the Scripts Panel directory. On Win 7 it is here: <drive>:\Users\<username>\AppData\Roaming\Adobe\InDesign\Version 8.0\en_US\Scripts\Scripts Panel
1. Run FontConverter.jsx from InDesign > Window -> Utilities > Scripts 

## USAGE FOR MULTIPLE FILES
0. Export PageMaker files, if any, to InDesign using Kasyan Servetsky's PMDImporter.jsx (works only in CS6 or earlier)
1. Download the repository and copy Kasyan Servetsky's Batch processor - 2.2.jsx and PMD Importer.jsx to the User Scripts Panel directory of InDesign. 
2. Copy the FontConverters folder to a locally available shared folder (eg. Dropbox). This helps in delivering fixes quickly as and when conversion errors are reported and fixed.
3. Open an InDesign file and run the batch script by double clicking on Window > Utilities > Scripts > User > Batch Processor - 2.2.jsx . The dialog prompt takes two paths as input - the path of a script to run and the path to InDesign files to run the script on. For the first, specify the path to FontConverter.jsx from the previous step. For the second specify the path of InDesign files.

## FILES
### Batch processor - 2.2.jsx
Kasyan Servetsky's script for running any non interactive script in batch mode on one or more InDesign files.

### PMD Importer.jsx
Kasyan Servetsky's script for importing PMD files into InDesign.

### Converters\\fonts.tsv
This file specifies mapping between source and target font names and styles. Along with each entry it contains the scaling factor and the name of the file containing mappings from bytecodes to Unicode.

Source to Target Mapping File Name | Source Font Name | Source Font Style	| Target font name	| Target font style	| Scaling factor (not used)
--- | --- | --- | --- | --- | ---
walkman.tsv	| Walkman-Chanakya-905 | Bold | Smart Delhi Hindi	| Bold	| 1.0
 walkman.tsv |Walkman-Chanakya-901 | Bold	| Smart Delhi Hindi	| Bold	| 1.0
rupee.tsv	| Rupee	| Regular	|  Smart Delhi Hindi	| Bold	| 1.0
rupee.tsv	| Rupee	| Italic	|  Smart Delhi Hindi	| Bold	| 1.0
kruti.tsv	| Kruti Dev 030	| Normal |  Smart Delhi Hindi	| Normal	| 1.0

### Converters\\\*.tsv
Each file contains mappings from bytecodes to Unicode for a specific font. 

```tsv
#	रु
%	ः
&	-
&	µ
'	श्
'k	श
```

### FontConverter.jsx
This script loads the fonts.tsv file and applicable mapping files and does the following:-
```
foreach applicable source to target font mapping
    foreach byte sequence to unicode mapping
        find source byte sequence in the applicable source font name and style
        replace with target unicode in the applicable target font name and style

reorder characters such as ि to bring them to their correct positions
```
## AUTHORS
Sankalan Pal Chowdhury et al.

## MENTORS
1. Mr. Dipendra Manocha, Saksham
2. Prof. M. Balakrishnan, IIT-D
3. Akashdeep Bansal, Research Scholar (PhD), IIT-D

## THANKS
1. [वैज्ञानिक एवं तकनीकी हिन्दी समूह](https://sites.google.com/site/technicalhindi/about/_draft_post) for converters
2. Josh Voigts for suggesting fixes for unconverted portions on SO [here](https://stackoverflow.com/questions/49429634/indesign-text-modification-script-skips-content) and [here](https://stackoverflow.com/questions/49320918/indesign-text-modification-script-skips-paragraphs)
3. Kasyan Servetsky for the [batch processor](https://forums.adobe.com/message/10286549#10286549). Get latest versions [here](http://kasyan.ho.com.ua/batch_process_scripts/batch_process_scripts.html) and [here](http://kasyan.ho.com.ua/indesign/2018/batch_resave_pagemaker_files.html)
4. Mr. Sridhar Madurai of Smart Solutions, for suggestions for improvements
5. CIET Team for using the scripts. 

## RESOURCES
1. [Scripting InDesign](http://cssdk.s3-website-us-east-1.amazonaws.com/sdk/1.0/docs/WebHelp/app_notes/id_scripting.htm)
2. [InDesign Object Model](http://cssdk.s3-website-us-east-1.amazonaws.com/sdk/1.0/docs/WebHelp/app_notes/id_obj_model.htm)
3. [Adobe InDesign CS6 Object Model](http://jongware.mit.edu/idcs6js/)
3. [ScriptUI for Dummies](http://www.kahrel.plus.com/indesign/scriptui.html)
4. [Javascript Tools Guide](http://www.adobe.com/content/dam/acom/en/devnet/scripting/pdfs/javascript_tools_guide.pdf)
5. [Scientific and Technical Hindi](https://sites.google.com/site/technicalhindi/home/converters)
6. [Adobe InDesign CS6 Classroom in a Book](https://www.amazon.in/Adobe-InDesign-CS6-Classroom-Book-ebook/dp/B008679LFO)
7. [InDesign Tutorials](http://www.indesignskills.com/tutorials/)
