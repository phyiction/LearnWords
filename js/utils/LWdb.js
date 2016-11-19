/**************************************************
* Learn Words // LWdb.js
*
* Database access
*
* Current API as of 19. Nov 2016
* will be updated
*
*
* LW.db.get(key)
* LW.db.put(key,value)
*
* LW.db.dumpWords()
*
* LW.db.remove(key)
* LW.db.removeObjects(aKeyPrefix)
*
* LW.db.removeWords()
*
*
* LW.db.destroy()
*
* LW.db.init()
*
*
**************************************************/

"use strict";


	// Define global LearnWords object
	var LW = {}; 


	// Define database sub-object

	LW.db = {
	
		isLocalStorageAvailable: function() {
				try {
					return 'localStorage' in window && window['localStorage'] !== null;
				} catch (e) {
					return false;
				}
			},
		
		get: function(key){
			if (LW.db.isOK) {
				return JSON.parse(localStorage.getItem(key));
			}
		},
		
		remove: function(key){
			if (LW.db.isOK) {
				localStorage.removeItem( key );
			}
		},
		
		put: function(key, value){
			if (LW.db.isOK) {
				try {
					localStorage.setItem(key, JSON.stringify(value));
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						alert('Local Storage is full');
					}
					return false;
				}
			}
		},



                dumpWords: function(aKeyPrefix) {
		           if (LW.db.isOK) {
                            var key;
                            var strValue; 
                            var result = [];

                            var prefixForNumber = 'learnWords-index';  

                            // go through all keys starting with the name
                            // of the database, i.e 'learnWords-index14'
                            // collect the matching objects into arr
                            for (var i = 0; i < localStorage.length; i++){
                                key = localStorage.key(i);
                                strValue = localStorage.getItem(key);                            
    
                                if (key.lastIndexOf(prefixForNumber,0) === 0) {
                                    result.push(JSON.parse(strValue));
                                };
			    };

                            // Dump the array as JSON code (for select all / copy)
                            console.log(JSON.stringify(result));
                           }
                },	



		removeObjects: function(aKeyPrefix){
			if (LW.db.isOK) {
                         "use strict";
                         var key;
                         var st; 
                         var keysToDelete = [];

                         // go through all keys starting with the name
                         // of the database, i.e 'learnWords-index14'
                         for (var i = 0; i < localStorage.length; i++){
                            key = localStorage.key(i);
                            st = localStorage.getItem(key);                             
    
                            if (key.lastIndexOf(aKeyPrefix,0) === 0) {
                                keysToDelete.push(key);
                            };
			 };
                         // now we have all the keys which should be deleted
                         // in the array keysToDelete.
                         console.log(keysToDelete);
                         keysToDelete.forEach(function(aKey){
                              localStorage.removeItem(aKey);
			 });
                       }
		},


		removeWords: function(){

                        var aKeyPrefix = 'learnWords-index';  
                        LW.db.removeObjects(aKeyPrefix);

                        // reset index
                        localStorage.setItem('learnWords-words', '');

                        // this one triggers that memorystore is executed
                        localStorage.removeItem('learnWords-settings');

		},



		destroy: function(){

                        var aKeyPrefix = 'learnWords';  

                        LW.db.removeObjects(aKeyPrefix);

		},


		
		init: function(){
                        "use strict";
			LW.db.isOK = false;

			if (!LW.db.isLocalStorageAvailable()) {
				alert('Local Storage is not available.');
				return false;
			}
			LW.db.isOK = true;

                        // Initialize index array object 
                        // index is an array with the keys for all words.
                        LW.db.index = [];
                        var strIndex = LW.db.get('learnWords-words'); 
			if (strIndex) {LW.db.index = strIndex.split(',')};

		}
	};
	
	LW.db.init();

