var db = require('../src/db')


describe("Initialize DB", function() {
	describe("Add two items", function() {
	  	db.put('key 1', 'value 1')
		db.put('key 2', 'value 2')
		it("Can retrieve item", function(done) {
			db.get('key 1', function(err, value) {  
	  			if (err) {
	    			return handleError(err);
	  			}
	  			console.log('value:', value);
	  			done();
			});
	  	});
	});
});
