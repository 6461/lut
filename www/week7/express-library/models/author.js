var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
	first_name: {
		type:		String,
		required:	true,
		max:		100},
	family_name: {
		type:		String,
		required:	true,
		max:		100},
	date_of_birth: {type: Date},
	date_of_death: {type: Date},
});

AuthorSchema.virtual('name')
	.get(function() {
		return this.family_name + ', ' + this.first_name;
});

AuthorSchema.virtual('lifespan')
	.get(function() {
		// return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
		var birth = this.date_of_birth ? moment(this.date_of_birth).format('YYYY') : '';
		var death = this.date_of_death ? moment(this.date_of_death).format('YYYY') : '';
		return birth + ' - ' + death;
});

AuthorSchema.virtual('url')
	.get(function() {
		return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('year_of_birth')
	.get(function() {
		return this.date_of_birth ? moment(this.date_of_birth).format('YYYY') : '';
});

AuthorSchema.virtual('year_of_death')
	.get(function() {
		return this.date_of_death ? moment(this.date_of_death).format('YYYY') : '';
});

// export model
module.exports = mongoose.model('Author', AuthorSchema);

