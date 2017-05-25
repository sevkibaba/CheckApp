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



	// public function setTotalAttribute($total){ //This function allows us to store price information as integer.

	// 	$intTotal = $total + 10;
	// 	// $intTotal = $total*100;
	// 	// $intTotal = (int)$intTotal; 
		
	// 	$this->attributes['total'] = $intTotal;
	// }

	
	// public function getTotalAttribute($total){ //Also, this function allows us to store price information as integer. 

	// 	$newTotal = $total/100; 
	// 	return $newTotal;
	// }


}