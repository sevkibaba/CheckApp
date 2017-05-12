<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Check extends Model{

	protected $table = 'checks'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'user_id',
		'name',
		'total',
		'closed',
		
	];

	// public function setPrice($price){ //use this function to change the price of a product.

	// 	$this->update([
	// 			'price' => $price
	// 		]);

	// }

}