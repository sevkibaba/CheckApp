<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Check extends Model{

	protected $table = 'checks'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'user_id',
		'name',
		'total',
		'total_paid',
		'total_remaining',
		'closed',
		
	];

}