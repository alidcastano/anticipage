var db = require('../src/db')
var expect = require('chai').expect

describe("Initialize DB", function() {
	describe("Put a javascript ovject", function() {
		var globalModel = {
			'home/settings': 0.5,
			'home/top': 0.2,
			'home/list': 0.3
		}
	  	db.put('global', globalModel, {valueEncoding: 'json'})
		it("Can retrieve item", function(done) {
			db.get('global', {valueEncoding: 'json'}, function(err, value) {  
	  			if (err) {
	    			return handleError(err)
	  			}
	  			expect(value['home/settings'] === 0.5).to.be.true
	  			done();
			});
	  	});
	});
});
