<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model{

	protected $table = 'products'; //eloquate looks for the plural of the class name, you don't need to write this
	protected $fillable = [

		'user_id',
		'id',
		'name',
		'price',

	];

	public function setPriceAttribute($price){ //This function allows us to store price information as integer.
		$intPrice = (float)$price;
		$intPrice = $intPrice*100;
		$intPrice = (int)$intPrice; 
		
		$this->attributes['price'] = $intPrice;
	}

	
	public function getPriceAttribute($price){ //Also, this function allows us to store price information as integer. 

		$newPrice = $price/100; 
		// var_dump($newPrice);
		return $newPrice;
	}


}