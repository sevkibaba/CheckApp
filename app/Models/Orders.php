<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model{

	protected $table = 'orders'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'check_id',
		'user_id',
		'product_id',
		'product_name',
		'product_price',

	];

	// public function setPrice($price){ //use this function to change the price of a product.

	// 	$this->update([
	// 			'price' => $price
	// 		]);

	// }

}