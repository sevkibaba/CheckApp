<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usercheck extends Model{

	protected $table = 'userchecks'; //eloquate looks for the plural of the class name, you don't need to write this

	protected $fillable = [

		'user_id',

	];

}